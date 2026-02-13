# 実装計画書 (2026-01-27)

## Phase 2: Blender to Web パイプライン (First Asset)

### 概要

本計画書は、Phase 2「Unity知識の移植」の第一歩として、Blenderで作成した3DモデルをWeb標準規格である **glTF (glb)** 形式でエクスポートし、R3F環境で表示するまでの手順を定義します。

### 実行対象

- **ターゲット:**
  - Blender (外部ツール)
  - `D:\KafkA\Documents\project_last-stand\public\models` (新規ディレクトリ)
  - `app/components/ModelViewer.tsx` (新規コンポーネント)
- **目的:** BlenderからWebへの「アセット搬入ルート」の開通

### 1. ディレクトリ準備 (System)

- [x] `public/models` ディレクトリを作成

### 2. Blender作業 (Manual Execution)

詳細は `Docs/Manual/Blender_R3F_Setup.md` を参照のこと。

- [ ] **モデル作成:** Reactロゴ (Atom形状)
  - X軸で立たせたリングを、互いに60度ずつZ軸回転させて配置。
- [ ] **マテリアル設定:**
  - Principled BSDFを使用
  - Base Color: #61DAFB (React Blue)
  - Emission: 同色でStrengthを調整
- [ ] **最適化 (Optimization):**
  - Scaleの適用 (`Ctrl+A` -> Scale)
  - 全てを1つのオブジェクトに結合 (`Ctrl+J`)
  - 原点 (Origin) を重心 `(0,0,0)` に設定
- [ ] **エクスポート:**
  - Format: `.glb`
  - Path: `public/models/react_logo.glb`

### 3. R3F 実装 (Coding)

- [ ] **`app/components/ReactLogo.tsx` の作成**
  - `useGLTF` フックを使用したモデルロード
  - **Billboard実装:** `<Billboard follow={true}>` でラップし、常にカメラに向くようにする。
  - **アニメーション:** `useFrame` を使用し、内部MeshをZ軸（視線軸）で回転させる。
- [ ] **`app/components/Scene.tsx` の更新**
  - 現在のCubeを削除し、`<ReactLogo />` コンポーネントに差し替え

## Verification Plan

- **ブラウザ確認:**
  - 赤いCubeが消え、Blenderで作ったReactロゴが表示されていること。
  - カメラを動かしてもロゴが常にこちらを向いていること (Billboard)。
  - ロゴが回転（ロール）していること。
