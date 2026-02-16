# Manual Fix Plan: Persistent Error Boundary

**Date:** 2026-02-13
**Status:** Ready for Implementation

## 1. 現象 (Issue)

- **症状:** 3D表示で一度エラー（404 Not Found等）が発生すると、その後正常なモデルを選択してもエラー画面（赤枠の警告）が表示され続け、復帰できない。
- **原因:** `ViewCanvas.tsx` の `ErrorBoundary` コンポーネントが、内部の `Scene` コンポーネントの状態変更（モデルパスの切り替え）を検知できず、一度キャッチしたエラーを表示し続けているため。

## 2. 修正手順 (Procedure)

以下の手順に従って、`src/app/components/canvas/ViewCanvas.tsx` を手動で修正してください。
まずは **Plan A (通常のリセット)** を試し、ダメなら **Plan B (強力なリセット)** を適用します。

### Plan A: `resetKeys` の追加

`ErrorBoundary` に `resetKeys={[targetPath]}` を追加し、パスが変わったらエラーを解除するようにします。

1. **`useStore` のインポート:**

    ```tsx
    import { useStore } from "@/lib/store"; // 追加
    ```

2. **`targetPath` の取得:**

    ```tsx
    export default function ViewCanvas() {
      const targetPath = useStore((state) => state.targetPath); // 追加
      // ...
    ```

3. **`ErrorBoundary` への設定:**

    ```tsx
      <ErrorBoundary
        resetKeys={[targetPath]} // 追加
        fallback={...}
      >
        <Scene />
      </ErrorBoundary>
    ```

---

## 3. 実装後の確認 (Verification)

1. ブラウザでアプリを開く。
2. わざと存在しないモデルを選択してエラーを出す。
3. 正常なモデル（Radio等）を選択する。
    - **期待値:** 赤い警告が消え、正常に3Dモデルが表示されること。

---

## 4. Plan B: 強制リセット (Recommended if Plan A fails)

もし上記の「Plan A」で解決しない場合は、以下の「Plan B」を実行してください。
`Scene` コンポーネントに `key` プロパティを与えることで、モデル切り替え時にコンポーネントを強制的に再生成させます。

### 修正箇所: `ViewCanvas.tsx`

```tsx
<ErrorBoundary
  resetKeys={[targetPath]}
  fallback={...}
>
  {/* ↓ keyを追加 (最強のリセット方法) */}
  <Scene key={targetPath} />
</ErrorBoundary>
```

**理由:**
`resetKeys` は ErrorBoundary の状態をリセットしますが、内部の `Suspense` や `Canvas` が持っているキャッシュまでは完全にクリアできないことがあります。
`key` を変えることで、Reactは「これは別のコンポーネントだ」と認識し、ゼロから作り直すため、確実にエラー状態から脱出できます。
