# Troubleshooting: GLB Sanity Check

コードは正しいですが、エラーが解消しません。
これは **GLBファイル自体に問題がある（壊れている、重すぎる、または非互換な設定が含まれている）** 可能性が高いです。

## 診断ステップ

### 1. GLBファイルの健全性確認 (Sanity Check)

`app/components/ReactLogo.tsx` を一時的に書き換えて、GLBの読み込みをスキップし、ただの箱を表示させてみます。
これでエラーが消えて「回る箱」が表示されれば、**犯人はGLBファイル**で確定です。

```tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// useGLTFなどを一時的に無効化
import { Billboard, Center } from '@react-three/drei'
import * as THREE from 'three'

export default function ReactLogo() {
  // const { scene } = useGLTF('/models/React_Logo.glb') // コメントアウト
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5
    }
  })

  return (
    <Billboard follow={true}>
      <Center>
        {/* Cloneの代わりにただの箱を回す */}
        <group ref={meshRef}>
            <mesh>
                <boxGeometry />
                <meshStandardMaterial color="cyan" />
            </mesh>
        </group>
      </Center>
    </Billboard>
  )
}
```

### 2. Blender再エクスポート (犯人がGLBだった場合)

もし箱なら表示される場合、Blenderのエクスポート設定を見直して再出力します。

- **Draco Compression (圧縮):** **OFF** にしてください（Geometryタブ内）。これを使うには追加のローダー設定が必要です。
- **Apply Modifiers:** **ON**
- **Include > Limit to Selected Objects:** **ON** (余計なカメラやライトが含まれているとエラーの元です)

## 3. サーバー再起動

Next.jsの開発サーバーが古いエラー状態をキャッシュしている場合があります。
ターミナルで `Ctrl+C` で停止し、`npm run dev` し直してください。
