# How-To: Implement Hybrid Navigation (Part 2: Footer UI)

**Date:** 2026-02-09
**Target:** `src/app/components/layout/ViewerLayout.tsx`
**Goal:** ボタン全列挙をやめ、シンプルな「次へ・前へ」ボタンに変更する。

## 1. 変更の概要 (Concept)

- **Before:** `ASSET_MANIFEST.map` で全てのボタンを展開していた。
- **After:**
  - `[ < ]` (Prev)
  - `[ Current Item Name ]` (Label)
  - `[ > ]` (Next)
  - `[ Menu ]` (Overlay Open - 今日はまだ作らない)

---

## 2. 実装手順 (Step-by-Step)

### Step 1: Actionの取得

Storeから先ほど作った `goToNext`, `goToPrev` と、現在のモデル情報 `currentModel` を取得します。

```tsx
// src/app/components/layout/ViewerLayout.tsx

export default function ViewerLayout({ children }: ViewerLayoutProps) {
  // アクション取得 (既存の setTargetPath はもう使わないかも)
  const { currentModel, goToNext, goToPrev } = useStore((state) => ({
    currentModel: state.currentModel,
    goToNext: state.goToNext,
    goToPrev: state.goToPrev,
  }));
```

### Step 2: Footerの書き換え

`ASSET_MANIFEST.map` の部分を丸ごと削除し、以下の3つのボタンに置き換えます。

```tsx
{
  /* 操作ボタンエリア (Footer) */
}
<div className="flex gap-4 items-center">
  {/* [ < ] Prev Button */}
  <button
    onClick={goToPrev}
    className={cn(
      "px-4 py-2 text-xs border border-white/10 rounded",
      "hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all",
      "active:scale-95",
    )}
  >
    {"<"}
  </button>

  {/* [ Label ] Current Item Name */}
  <div className="text-xs text-cyan-200 font-bold min-w-[100px] text-center">
    {/* モデルがロードされるまでは Loading... と表示 */}
    {currentModel ? currentModel.name : "LOADING..."}
  </div>

  {/* [ > ] Next Button */}
  <button
    onClick={goToNext}
    className={cn(
      "px-4 py-2 text-xs border border-white/10 rounded",
      "hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all",
      "active:scale-95",
    )}
  >
    {">"}
  </button>

  {/* [ Menu ] Button (Placeholder) */}
  <button
    className={cn(
      "ml-4 px-4 py-2 text-xs border border-white/10 rounded",
      "text-gray-400 hover:text-white transition-all",
    )}
    disabled // 今日はまだ作らない
  >
    [ MENU ]
  </button>
</div>;
```

---

## 3. 解説 (Why?)

- **`ASSET_MANIFEST.map`の廃止:** これにより、アイテムが100個になってもフッターのサイズは変わりません。
- **`currentModel`の利用:** `store.ts` が現在選択されているアイテムを知っているので、それを表示するだけです。
- **シンプル化:** 画面がスッキリし、モバイルでの表示領域が確保されました。

実装後、`[ < ]` や `[ > ]` を押して、コンソールエラーが出ないこと（今はRadioしかないので何も起きないように見えますが、内部で再セットされています）を確認してください。
