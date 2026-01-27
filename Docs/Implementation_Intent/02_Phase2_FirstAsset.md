# Implementation Intent: Phase 2 - First Asset (React Logo)

## 概要

Blenderで作成した `react_logo.glb` をR3Fシーンに配置し、ビルボード（常に正面を向く）効果と回転アニメーションを付与します。

## 学びのポイント (Learning Goals)

1. **useGLTF:** 外部アセット(.glb)をReactコンポーネントとして読み込むフック。
2. **primitive:** R3Fの特殊な要素。Three.jsの生オブジェクト(`scene`など)をそのまま表示する際に使用。
3. **Billboard:** `@react-three/drei` の便利機能。中身を常にカメラに向ける。
4. **useFrame:** 毎フレーム実行されるループ。ここで回転角度(`rotation.z`)を加算し続ける。

---

## 1. Components (Coding)

### A. `app/components/ReactLogo.tsx` (新規作成)

```tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Billboard } from '@react-three/drei'
import * as THREE from 'three'

export default function ReactLogo() {
  // 1. glTFファイルのロード (パスはpublicフォルダからの相対パス)
  const { scene } = useGLTF('/models/react_logo.glb')
  
  // 2. アニメーション用のRef (UnityのGetComponentに相当)
  const meshRef = useRef<THREE.Group>(null)

  // 3. 毎フレーム実行 (Update関数)
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Z軸 (視線軸) で回転させる
      meshRef.current.rotation.z += delta * 0.5
    }
  })

  return (
    // Billboard: 常にカメラの方を向くコンテナ
    <Billboard follow={true}>
      {/* primitive: 生のThree.jsオブジェクト(scene)を表示 */}
      {/* refをアタッチして回転させる */}
      <primitive 
        object={scene} 
        ref={meshRef} 
        scale={[0.5, 0.5, 0.5]} // 必要に応じてスケール調整
      />
    </Billboard>
  )
}
```

### B. `app/components/Scene.tsx` (修正)

赤いCubeを削除し、作成したReactLogoを配置します。

```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ReactLogo from './ReactLogo' // Import追加

export default function Scene() {
  return (
    <Canvas>
      {/* Unity: Directional Light */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      
      {/* 以前のCubeは削除またはコメントアウト */}
      {/* <mesh>...</mesh> */}

      {/* 新しいReactロゴを配置 */}
      <ReactLogo />

      {/* カメラ操作 */}
      <OrbitControls makeDefault />
    </Canvas>
  )
}
```

## 解説

- **`useGLTF('/models/react_logo.glb')`**:
  Unityの `Resources.Load("Prefab")` に近いです。ロードされたデータの中には `scene` (モデル全体)、`animations`、`cameras` などが含まれますが、今回は `scene` だけ取り出して使います。

- **`meshRef.current.rotation.z`**:
  今回はBillboardの中にいるため、ロゴにとっての「正面」は常にカメラ方向です。その状態でZ軸（奥行き軸）を回すことで、「こちらを見ながらクルクル回る」演出になります。
