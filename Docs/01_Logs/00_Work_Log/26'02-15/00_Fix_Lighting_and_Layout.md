# Work Log: Fix Lighting & Safari Layout

**Date:** 2026-02-15
**Goal:** モデルがグレーアウトする問題と、iPhone (Safari) でのレイアウト崩れを修正する。
**Method:** ユーザーによる手動コーディング (Manual Implementation)

## 1. Lighting Fix (モデルが暗い・グレーになる問題)

PBRマテリアル（金属・ガラス）が正しく発色するには、反射するための「風景（環境マップ）」が必要です。
現在はライトしか無いため、反射成分が「黒（虚無）」になっています。

### [MODIFY] `src/app/components/canvas/Scene.tsx`

`@react-three/drei` から `Environment` をインポートし、Canvas内に追加してください。

```tsx
// 1. Importの追加
import { OrbitControls, Html, Environment } from "@react-three/drei";

// ...

export default function Scene() {
  // ...
  return (
    <Canvas>
      {/* 2. 環境マップの追加 (AmbientLightの下あたり) */}
      {/* cityプリセットを使い、background={false} で背景自体は非表示にする */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      
      <Environment preset="city" background={false} />

      {/* ... */}
    </Canvas>
  );
}
```

## 2. Mobile Layout Fix (Safariのアドレスバー問題)

iPhoneのSafariでは、`100vh` にアドレスバーの高さが含まれてしまい、フッターが隠れる等の問題が起きます。
`100dvh` (Dynamic Viewport Height) を使うことで、実際に目に見えている領域に合わせます。

### [MODIFY] `src/app/components/layout/ViewerLayout.tsx`

35行目付近のクラス名を変更します。

```tsx
    <div
      className={cn(
        // [修正] h-screen -> h-dvh
        "relative w-full h-dvh bg-black",
        "text-white font-mono",
      )}
    >
```

## 3. Global CSS Fix (スクロールバウンス防止)

スマホで画面端を引っ張った時にビヨーンと伸びる（バウンス）挙動を防ぎ、アプリらしさを高めます。

### [MODIFY] `src/app/globals.css`

`body` タグのスタイル定義の前に、以下の設定を追加してください。

```css
/* [追加] スクロールバウンス（プリング）を無効化 */
html, body {
  overscroll-behavior: none;
}

body {
  background: var(--background);
  /* ... */
}
```
