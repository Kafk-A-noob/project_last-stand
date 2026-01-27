# Scene.tsx 解説とクリーンアップ

ユーザーの手入力による編集で、古いコード(`Cube`関数など)と新しいコードが混在し、型定義(`color: string`)のエラーなどが発生している可能性があります。
ここで一度、`Scene.tsx` のあるべき姿を整理します。

### 変更点

1. **Cube関数の完全削除:** もう使わないので削除、または学びの履歴として残すなら`/* ... */`で完全に囲う必要があります。今回は可読性のため**削除**を推奨します。
2. **Propsの削除:** `page.tsx` から `color` を渡す機能はPhase 1の訓練用でした。今回は不要なので `Scene({color})` という引数も削除します。
3. **divラッパーの削除:** `<Canvas>` は親要素のサイズいっぱいに広がるので、`className="h-full w-full"` のdivで囲む必要は基本的にありません（`layout.tsx`や`page.tsx`側で制御すべき）。

### `app/components/Scene.tsx` (完成形)

```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ReactLogo from './ReactLogo'

// もはやProps(引数)は不要です。シンプルなコンポーネントに戻ります。
export default function Scene() {
  return (
    <Canvas>
      {/* 
        Unity: Directional Light 
        position=[x, y, z] で太陽の位置を指定
      */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      
      {/* Blenderで作ったロゴを表示 */}
      <ReactLogo />

      {/* マウス操作カメラ */}
      <OrbitControls makeDefault />
    </Canvas>
  )
}
```

### なぜ `color` は消していいの？

Phase 1では「2D(ボタン)と3D(キューブ)の連携」を学ぶために `color` をリレーしていましたが、今回のミッションは「Blenderモデルを表示する」ことなので、その連携機能は一旦リセットします。シンプルイズベストです。
