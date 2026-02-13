# Fix Request: Cleanup & Typo

**Date:** 2026-02-12
**Target:** `src/app/page.tsx`, `src/app/components/layout/ViewerLayout.tsx`

惜しい！あと少しです。
`ViewCanvas` は正しく実装されていますが、`page.tsx` に **「古いコード（地雷）」** が残っていました。
これがある限り、使っていなくてもエラーになります。

## 1. `src/app/page.tsx` の修正 (Cleanup)

使わなくなった `dynamic` import と `Scene` の定義を **削除** してください。

### Before (修正前)

```tsx
import dynamic from "next/dynamic"; // ← 削除
import ViewerLayout from "./components/layout/ViewerLayout";
import ViewCanvas from "./components/canvas/ViewCanvas"

// Sceneは重いので... (中略) ...
const Scene = dynamic(() => import("./components/canvas/Scene"), { // ← 削除
  ssr: false, // ← 削除
}); // ← 削除

export default function Home() {
```

### After (修正後) - これだけにする

```tsx
import ViewerLayout from "./components/layout/ViewerLayout";
import ViewCanvas from "./components/canvas/ViewCanvas";

export default function Home() {
  return (
    <ViewerLayout>
      <ViewCanvas />
    </ViewerLayout>
  );
}
```

---

## 2. `ViewerLayout.tsx` の修正 (Typo Fix)

Prevボタン（左矢印）にまだ `hober` が1箇所残っています。

**Target:** `src/app/components/layout/ViewerLayout.tsx` (103行目付近)

```tsx
// ❌ hober:bg-cyan-500/20
// ⭕ hover:bg-cyan-500/20
```

---

この2つを修正すれば、今度こそ完璧にビルドが通ります！
修正をお願いします。
