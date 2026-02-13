# How-To: Fix Infinite Loop (Maximum Update Depth)

**Date:** 2026-02-09
**Target:** `src/app/components/layout/ViewerLayout.tsx`
**Goal:** 無限ループエラー「Maximum update depth exceeded」を修正する。

> [!IMPORTANT]
> **これは「写経用」の手順書です。**
> AIがコードを自動生成することは禁止されています。以下の解説を読み、自分の手で実装してください。

## 1. 原因 (Why?)

`useStore` の書き方に問題があります。

```tsx
// ❌ 間違い
const { currentModel, goToNext, goToPrev } = useStore((state) => ({
  currentModel: state.currentModel,
  goToNext: state.goToNext,
  goToPrev: state.goToPrev,
}));
```

`useStore` の中で `({ ... })` とオブジェクトを返すと、Reactは「毎回新しいオブジェクトが返ってきた」と判断します。
すると、「変更があったから再レンダリング」→「再レンダリングでまた新しいオブジェクト」→「また再レンダリング」…と無限ループに陥ります。

## 2. 修正手順 (Step-by-Step)

`useStore` を1つにまとめず、バラバラに取得するように書き換えます。
これならプリミティブな値（あるいは不変の関数）が返るため、無限ループしません。

### Step 1: `ViewerLayout.tsx` を修正

15行目付近の `useStore` の部分を、以下のように書き換えてください。

```tsx
// src/app/components/layout/ViewerLayout.tsx

export default function ViewerLayout({ children }: ViewerLayoutProps) {

  // ✅ 修正: 1つずつ取得する (Split Hooks)
  const currentModel = useStore((state) => state.currentModel);
  const goToNext = useStore((state) => state.goToNext);
  const goToPrev = useStore((state) => state.goToPrev);
```

※ 下の `useStore((state) => ({ ... }))` は削除してください。

保存すると、エラーが消えて正常に表示されるはずです。
