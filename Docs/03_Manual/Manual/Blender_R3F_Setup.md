# Blender to R3F Export Guide

Unityの「FBX Export -> Unity Import」に相当する、Web開発における標準パイプライン「**glTF Pipeline**」の手順書です。

## 1. 基礎概念 (The Theory)

### Unity vs Web (R3F)

| 項目 | Unity (リアルタイム3Dコンテンツ) | Web (R3F / Three.js) |
| :--- | :--- | :--- |
| **標準フォーマット** | .fbx | **.glb** (glTF Binary) |
| **座標系** | 左手系 (Y-Up) | **右手系 (Y-Up)** ※自動変換されるが注意 |
| **Shader** | Standard / LilToon | **MeshStandardMaterial** (PBR) |
| **単位** | 1 Unit = 1 Meter | **1 Unit = 1 Meter** (同じ) |

### 重要: .glb とは？

「3DモデルのJPEG」と呼ばれる、**Web転送用に最適化された**フォーマットです。
テクスチャ、マテリアル、メッシュデータが1つのファイルにバイナリとして梱包されています。

---

## 2. Blender 設定 (Pre-Flight Check)

### A. スケールの適用 (Apply Scale)

Unity同様、スケールが `(1, 1, 1)` になっていないと、Web上で物理挙動やライティングが壊れます。

1. オブジェクトを選択
2. `Ctrl + A` -> **Scale** を選択

### B. 原点の設定 (Origin Point)

Web配置時の基準点になります。

1. 展示台などの床置きオブジェクト -> **底面の中央**を原点にする `(0, 0, 0)`。
2. 空中に浮くもの -> 重心など。

### C. マテリアル設定 (Material Setup)

R3Fの `MeshStandardMaterial` に自動変換されるための設定です。

1. Shader Editorを開く。
2. **Principled BSDF** (プリンシプルBSDF) を使用する。
    * **Base Color:** 色またはテクスチャ
    * **Metallic:** 0.0 (非金属) ~ 1.0 (金属)
    * **Roughness:** 0.0 (ツルツル) ~ 1.0 (ザラザラ)
3. **注意:** リアルタイム3Dコンテンツ用のカスタムシェーダー (LilToon等) は**Webでは動きません**。必ずPrincipled BSDFにベイクするか、単純なパラメータに置き換えてください。

---

## 3. エクスポート設定 (Export Settings)

**File -> Export -> glTF 2.0 (.glb/.gltf)**

ウィンドウ右側の設定項目を確認してください：

### [Include] (重要)

* [x] **Limit to Selected Objects:** チェック推奨（シーン内のゴミを出力しないため）

### [Transform]

* [x] **+Y Up:** チェック（デフォルト）

### [Geometry]

* [x] **Apply Modifiers:** チェック（Mirrorモディファイア等を適用して確定させる）

* [ ] **UVs, Normals, Vertex Colors:** 通常はON（デフォルト）

### [Animation]

* [ ] アニメーションがない場合は **OFF** にする（ファイルサイズ削減）

---

## 4. プロジェクトへの配置

エクスポートした `.glb` ファイルは、Next.jsの `public` フォルダ内に配置します。

`D:\KafkA\Documents\project_last-stand\public\models\stage.glb`

配置後、コード (`useGLTF`) からパス指定で読み込むことができます。
