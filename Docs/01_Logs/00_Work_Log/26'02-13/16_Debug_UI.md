# Debug Plan: UI Button Click

**Date:** 2026-02-13
**Status:** Debugging

## 1. 現象 (Issue)

- `store.ts` の `goToNext` 内のログが出ない。
- つまり、ボタンを押しても `goToNext` が呼ばれていない可能性が高い。

## 2. デバッグ手順 (Debug Steps)

`src/app/components/layout/ViewerLayout.tsx` のボタン処理を一時的に書き換え、クリックイベントが発火しているか確認します。

```tsx
// 変更前
// onClick={goToNext}

// 変更後: ログを挟む
onClick={() => {
  console.log("Button Clicked: NEXT");
  goToNext();
}}
```

同様に `Prev` ボタンも変更します。

```tsx
onClick={() => {
  console.log("Button Clicked: PREV");
  goToPrev();
}}
```

これでボタンを押して、コンソールに `Button Clicked: NEXT` が出るか確認してください。

- **出る:** `store.ts` の呼び出し部分に問題がある。
- **出ない:** CSS (`pointer-events` や `z-index`) の問題で、クリックがブロックされている。
