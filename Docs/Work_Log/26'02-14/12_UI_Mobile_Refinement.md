# Work Log: Mobile UI Refinement

**Date:** 2026-02-14
**Target:** InfoPanel.tsx, ViewerLayout.tsx
**Goal:** モバイルでの情報過多を防ぐための「折りたたみ機能」実装と、タイトル・フッターの表示位置調整。

## 1. InfoPanel の折りたたみ (Part 1)

スマホでは `Name` と `Quote` のみを表示し、タップすると詳細 (`Tech Specs`, `Description`, `Contributor`) が展開されるようにします。
**PCでは常に全て表示されます。**

### `src/app/components/ui/InfoPanel.tsx`

`useState` を新たに import し、状態管理を追加してください。

```tsx
// 1. useState を追加
import { useState } from "react";
// ...

export default function InfoPanel() {
  const { currentModel } = useStore();
  // 2. 開閉状態 (初期値: false = 閉じている)
  const [isOpen, setIsOpen] = useState(false);

  if (!currentModel) return null;

  return (
    <div
      // 3. 全体をタップ可能にし、背景色やポインターを追加
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "bg-black/80 border-l-2 border-cyan-500 p-4 text-cyan-500",
        "font-mono text-sm w-64 backdrop-blur-sm",
        "cursor-pointer transition-colors hover:bg-black/90", // ホバー効果
        "select-none" // テキスト選択防止
      )}
    >
      {/* ... (省略) Name/Quote ... */}
      <h2 className={cn("text-lg font-bold mb-1 text-white flex justify-between items-center")}>
        {currentModel.name}
        {/* Mobile用の開閉アイコン (PCでは非表示) */}
        <span className={cn("text-xs md:hidden transform transition-transform", isOpen ? "rotate-180" : "")}>
          ▼
        </span>
      </h2>

      {/* 4. 詳細部分を囲むdiv (クラスで制御) */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100 md:mt-4"
        )}
      >
          {/* Tech Spec, Description 等はこの中に入れる */}
      </div>
    </div>
  );
}
```

## 2. Footer 文字位置調整 (Part 1)

フッターのモデル名 (`currentModel.name`) が少し上に寄って見えないよう、中央揃えを強化します。

### `src/app/components/layout/ViewerLayout.tsx`

```tsx
              {/* [ Label ] Current Item Name */}
              <div
                className={cn(
                  "text-xs text-cyan-200 font-bold min-w-[100px] text-center",
                  "flex items-center justify-center pt-0.5" // [Modified] 中央揃えと微調整
                )}
              >
```

---

## 3. Title & Panel Absolute Layout Adjustment (Part 2)

スマホ画面でタイトルが横に長すぎるとパネルと重なるため、**「タイトルを改行」** し、**「パネル位置を下げる」** ことでスペースを確保します。

### `src/app/components/layout/ViewerLayout.tsx`

#### A. タイトルの改行

`PROJECT:` と `LAST STAND` の間に `<br />` を入れ、スマホ (`md:hidden`) だけで改行させます。

```tsx
            <h1
              className={cn(
                "text-2xl md:text-4xl font-bold",
                "tracking-widest border-b-2 border-cyan-500",
                "pb-2 inline-block",
              )}
            >
              PROJECT: <br className="md:hidden" /> LAST STAND
            </h1>
```

#### B. パネル位置の調整

詳細パネルの開始位置 `top-20` (80px) を `top-32` (128px) に変更し、タイトルの下に来るようにします。PC (`md:top-24`) はそのまま維持します。

```tsx
        {/* --- INFO PANEL LAYER (Absolute) --- */}
        {/* z-20: Header(z-10)より手前。pointer-events-autoでクリック可能 */}
        {/* [Modified] top-20 -> top-32 (スマホでの位置を下げる) */}
        <div className={cn("absolute top-32 right-6 z-20",
        "md:top-24 md:right-12 pointer-events-auto")}>
        <InfoPanel />
        </div>
```
