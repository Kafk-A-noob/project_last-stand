# How-To: Fix Footer Layout Collapse (Manual Input)

**Date:** 2026-02-09
**Target:** `src/app/components/layout/ViewerLayout.tsx`

> [!IMPORTANT]
> **これは「写経用」の手順書です。**
> AIが勝手にコードを書き換えることは禁止されています。以下の解説を読み、自分の手で修正してください。

## 1. 問題の理解 (Understanding the Bug)

現在、フッターのボタンが増えると、親コンテナの幅に収まろうとしてボタン自体が圧縮されています。

### Unity翻訳 (The Translation)

- **現状:** `Horizontal Layout Group` で `Child Force Expand` が効いてしまっている状態。
- **目標:** `Scroll Rect` (横スクロール) を導入し、中身 (`Content`) が画面外にはみ出ても良いようにする。

---

## 2. 修正手順 (Step-by-Step)

`src/app/components/layout/ViewerLayout.tsx` を開き、以下の2箇所を変更します。

### Step 1: コンテナにスクロール機能をつける (The Container)

ボタンを囲っている `div` (92行目付近) を探してください。

```tsx
// Before
<div className={cn("flex gap-4")}>

// After (手入力してください)
<div
  className={cn(
    "flex gap-4",
    // 解説: Unityの ScrollRect + Mask コンポーネントに相当
    "overflow-x-auto",      // 横スクロールを有効化
    "w-full md:w-auto",     // 幅の調整
    "md:max-w-4xl",         // PC画面での最大幅制限
    "pb-2 scrollbar-hide"   // 見た目の微調整
  )}
>
```

### Step 2: ボタンが潰れないようにする (The Button)

`ASSET_MANIFEST.map` の中の `button` (className) を修正します。

```tsx
// Before
className={cn(
  "px-6 py-2 text-xs border rounded transition-all",
  // ...

// After (手入力してください)
className={cn(
  "px-6 py-2 text-xs border rounded transition-all",
  // 解説: Unityの Content Size Fitter (Preferred Size) に相当
  "whitespace-nowrap",    // テキストを折り返さない
  "flex-shrink-0",        // 親の幅に合わせて縮まない (絶対の自信を持つ)
  // ...
```

---

## 3. なぜこれで直るのか (Why?)

Web (Flexbox) のデフォルトでは、子要素は親要素の中に収まろうと努力します（縮小します）。
`flex-shrink-0` は「俺は絶対に縮まないぞ」という宣言です。
これと `overflow-x-auto` (はみ出たらスクロール) を組み合わせることで、スマホゲームのメニューのような横スクロールUIが完成します。

修正が終わったら、ブラウザで確認し `task.md` の Hotfix を `[x]` にしてください。
