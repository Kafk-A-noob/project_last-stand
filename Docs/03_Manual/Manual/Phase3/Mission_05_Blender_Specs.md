# Mission 05: The Digital Ark - Asset Production Specs

**Target:** Blender (Instruction for AI Advisor & Human Operator)
**Goal:** `Docs/Ark_Cargo.md` に記載されたアイテムを作成し、Web互換の `.glb` として出力する。

---

## Technical Constraints (技術的制約)

Webブラウザ (スマホ含む) で快適に動作させるための絶対的なルールです。
この仕様書をAIアドバイザー（Gemini等）に渡し、モデリングの指針としてください。

### 1. Geometry (形状)

- **Polycount:** 1モデルあたり **Max 20,000 tris** (推奨: 15,000以下)
- **Topology:** 四角形ポリゴン推奨だが、最終的に三角形化されても破綻しない流れで作る。

### 2. Materials & Textures (質感)

- **Draw Call削減 (Basic Rule):** 基本は1マテリアル推奨だが、色変えが必要な場合は **「最大2つ」** まで許容する (Plan B: The Split)。
  1. `Main_Body`: 色を変える部分 (Base Color: White)。
  2. `Details`: 色を変えない部分 (黒鍵、ラベル、金属など)。
- **Resolution:** テクスチャは **1024x1024 (1K)** を標準とする。
  - 重要なディテールがある場合のみ2K可。4Kは使用禁止。
- **Format:** `ORM Map` を使用したPBRワークフロー。
  - R: **O**cclusion (影の焼き込み)
  - G: **R**oughness (ザラつき)
  - B: **M**etalness (金属度)
  - アルファチャンネル: 必要ならOpacityに使用。

### 3. Coordinate System (座標系)

- **Pivot Point:** モデルの **底面中心** (X=0, Y=0, Z=0) に原点を合わせる。
  - これがズレていると、回転させた時に変な回り方をする。
- **Scale:** 実寸 (メートル単位) で作成し、Scale (1,1,1) を適用(Apply)済みであること。
- **Orientation:**
  - **Y-Up:** BlenderはZ-Upだが、glTFエクスポート時に `Y-Up` に変換される設定を確認する。
  - **Front:** `-Z` 方向（Blenderのデフォルト正面）を向かせる。

---

## Naming Convention (命名規則)

コードと連携するため、以下の命名規則を守ってください。

1. **File Name:** `PascalCase.glb` (例: `RetroRadio.glb`, `CoffeeCan.glb`)
2. **Object Name:** Rootのオブジェクト名は分かりやすく (例: `Radio_Mesh`)。
3. **Custom Properties (重要):**
    - Blenderの `Object Properties > Custom Properties` に以下のメタデータを入力しておくと、`ManualLoader` が自動的に読み取ります（任意）。
    - `name`: (String) アイテム名
    - `quote`: (String) キャプション

---

## Export Settings (出力設定)

Web3D用に最適化された `.glb` 設定です。

- **Format:** glTF Binary (.glb)
- **Include:** Selected Objects のみ（余計なカメラやライトを含めない）
- **Transform:** +Y Up
- **Mesh:**
  - Apply Modifiers: ON
  - UVs: ON
  - Normals: ON
  - Tangents: ON (Normal Map使う場合)
- **Compression:**
  - **Draco:** ON (必須)
  - Compression Level: 6 (標準) 〜 10 (最大)

---

## Execution Steps

1. `Docs/Ark_Cargo.md` から1つアイテムを選ぶ（最初は `Radio` 推奨）。
2. この仕様書に従ってBlenderで制作する。
3. `public/models/` に `.glb` をエクスポートする。
4. `src/lib/store.ts` と `ManualLoader.tsx` (または `Scanner`) を更新し、表示を確認する。
