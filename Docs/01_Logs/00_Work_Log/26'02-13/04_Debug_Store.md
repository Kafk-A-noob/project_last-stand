# Debug Plan: Store Navigation

**Date:** 2026-02-13
**Status:** Debugging

## 1. 現象 (Issue)

- `Radio` (404 Error) の状態で [NEXT] を押しても、エラーメッセージが `React_Logo` に変わらない。
- つまり、`store.ts` の `goToNext` が動いていないか、`targetPath` の更新が `Scene` に伝わっていない。

## 2. デバッグ手順 (Debug Steps)

`src/lib/store.ts` にログ出力を仕込みます。

```ts
  goToNext: () => {
    set((state) => {
      console.log("Current Path:", state.targetPath); // Log 1

      const activeItems = ASSET_MANIFEST.filter((item) => item.active);
      console.log("Active Items:", activeItems.length); // Log 2

      if (activeItems.length === 0) return state;

      const currentIndex = activeItems.findIndex(
        (item) => item.path === state.targetPath,
      );
      console.log("Current Index:", currentIndex); // Log 3

      const nextIndex = (currentIndex + 1) % activeItems.length;
      console.log("Next Index:", nextIndex); // Log 4

      const nextItem = activeItems[nextIndex];
      console.log("Next Item:", nextItem.name); // Log 5

      return {
        targetPath: nextItem.path,
        currentModel: nextItem,
        isLoaded: false
      };
    });
  },
```

この変更を行ってから、ブラウザで [NEXT] ボタンを押し、コンソール（F12）に何が出るか教えてください。
もしログが一切出なければ、ボタン側の `onClick` が発火していません。
