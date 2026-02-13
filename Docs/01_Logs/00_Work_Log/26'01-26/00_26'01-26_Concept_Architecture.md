# 実装計画: Phase 1.8 座学・設計戦略

## Goal Description

「職業訓練校での拘束」という環境制約を逆手に取り、PCスペックを要さない「概念理解」と「アーキテクチャ設計」を先行して行う。これにより、帰宅後のPhase 2（実機検証）をスムーズに開始できる状態にする。

## User Review Required
>
> [!NOTE]
> 本計画はコードの直接的な変更よりも、ドキュメント作成とドラフトコードの提示が主となる。

## Proposed Changes

### 1. Unity to R3F 概念翻訳講義 (Lecture)

Unity開発者が躓きやすいポイントを重点的に解説するドキュメントを作成、またはチャットで講義を行う。
- **Asset Loading:** `Resources.Load` / `AssetBundle` -> `useGLTF` (Hook)
- **Object Management:** Prefab -> Component (JSX)
- **Life Cycle:** `Start/Update` -> `useEffect/useFrame`

### 2. アーキテクチャ設計 (Drafting)

帰宅後に使用する「モデル表示用コンポーネント」のひな形を作成する。

#### [NEW] Components/ModelViewer.tsx (Draft)

```tsx
// 概念実証用のドラフトコード
// 実際のファイル作成は帰宅後、またはユーザー承認後に行う
export function ModelViewer({ modelPath }: { modelPath: string }) {
  // ... implementation logic
}
```

## Verification Plan

### Manual Verification

- ユーザーが解説内容を読み、Unityの概念とマッピングできているかを確認する。
- ドラフトコードが「Unityでいうところの何をしようとしているか」理解できるかを確認する。
