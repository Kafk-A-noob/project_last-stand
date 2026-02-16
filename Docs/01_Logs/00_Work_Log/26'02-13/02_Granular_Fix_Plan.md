# Plan C: Granular Error Boundary (The React Way)

**Date:** 2026-02-13
**Status:** Recommended

## 1. 狙い (Concept)

先ほどの「Plan B (強制リセット)」は確実ですが、**「カメラ位置までリセットされてしまう」** という大きな欠点がありました。
（ユーザーが視点を動かした後にモデルを変えると、視点が初期位置に戻ってしまう）

今回のプランでは、エラーが発生する可能性が高い **「モデル読み込み部分 (`ManualLoader`)」だけ** を `ErrorBoundary` で囲みます。
これにより、**カメラ操作 (`OrbitControls`) や ライティング (`Lights`) は生き残り**、モデルだけが安全に作り直されます。これこそがReactの強みを活かした設計です。

## 2. 修正手順 (Procedure)

2つのファイルを修正します。

### Step 1: `ViewCanvas.tsx` を元に戻す (Wait, don't revert fully)

`ViewCanvas.tsx` から `ErrorBoundary` を削除し、以前のシンプルな状態に戻します。
ただし、`Scene` は `dynamic` importのままでOKです。

```tsx
// src/app/components/canvas/ViewCanvas.tsx

export default function ViewCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Scene />
    </div>
  );
}
```

### Step 2: `Scene.tsx` に `ErrorBoundary` を導入

`Scene.tsx` の内部で、`ManualLoader` を守るように `ErrorBoundary` を配置します。

1. **Imports:**

   ```tsx
   import { ErrorBoundary } from "react-error-boundary";
   import { useStore } from "@/lib/store"; // resetKeys用
   import { Html } from "@react-three/drei"; // エラー表示を3D内に浮かべるため
   ```

2. **`targetPath` の取得:**

   ```tsx
   export default function Scene() {
     const targetPath = useStore((state) => state.targetPath);
     // ...
   ```

3. **`ManualLoader` のラップ:**

   ```tsx
   {
     /* モデル読み込み */
   }
   <Suspense fallback={<SmartLoader />}>
     {/* ↓ ここでエラーを捕まえる */}
     <ErrorBoundary
       resetKeys={[targetPath]}
       fallback={
         <Html center>
           <div className="text-red-500 font-mono text-xs bg-black/80 p-2 rounded">
             LOAD ERROR
           </div>
         </Html>
       }
     >
       <ManualLoader />
     </ErrorBoundary>
   </Suspense>;
   ```

---

## 3. コード全体 (Reference)

### `src/app/components/canvas/Scene.tsx`

````tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary"; // [New]
import { useStore } from "@/lib/store"; // [New]

import ManualLoader from "./ManualLoader";
import SmartLoader from "../ui/SmartLoader";

export default function Scene() {
  const targetPath = useStore((state) => state.targetPath); // [New]

  return (
    <Canvas>
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <Suspense fallback={<SmartLoader />}>
        <ErrorBoundary
          resetKeys={[targetPath]} // [New] パスが変わればリセット
          fallback={
            <Html center>
              <div className="text-red-500 bg-black/90 p-4 rounded border border-red-500">
                <h3 className="font-bold">SYSTEM ERROR</h3>
                <p className="text-xs">Failed to load model asset.</p>
              </div>
            </Html>
          }
        >
          <ManualLoader />
        </ErrorBoundary>
      </Suspense>


---

## 4. トラブルシューティング: Tailwindが効かない場合

もしエラー表示が「真っ白」だったり「崩れている」場合は、TailwindCSSが `<Html>` コンポーネント内でうまく適用されていない可能性があります。
その場合は、**あえてインラインスタイル** を使って確実に表示させてください。




  {/* ↓ fallbackRenderでエラー内容を表示 */}
  <ErrorBoundary
    resetKeys={[targetPath]}
    fallbackRender={({ error }: { error: any }) => (
      <Html center>
        <div style={{
          color: 'red',
          background: 'rgba(0,0,0,0.8)',
          padding: '10px',
          border: '1px solid red',
          borderRadius: '4px',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          maxWidth: '300px'
        }}>
          <h3>SYSTEM ERROR</h3>
          <p style={{ fontSize: '10px', marginTop: '4px' }}>
            {error.message}
          </p>
        </div>
      </Html>
    )}
  >
    <ManualLoader />
  </ErrorBoundary>
```

これで画面中央に具体的なエラーメッセージ（例: `Unexpected token` や `404 Not Found`）が表示されます。その内容を教えてください。

### `src/app/components/canvas/ViewCanvas.tsx`

```tsx
"use client";

import dynamic from "next/dynamic";

// Sceneの遅延読み込み (SSR無効化)
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function ViewCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Scene />
    </div>
  );
}
```
````
