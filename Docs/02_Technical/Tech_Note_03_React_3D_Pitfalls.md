# Technical Note: React Three Fiber Optimization & Pitfalls

**Date:** 2026-02-16
**Topic:** R3F State Management, Hooks, and Asset Loading

本プロジェクトの開発を通じて得られた、React Three Fiber (R3F) および Next.js を使用した3Dウェブ開発における重要な技術的知見をまとめる。

## 1. The Infinite Loop Trap in `useEffect`

### Problem

`ManualLoader` コンポーネントにおいて、モデルのロード完了時にStoreを更新しようとした際、`Maximum update depth exceeded` (無限ループ) が発生した。

### Cause

`useEffect` の依存配列 (Dependency Array) に `currentModel` (Storeの状態) を含めていた状態で、その `useEffect` 内部で `updateModel` (Storeの更新アクション) を呼び出していた。

1. `useEffect` 実行
2. `updateModel` コール → `currentModel` が更新される
3. `currentModel` が変わったので `useEffect` が再実行される
4. (無限ループ)

### Solution

**「Storeの状態に依存して、Storeを更新する」パターンを避ける。**

- **解決策:** Storeの値を参照するのではなく、不変のデータソース（今回は `ASSET_MANIFEST`）から必要な情報を取得する設計に変更した。
- R3Fに限らず、Reactのフック設計において最もハマりやすい罠の一つ。

## 2. Content-Length & Dev Servers

### Problem

`fetch(url, { method: "HEAD" })` で `.glb` ファイルのサイズを取得しようとしたが、`Content-Length` ヘッダーが `null` となり取得できなかった。

### Cause

Next.js の開発サーバー (`next dev` / `next start`) は、静的ファイルを配信する際に `Transfer-Encoding: chunked` を使用したり、Gzip圧縮をかけたりする場合があり、その際はファイルサイズが確定しないため `Content-Length` ヘッダーを送信しない仕様となっていることが多い。

### Solution

**「動的に取れない値は、静的に管理する」**

- ポートフォリオサイトという性質上、アセットは頻繁に変更されない。
- そのため、無理にネットワーク層で解決せず、マニフェストファイル (`asset-manifest.ts`) に手動で値を記述する「運用の工夫」で解決した。
- これによりHTTPリクエストを1回減らすことができ、パフォーマンス向上にも寄与した。

## 3. Optional Chaining (`?.`) importance

### Problem

Storeの型定義を `Optional` (`vertices?: number`) に変更した後、UIコンポーネント (`InfoPanel.tsx`) がクラッシュした。

### Lesson

**型定義を変えたら、利用箇所をすべて疑うこと。**

- `techSpecs.vertices` が `undefined` になる可能性が生まれた時点で、`techSpecs.vertices.toLocaleString()` は危険なコードになる。
- `techSpecs.vertices?.toLocaleString() ?? "-"` のように、**「値が無い場合」のフォールバックを常に用意する** のが堅牢なUI実装の基本。

## 4. Invisible Environment Maps

### Insight

PBR (Physically Based Rendering) マテリアル、特に金属 (Metalness) やガラス (Transmission) は、**「映り込むもの」がないと黒く塗りつぶされてしまう。**

- ライト (`AmbientLight`, `DirectionalLight`) だけでは、鏡面反射 (Specular Reflection) は表現できない。
- 背景を黒 (`bg-black`) にしたい場合でも、`<Environment preset="city" background={false} />` を置くことで、「目には見えないが、反射計算には使われる風景」を用意する必要がある。
- これにより、"Data Archive" という無機質な空間演出と、リアルな質感表現を両立させた。
