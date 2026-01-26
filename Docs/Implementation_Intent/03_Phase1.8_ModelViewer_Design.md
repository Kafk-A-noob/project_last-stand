# ModelViewer.tsx アーキテクチャ設計 (Draft)

## 1. 目的

- 指定された3Dモデル(`.glb`)を表示する「器（うつわ）」を作る。
- VRChatで言うところの、**「アバターが入っていない空のAvatar Descriptor」** に、外部からFBXを放り込むような仕組み。

## 2. Unity(Inspector) 翻訳

Inspectorに公開するパラメータ（SerializeField）を、Reactでは `Props` と呼びます。

| Unity Inspector (Script) | React Props | 役割 |
| :--- | :--- | :--- |
| `public string ModelPath;` | `path` | 読み込むファイルの場所 (URL/Pass) |
| `public bool AutoRotate;` | `autoRotate` | ターンテーブルのように回すか |
| `public Vector3 Scale;` | `scale` | 自身の大きさ (Local Scale) |

## 3. 実装ドラフト (Sketch)

**注意:** 理解優先のため、ここでは厳密なTypeScript型定義の一部を省略し、構造を見やすくしています。

```tsx
'use client'

import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Inspectorの設定項目
type ModelViewerProps = {
    path: string;
    autoRotate?: boolean; // ?は「設定しなくてもいい（省略可）」の意味
    scale?: number;
}

export default function ModelViewer({ 
    path, 
    autoRotate = false, 
    scale = 1.0 
}: ModelViewerProps) {
    
    // 1. ダウンロード & ロード (非同期)
    // VRChatでLoadingアバターが出ている状態の裏で走る処理
    const { scene, animations } = useGLTF(path)
    
    // 2. アニメーションシステムの準備
    // Unityの "Animator" コンポーネントをアタッチするのと同義
    const { actions } = useAnimations(animations, scene)
    
    // 3. Transformへの参照を取得
    // Unityスクリプトで "transform" という変数を使うための準備
    const groupRef = useRef<THREE.Group>(null)

    // 4. Start() : 最初に1回だけ動く
    useEffect(() => {
        // もしアニメーションが含まれていたら、とりあえず最初のやつを再生
        if (actions) {
            console.log("Animation found. Playing first clip.")
        }
    }, [actions]) // actionsがロードされた瞬間に発火

    // 5. Update() : 毎フレーム動く
    useFrame((state, delta) => {
        // AutoRotateがONなら回す
        if (autoRotate && groupRef.current) {
            // transform.Rotate(0, speed * deltaTime, 0)
            groupRef.current.rotation.y += 0.5 * delta
        }
    })

    return (
        // 6. Hierarchyへの配置
        <group ref={groupRef} dispose={null} scale={scale}>
            {/* 
               ここが実体。
               PrefabをInstantiateした中身がここに展開される。
            */}
            <primitive object={scene} />
        </group>
    )
}
```
