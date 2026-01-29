# Mission: Manual Draco Loader [Code Implementation]

デコーダーの配置お疲れ様でした。これで「エンジン（デコーダー）」は積まれました。
次はそれを動かす「車体（ローダー）」を組み立てます。

## 1. 作成するファイル

`app/components/ManualLoader.tsx`

## 2. 実装のステップ

以下のスニペットを順番に記述していきます。

### Step 1: 必要なモジュールのインポート

```tsx
"use client";

import { useRef } from "react";
import { Group } from "three";
import { useLoader, useFrame } from "@react-three/fiber";

// Three.js標準ローダー: glTF形式(.gltf / .glb)を読み込む
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Three.js追加ローダー: Draco圧縮されたデータを解凍する
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
```

### Step 2: コンポーネントの骨組み

```tsx
export default function ManualLoader() {
  const meshRef = useRef<Group>(null);
  
  // ロード処理
  const gltf = useLoader(GLTFLoader,
    "/models/React_Logo.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <primitive object={gltf.scene} ref={meshRef} />
  );
}
```

### Step 3: 合体とロード (The Coupling)

`useLoader` の第3引数（コールバック関数）を使って、`GLTFLoader` が動き出す前に `DRACOLoader` を取り付けます。

#### 解説 (Deep Dive)

- **`useLoader(LoaderClass, url, extensions)`**: R3Fの強力なフックです。
- **`extensions` コールバック**: ローダーがファイルを読み込みに行く **直前** に実行されます。ここで「改造」を行えます。
- **`setDecoderPath`**: ここで指定したパス (`/draco/`) にある `.wasm` ファイルが、必要になった瞬間にブラウザによってダウンロードされます（Networkタブで確認できます）。

---

## 3. レベルアップ知識 (Must Know)

今回の実装で「動かす」ことはできましたが、実務では以下の知識も必須です。

### A. 自動化ツール `gltfjsx`

今回 `ManualLoader` を手書きしましたが、モデルが複雑になると「右腕のパーツだけ動かしたい」といった時に困り果てます（`primitive` だと中身がブラックボックスだから）。
プロの現場では **`gltfjsx`** というCLIツールを使い、`ReactLogo.tsx` のような「パーツ全展開コード」を自動生成します。
「中身をいじりたいなら `gltfjsx`」、「ただ置くだけなら `primitive` (Manual)」と使い分けます。

### B. ローディング画面 (`Suspense`)

今のコードだと、モデルが重いとロード中は画面が真っ白になります。
Reactの **`<Suspense>`** コンポーネントを使うと、ロード中に「Now Loading...」のようなUIを簡単に表示できます。Web3Dでは必須のマナーです。

### C. 使い回しの罠 (`Clone` vs `primitive`)

`gltf.scene` は「世界に一つだけのオブジェクト」です。
`<primitive object={gltf.scene} />` を2回書くと、分身せずに **「移動」** してしまいます（インスタンスが共有されているため）。
同じモデルをたくさん出したい場合は、`@react-three/drei` の **`<Clone>`** コンポーネントを使うか、`gltfjsx` で生成されたコンポーネントを使います。
