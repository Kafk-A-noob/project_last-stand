# Implementation Intent: Model Registry

**Date:** 2026-02-07
**Phase:** 3.5 (Asset Production & Scalability)
**Feature:** Model Registry (Playlist)

## 1. 目的 (Objective)

`ManualLoader` が単発のパス読み込みしかできない現状を脱却し、**「複数のモデルを順次切り替えて表示する」** 機能を実現するため、アプリケーション全体の「モデル台帳 (Registry)」を作成します。

## 2. 設計 (Architecture)

### 2.1 The Registry (`src/lib/registry.ts`)

- **Unity翻訳:** `Build Settings > Scenes In Build` のリスト、あるいは `ScriptableObject` で管理するアイテムデータベース。
- **データ構造:**

  ```typescript
  export type RegistryItem = {
    id: string;   // ユニークキー
    path: string; // .glbファイルの場所
  };
  ```

- 単純な配列 (`Array`) で管理し、`ViewerLayout` からインデックスアクセス可能にします。

### 2.2 Navigation Logic (`ViewerLayout.tsx`)

- **Unity翻訳:** `SceneManager.LoadScene(buildIndex + 1)`
- 現在の `targetPath` が「配列の何番目か」を検索 (`findIndex`)。
- [NEXT] ボタンで `index + 1`、[PREV] で `index - 1` の要素を取得し、Storeにセットします。
- **Loop:** 最後の要素で [NEXT] を押すと最初に戻る（ループ仕様）。

## 3. なぜこれをやるのか (Why?)

- **拡張性:** モデルが増えた時、コード修正箇所を `registry.ts` 1箇所に集約できる。
- **ユーザー体験:** ボタン1つで次々と作品を見られる「プレイリスト体験」の提供。
