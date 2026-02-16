# OrbitControls 安全化手順 (Context Lost対策)

**日付:** 2026-02-13
**ステータス:** 修正完了間近

## 1. 修正の目的

`OrbitControls` が、モデルのロード失敗時やその復帰時にCanvasと競合し、致命的なクラッシュ (`Context Lost`) を引き起こしていることが判明しました。
これを防ぐため、**「モデルが正しくロードされている時（isLoaded = true）だけ OrbitControls を有効にする」** ように変更します。

## 2. 修正手順

`src/app/components/canvas/Scene.tsx` を修正します。

### ステップ 1: `useStore` と `isLoaded` の呼び出し追加

```tsx
// 変更前
export default function Scene() {
  const targetPath = useStore((state) => state.targetPath);
  return (
    // ...

// 変更後
export default function Scene() {
  const targetPath = useStore((state) => state.targetPath);
  // [New] ロード完了フラグを取得
  const isLoaded = useStore((state) => state.isLoaded);

  return (
    // ...
```

### ステップ 2: `OrbitControls` の条件付きレンダリング

一番下の `<OrbitControls />` 部分を書き換えます。コメントアウトは削除して構いません。

```tsx
      {/* カメラ操作 */}
      {/*
      条件付きレンダリング: isLoaded が true の時だけ有効化する。
      これにより、ロード中やエラー発生時（404）には OrbitControls がアンマウントされ、
      Canvasコンテキストを道連れにしてクラッシュするのを防ぎます。
      */}
      {isLoaded && <OrbitControls makeDefault enablePan={false} />}
    </Canvas>
  );
}
```

※ `Scene.tsx` 全体を以下に記載します（参考にしてください）。

```tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import ManualLoader from "./ManualLoader";
import SmartLoader from "../ui/SmartLoader";

export default function Scene() {
  const targetPath = useStore((state) => state.targetPath);
  const isLoaded = useStore((state) => state.isLoaded); // [New]

  return (
    <Canvas>
      {/* Unity: Directional Light */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* モデル読み込み (Suspense: 非同期処理の基本作法) */}
      <Suspense fallback={<SmartLoader />}>
        {/* ↓ ここでエラーを捕まえる */}
        <ErrorBoundary
          resetKeys={[targetPath]}
          fallbackRender={({ error }: { error: any }) => (
            <Html center>
              {/* エラー表示は元のままでOK */}
              <div
                style={{
                  color: "red",
                  background: "rgba(0,0,0,0.8)",
                  padding: "10px",
                  border: "1px solid red",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  maxWidth: "300px",
                }}
              >
                <h3>SYSTEM ERROR</h3>
                <p style={{ fontSize: "10px", marginTop: "4px" }}>
                  {error.message}
                </p>
              </div>
            </Html>
          )}
        >
          {/* LoadGuard付きLoader */}
          <ManualLoader />
        </ErrorBoundary>
      </Suspense>

      {/* カメラ操作 (条件付きレンダリング) */}
      {isLoaded && <OrbitControls makeDefault enablePan={false} />}
    </Canvas>
  );
}
```
