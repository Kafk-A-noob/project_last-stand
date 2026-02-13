# Debug Plan: Isolate Context Lost

**Date:** 2026-02-13
**Status:** Debugging

## 1. 仮説 (Hypothesis)

`Context Lost` の原因は、モデルのロード失敗そのものではなく、**「失敗時のフォールバック処理（特にHTMLオーバーレイ）」** にある可能性があります。
`@react-three/drei` の `<Html>` コンポーネントは、CanvasとDOMを行き来する複雑な処理を行うため、エラー発生時のアンマウント/マウント競合でコンテキストを破壊している疑いがあります。

## 2. 検証手順 (Verification Steps)

`src/app/components/canvas/Scene.tsx` を一時的に簡略化し、犯人を特定します。

### Step 1: `Suspense` のフォールバックを無効化

ロード中の「LOADING...」表示（`SmartLoader`）を無効にします。

```tsx
// 変更前
<Suspense fallback={<SmartLoader />}>

// 変更後 (一時的)
<Suspense fallback={null}>
```

### Step 2: `ErrorBoundary` のフォールバックを簡略化

エラー時の「SYSTEM ERROR」表示（HTML）を、ただの「赤い箱（3Dオブジェクト）」に変更します。

```tsx
/*
fallbackRender={({ error }) => (
  <Html center> ... </Html>
)}
*/
// 変更後 (一時的)
fallbackRender={() => (
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="red" />
  </mesh>
)}
```

## 3. 確認事項

この状態で `ReactLogo` → `Radio` に切り替えてください。

- **赤い箱が表示され、Context Lost が出ない** → 犯人は `<Html>` コンポーネント。
- **それでも Context Lost が出る** → 犯人は `useGLTF` や `Canvas` 設定、またはドライバーレベルの問題。
