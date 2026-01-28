# Phase 3 Study: Responsive Design (Strict Training)

本ドキュメントは、PCだけでなくスマホでも綺麗に見えるようにする「レスポンシブ対応」の手順です。

## Step 8: モバイルファースト (Mobile First)

Webデザインにおいて、現在は「スマホを基準に作り、PC向けに拡張する」のが定石です。
Tailwind CSS はこの思想に基づいて作られています。

### 1. `app/components/OverlayUI.tsx` の修正

スマホだと「余白 (`p-8`)」が広すぎて、画面が狭く感じることがあります。
「スマホでは `p-4`、PCでは `p-8`」になるように修正します。

```tsx
// app/components/OverlayUI.tsx

// (前略)
<div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 p-4 md:p-8 flex flex-col justify-between text-white">
  {/* p-4 md:p-8 に変更 */}
  
  {/* ... */}
</div>
```

---

## Step 9: レイアウトの切り替え (Flex Direction)

`app/page.tsx` にあるボタンエリアは、今は横並び (`flex-row`) ですが、スマホの縦画面では「ボタンが横に詰まりすぎて押しにくい」問題が起きがちです。
「スマホでは縦並び、PCでは横並び」に変えてみましょう。

### 1. `app/page.tsx` の修正

ボタンを囲んでいる `div` を修正します。

```tsx
// app/page.tsx

// (前略) OverlayUIの中

{/* 
  flex-col: デフォルト（スマホ）は縦並び
  md:flex-row: 画面幅が md (768px) 以上なら横並び
  items-start: 縦並びの時、左寄せ
  md:items-center: 横並びの時、上下中央揃え
*/}
<div className="flex flex-col md:flex-row gap-4 pointer-events-auto items-start md:items-center">
  {/* ボタンたち... */}
</div>
```

---

## 解説 (Deep Dive)

### 1. 構造の解剖 (Anatomy)

- **`md:` (Prefix):**
  - **解説:** Tailwindのマジックワードです。「画面幅が Medium (iPad縦くらい) 以上の時だけ、このCSSを適用する」という意味です。
  - 何もついていないクラス（例: `p-4`）は「全サイズ（つまりスマホ含む最小構成）」に適用されます。これが「モバイルファースト」です。

### 2. 概念翻訳 (Concept Translation)

- **Unity Canvas Scaler / Anchor Presets:**
  - Unityで「Reference Resolution」を設定し、画面サイズが変わった時にUIの大きさや位置を自動調整するアレです。
  - `flex-col md:flex-row` は、Unityの `Vertical Layout Group` と `Horizontal Layout Group` を、画面サイズに応じてスクリプトで付け替えているような挙動です。

### 3. デバッグ方法

- PCのブラウザで `F12` を押し、デベロッパーツールを開きます。
- 左上の「スマホ・タブレットのアイコン」をクリックすると、iPhoneやPixelの画面サイズをシミュレーションできます。
- その状態で、ボタンが縦に並び、余白が少し狭くなっていれば成功です。
