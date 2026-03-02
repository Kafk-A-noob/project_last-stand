# Bug Fix: Deployment Issues (UI Sync & Error Styling)

**Date:** 2026-02-12
**Status:** Planning

## 1. 構造の解剖 (Anatomy of the Issue)

今回のバグは、「3Dロード完了通知 (`useEffect`)」に「UIデータの更新」を依存させていたことが原因です。

- **正常系:** ボタン押下 -> モデルロード開始 -> 完了 -> UI更新 (OK)
- **異常系 (404/Network Error):** ボタン押下 -> モデルロード開始 -> 失敗 -> **完了イベントが発火しない** -> UI更新されない (NG)

Reactの設計原則では、「UIの状態 (`State`)」は「外部リソースのロード状態 (`Effect`)」から切り離して管理すべきです。今回は `store.ts` が `Single Source of Truth` (信頼できる唯一の情報源) となり、**UI更新の主導権**を持つように修正します。

## 2. 概念翻訳 (Concept Translation)

### Unity/リアルタイム3Dコンテンツでの例え

- **変更前:** `GameObject` が `Instantiate` され、その `Start()` 関数が呼ばれて初めて、UIパネルのテキスト (`Text.text`) を書き換える方式。もし `Instantiate` に失敗したら、UIはずっと前のアイテムのまま。
- **変更後:** 「武器選択ボタン」を押した瞬間に、まずUIパネルのテキスト (`Text.text`) を強制的に書き換える。その後、非同期でプレハブのロード (`Resources.LoadAsync`) を開始する方式。これを Web開発では **「楽観的UI更新 (Optimistic UI Update)」** と呼びます。

## 3. 実装手順 (Implementation Steps)

### Step 1: `src/lib/store.ts`

- `setIsLoaded` アクションを追加し、ロード状態の管理を分離します。
- `goToNext` / `goToPrev` 内で、即座に `currentModel` を更新するロジックに変更します。

### Step 2: `src/app/components/canvas/ManualLoader.tsx`

- `setModelData` (データ更新) を廃止し、`setIsLoaded(true)` (ロード完了通知) のみに簡素化します。これにより、ローダーが勝手にデータを上書きするリスクを排除します。

### Step 3: `src/app/components/ui/InfoPanel.tsx`

- `isLoaded` フラグによる表示制限を撤廃し、`currentModel` が存在すれば即座にテキストを表示するように変更します。ユーザー待機時間を「ゼロ」に感じさせるUX改善です。

### Step 1: `src/lib/store.ts`

UI更新の主導権を「ロード完了後」から「ボタンを押した瞬間（楽観的更新）」に変更します。

1. `setIsLoaded` アクション（ロード状態管理の分離）を追加。
2. `currentModel` の初期値をManifestから設定。
3. `goToNext` / `goToPrev` 内で、即座に `currentModel` を更新するロジックに変更。

```typescript
// src/lib/store.ts (Partial)

interface AppState {
  // ...
  setIsLoaded: (status: boolean) => void; // [New]
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  currentModel: ASSET_MANIFEST[0], // [Mod] 初期値をセット

  // ...

  // [Mod] setTargetPathでもModel情報を更新
  setTargetPath: (path) => {
    const target = ASSET_MANIFEST.find((item) => item.path === path);
    set({ targetPath: path, currentModel: target || null, isLoaded: false });
  },

  setModelData: (data) => set({ isLoaded: true, currentModel: data }),
  resetModelData: () => set({ isLoaded: false }),
  setIsLoaded: (status) => set({ isLoaded: status }), // [New]

  goToNext: () => {
    set((state) => {
      // ... (検索ロジック)
      const nextIndex = (currentIndex + 1) % activeItems.length;
      const nextItem = activeItems[nextIndex];

      return { 
        targetPath: nextItem.path,
        currentModel: nextItem, // [Important] 即座にUI更新 (Optimistic Update)
        isLoaded: false 
      };
    });
  },
  // goToPrev も同様に修正
}));
```

### Step 2: `src/app/components/canvas/ManualLoader.tsx`

ローダーは「モデルデータのセット」をやめ、「ロード完了通知」のみに専念させます。

```typescript
// src/app/components/canvas/ManualLoader.tsx (Partial)

// [Mod] setModelData ではなく setIsLoaded を取得
const setIsLoaded = useStore((state) => state.setIsLoaded);

useEffect(() => {
  if (gltf) {
    // [Mod] データ上書きをやめ、ステータスのみ更新
    setIsLoaded(true);
  }
}, [gltf, setIsLoaded]);
```

### Step 3: `src/app/components/ui/InfoPanel.tsx`

ロード完了 (`isLoaded`) を待たずに、データがあれば即表示するようにします。

```tsx
// src/app/components/ui/InfoPanel.tsx (Partial)

export default function InfoPanel() {
  const { currentModel } = useStore(); // [Mod] isLoaded は不要

  // [Mod] currentModel があれば表示 (ロード中でも可)
  if (!currentModel) return null; 

  return (
    // ...
  );
}
```

### Step 4: `src/app/components/canvas/ViewCanvas.tsx`

エラー時の表示崩れを防ぐため、絶対配置で中央に固定します。

```tsx
// src/app/components/canvas/ViewCanvas.tsx (Partial)

<ErrorBoundary
  fallback={
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-mono text-xs bg-black/80 p-4 border border-red-500 rounded z-0">
      WARNING: VISUAL MODULE OFFLINE. <br/>
      (Model data not found or corrupted)
    </div>
  }
>
  <Scene />
</ErrorBoundary>
```

## 4. セキュリティと安全性 (Security & Safety)

### XSS (クロスサイトスクリプティング) リスク

- エラーメッセージを表示する際、外部からの入力（APIエラー内容など）をそのまま `dangerouslySetInnerHTML` 等で表示すると、悪意あるスクリプトが埋め込まれる脆弱性となります。
- 今回は React の標準レンダリング (`{message}`) を使用しているため、自動的にエスケープ処理が行われ安全ですが、将来的にエラーログをサーバーから取得して表示する場合は注意が必要です。

## 5. AI非依存能力の育成 (Survival Skills)

もしAIがいなくなった場合、この種の問題をどう解決するか？

1. **Chrome DevTools の活用:**
    - **Networkタブ:** ロード中のファイルが `Pending` なのか `404` なのかを確認。もし `404` でUIが変わらないなら、「ロード完了待ち」のロジックが疑われます。
    - **React Developer Tools (Extension):** コンポーネントの `State` や `Props` をリアルタイムで監視。ボタンを押した瞬間に `State` が変わっているか？ もし変わっていないならイベントハンドラ (`onClick`) 内のロジックミスです。

2. **公式ドキュメントの参照:**
    - `Zustand` の状態更新パターン: `node_modules/zustand/README.md` または公式GitHubを参照し、「非同期アクション (`async action`)」と「同期アクション」の書き方の違いを確認します。
