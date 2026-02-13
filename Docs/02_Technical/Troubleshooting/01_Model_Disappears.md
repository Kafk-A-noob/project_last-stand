# Troubleshooting: Model Disappears

「一瞬映って消える」現象は、3D実装でよくある「原点(Origin)ズレ」または「キャッシュ参照(Singleton)」の問題である可能性が高いです。
以下の手順で修正します。

## 1. シーンのクローン化 (Singleton回避)

`useGLTF` で読み込んだ `scene` オブジェクトを直接使うと、Reactの再レンダリング時に参照がおかしくなることがあります。`drei` の `<Clone>` コンポーネントを使って、安全に複製して表示します。

### `app/components/ReactLogo.tsx` の修正

`<primitive>` を `<Clone>` に置き換えます。

```tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// Clone を追加インポート
import { useGLTF, Billboard, Clone } from '@react-three/drei'
import * as THREE from 'three'

export default function ReactLogo() {
  const { scene } = useGLTF('/models/react_logo.glb')
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5
    }
  })

  return (
    <Billboard follow={true}>
      {/* primitive ではなく Clone を使用 */}
      <Clone 
        object={scene} 
        ref={meshRef} 
        scale={[0.5, 0.5, 0.5]} 
      />
    </Billboard>
  )
}
```

## 2. 原点と配置の修正 (Blender確認)

もし上記でも治らない場合、Blender側で「原点がズレている（実はすごく遠くを回っている）」可能性があります。
一度コード側で強制的にセンタリングしてみます。

```tsx
// Center を追加インポート
import { useGLTF, Billboard, Clone, Center } from '@react-three/drei'

// ...略...

return (
  <Billboard follow={true}>
    {/* Centerで強制的に真ん中に持ってくる */}
    <Center>
      <Clone 
        object={scene} 
        ref={meshRef} 
        scale={[0.5, 0.5, 0.5]} 
      />
    </Center>
  </Billboard>
)
```

## 3. コンソールエラーの確認

ブラウザのデベロッパーツール(F12)を開き、`Console` タブに赤いエラーが出ていないか確認してください。
