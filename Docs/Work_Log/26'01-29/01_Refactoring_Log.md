# Refactoring Log: Project Structure Modernization

**Date:** 2026-01-29
**Author:** Antigravity

## 概要

プロジェクトルートの散乱を解消し、保守性を向上させるために「Next.js推奨構成 (`src/` ディレクトリ)」への移行および「コンポーネントの機能的分類」を実施した。

## 実施内容

### 1. `src/` Directory Migration

`app` および `lib` ディレクトリを `src/` 下に移動。

- `tsconfig.json` の `paths` エイリアスを `@/*` -> `./src/*` に修正し、Importエラーを防止。

### 2. Component Restructuring

`src/app/components` 内を機能別に3つのディレクトリに分割。

- **📂 ui/** (2D UI Elements)
  - `InfoPanel.tsx`
  - `SmartLoader.tsx`
- **📂 canvas/** (3D Scene Elements)
  - `Scene.tsx`
  - `ManualLoader.tsx`
- **📂 layout/** (Structural Elements)
  - `ViewerLayout.tsx`

### 3. Import Path Updates

各ファイルの移動に伴い、`import` パスを自動修正済み。

- `page.tsx`: LayoutとSceneの読み込みパス修正
- `ViewerLayout.tsx`: `InfoPanel` へのパス修正 (`../ui/InfoPanel`)
- `Scene.tsx`: `SmartLoader` へのパス修正 (`../ui/SmartLoader`)

## 結果

ルートディレクトリが設定ファイルのみになり、ソースコードの所在が明確化された。
Web3D開発において混同しやすい「DOM (UI)」と「WebGL (Canvas)」が物理的に分離されたことで、今後の開発効率向上が見込まれる。
