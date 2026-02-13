# Tech Report: Optimistic UI & Hybrid State Management

**Target:** `src/lib/store.ts` | `ManualLoader.tsx` | `ViewCanvas.tsx`
**Date:** 2026-02-13

## 1. 概要 (Overview)

Vercelデプロイ時に露呈した「ネットワーク遅延によるUIの反応の悪さ」を解決するため、**Optimistic UI (楽観的UI更新)** パターンを導入しました。
また、3Dモデルのメタデータ（ポリゴン数など）を正確に表示するため、**Hybrid State Management (即時更新 + 遅延マージ)** を採用しました。

## 2. 実装パターン解説 (Pattern Breakdown)

### A. Optimistic UI (楽観的更新)

「ユーザーのアクション（ボタン押下）」をトリガーに、**APIのレスポンスを待たずに** UIを更新する手法です。

- **実装場所:** `store.ts` (`goToNext`, `goToPrev`, `setTargetPath`)
- **Before:**
  1. `path` をセット
  2. ロード開始
  3. ロード完了 -> `setModelData` -> UI更新 (遅い)
- **After:**
  1. `path` をセット + **`currentModel` (Manifestデータ) を即セット** -> UI更新 (爆速！)
  2. ロード開始

### B. Hybrid State Management (ハイブリッド状態管理)

「コードで定義された静的データ」と「ロード後に判明する動的データ」を組み合わせる手法です。

- **Static (Store):** 名前、説明文、パス (Manifest由来) -> **即時表示**
- **Dynamic (Loader):** 頂点数、ポリゴン数 (DracoLoader由来) -> **ロード後にマージ**

```typescript
// src/lib/store.ts
setModelData: (data) =>
  set((state) => ({
    // 既存の currentModel (Static) に、新しい data (Dynamic) を上書きマージする
    currentModel: state.currentModel
      ? { ...state.currentModel, ...data }
      : null,
  }));
```

## 3. 各コンポーネントの役割 (Component Roles)

| Component                   | Role                         | Changes                                                                                               |
| :-------------------------- | :--------------------------- | :---------------------------------------------------------------------------------------------------- |
| **Store (`store.ts`)**      | **司令官 (Source of Truth)** | Manifestデータを即時反映するロジックを追加。データマージ機能の実装。                                  |
| **Loader (`ManualLoader`)** | **現場 (Worker)**            | データ全体の上書き(`setModel`)を廃止。頂点数等の**差分データのみ**を報告(`updateModel`)するよう変更。 |
| **Canvas (`ViewCanvas`)**   | **表示 (Display)**           | エラー発生時(`ErrorBoundary`)の表示を、中央揃えのシステム警告風スタイルに変更。                       |

## 4. Unityエンジニア向けの翻訳 (Analogy)

- **Optimistic UI:**
  `InstantiateAsync` を呼んだ瞬間に、ロードが終わるのを待たずに `InventoryUI.text` を書き換えること。「ロード画面」を出さずにプレイヤーを待たせないテクニック。

- **Hybrid State:**
  `ScriptableObject` (Manifest) のマスタデータですぐにアイコンを表示し、実際の `Prefab` (GLB) がロードされたら、その `MeshFilter` から頂点数を取得して右下にこっそり追記するイメージ。

## 5. 今後の注意点 (Note)

- `asset-manifest.ts` が「正」となるため、Blender側で名前や説明文を変えても反映されません。テキスト変更はコード側で行ってください。
