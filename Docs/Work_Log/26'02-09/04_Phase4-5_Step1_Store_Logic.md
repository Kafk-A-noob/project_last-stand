# How-To: Implement Hybrid Navigation (Part 1: Logic)

**Date:** 2026-02-09
**Target:** `src/lib/store.ts`
**Goal:** 「次へ」「前へ」ボタンを機能させるためのロジックを Store に追加する。

> [!IMPORTANT]
> **これは「写経用」の手順書です。**
> AIがコードを自動生成することは禁止されています。以下の解説を読み、自分の手で実装してください。

## 1. ロジックの設計 (Mental Model)

ナビゲーションを実現するには、以下の計算が必要です。

1. **有効なリストの取得:** `ASSET_MANIFEST` から `active: true` のアイテムだけを抽出する。
2. **現在位置の特定:** そのリストの中で、現在の `targetPath` が何番目か (`currentIndex`) を探す。
3. **移動先の決定:**
    - **Next:** `currentIndex + 1` (末尾なら 0 に戻る)
    - **Prev:** `currentIndex - 1` (先頭なら末尾に飛ぶ)

---

## 2. 実装手順 (Step-by-Step)

### Step 1: 型定義の追加

`AppState` インターフェースに、新しいアクションを追加します。

```typescript
// src/lib/store.ts

interface AppState {
  // ... (既存の定義) ...

  // アクション(Action)
  setModelData: (data: ArchiveItem) => void;
  resetModelData: () => void;

  // ▼ ここに追加 (Add Next/Prev Actions)
  goToNext: () => void;
  goToPrev: () => void;
}
```

### Step 2: Storeの実装

`create<AppState>` の中身を変更します。
`active` なアイテムの配列をあらかじめ作っておくと便利です。

```typescript
// src/lib/store.ts

export const useStore = create<AppState>((set) => ({
  // ... (既存の初期値) ...

  goToNext: () => {
    // 1. 現在のステートを取得
    set((state) => {
      // 2. 有効なアイテムだけのリストを作る
      const activeItems = ASSET_MANIFEST.filter((item) => item.active);
      if (activeItems.length === 0) return state; // 安全策

      // 3. 現在のインデックスを探す
      const currentIndex = activeItems.findIndex(
        (item) => item.path === state.targetPath,
      );

      // 4. 次のインデックスを計算 (ループ仕様)
      const nextIndex = (currentIndex + 1) % activeItems.length;

      // 5. 新しいパスをセット
      return { targetPath: activeItems[nextIndex].path };
    });
  },

  goToPrev: () => {
    set((state) => {
      const activeItems = ASSET_MANIFEST.filter((item) => item.active);
      if (activeItems.length === 0) return state;

      const currentIndex = activeItems.findIndex(
        (item) => item.path === state.targetPath,
      );

      // 4. 前のインデックスを計算 (ループ仕様)
      // (currentIndex - 1 + length) % length で負の値を防ぐ
      const prevIndex =
        (currentIndex - 1 + activeItems.length) % activeItems.length;

      return { targetPath: activeItems[prevIndex].path };
    });
  },
}));
```

---

## 3. 解説 (Why?)

- **`set((state) => { ... })`:** 現在の `state.targetPath` を知る必要があるため、関数形式の `set` を使います。
- **`% activeItems.length`:** これが「ループ (Carousel)」の魔法です。末尾に来たら 0 に戻り、先頭から後ろに行けば末尾になります。
- **`active: true` フィルタ:** これにより、開発中の `Piano` や `Can Coffee` はスキップされ、完成済みの `Radio` だけが対象になります（今はRadioしかないので、Radio同士でループします）。

実装後、コンパイルエラーが出ないことを確認してください。
（UIがないので動作確認はまだできません。次のステップでUIを作ります。）
