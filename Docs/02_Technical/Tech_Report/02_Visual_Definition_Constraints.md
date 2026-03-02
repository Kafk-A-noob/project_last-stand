# Technical Report: Web3D Visual Constraints & Definition Guide

**Target Audience:** General Consultant Gemini (Blender/Modeling Advisor)
**Context:** Project Last-Stand (Next.js + React Three Fiber + Mobile Support)
**Date:** 2026-02-05

## 1. 概要 (Overview)

本プロジェクトは **「モバイルブラウザでも動作するWeb3Dポートフォリオ」** を目指しています。
一般的なPC向けリアルタイム3Dコンテンツアセットとは異なり、厳しいパフォーマンス制約と描画エンジンの特性（WebGL/Three.js）を考慮したモデリングが必要です。

### Cargo List (Defined Assets) 26'02-05時点

| ID         | Item Name                                 | Status  |
| :--------- | :---------------------------------------- | :------ |
| **ID-001** | Radio (ラジオ)                            | Waiting |
| **ID-002** | Keyboard (キーボード)                     | Waiting |
| **ID-003** | Morning Coffee (缶コーヒー)               | Waiting |
| **ID-004** | Closet Acoustic Guitar (押し入れのアコギ) | Waiting |
| **ID-005** | Favorite Mug (お気に入りのマグカップ)     | Waiting |
| **ID-006** | Camera (カメラ)                           | Waiting |
| **ID-007** | Game Boy (ゲームボーイ)                   | Waiting |
| **ID-008** | Lantern (ランタン)                        | Waiting |
| **ID-009** | Family Photo (家族やペットの写真)         | Waiting |

## 2. 共通仕様と重要な制約 (Common Specs & Critical Constraints)

### Common Modeling Specifications

すべてのアセットは以下の基準で作成される必要があります。

- **File Format:** `.glb` (glTF Binary)
- **Scale:** 1.0 = 1 Meter (Real-world scale)
- **Polycount:**
  - **Hero Asset (Main):** **Max 20,000 tris** (推奨: 15,000程度)
  - **Environment (Sub):** **Max 5,000 tris**
  - リアルタイム3Dコンテンツ環境と異なり、一度に1体しか表示しないため、表現力を優先して高めに設定します。
- **Texture Size:** **Max 1024x1024** (推奨: 512px)
- **Maps:** BaseColor, Metallic, Roughness, Normal, Emissive
- **Shading:** Smooth Shading (Auto Smooth)
- **Pivot:** 接地面 (底面) の中心 (0,0,0)
- **Compression:** Draco Compression (Export時に必須)

### WebGL Critical Constraints

#### Transparency / Alpha (透明・半透明)

WebGL (Three.js) は「半透明オブジェクトの前後関係（描画順）」の計算が苦手です。

- **問題:** ガラスの向こう側の物体が消えたり、前後が入れ替わって見えたりするアーティファクトが発生しやすい。
- **対策:**
  - 極力 **「不透明 (Opaque)」** でデザインする。
  - ガラス表現が必要な場合、`Transmission` シェーダーは重いため避け、**「黒に近い不透明な光沢面」** で代用する。
  - 網目やフェンスは、半透明ではなく「Alpha Cutoff (Opaque扱い)」を使用する。

#### Emission & Bloom (発光)

BlenderのEevee/Cyclesと異なり、Web上では標準でブルーム（光の溢れ出し）は描画されません。

- **問題:** `Emission` カラーを設定しても、ただ「その色が明るい」だけで、光っているようには見えない。
- **対策:**
  - **Post-Processing (Bloom) は最終手段:** モバイル負荷が高いため、基本的にはOFFを想定する。
  - **Fake Glow:** 光源の周りに「半透明のボワッとした板ポリ」を置く、あるいはテクスチャ自体に光の表現を描き込む（Baking）。

#### Detail & Thin Objects (細部の表現)

- **Thin Objects:** ギターの弦や植物の葉は、メッシュで作らず「板ポリ + アルファ抜き」で表現する方が、遠景でのジャギ（Aliasing）を防げる。

## 3. アイテム別実装ガイド (Item Specifics)

### [ID-003] 缶コーヒー (Morning Coffee)

- **液体部分:** 透明な液体を作らず、**「不透明な黒い液体面」** のメッシュで蓋をする。
- **缶の蓋:** アルミの質感（Metallic: 1.0, Roughness: 0.2）で表現し、飲み口の穴はモデリングする。

### [ID-006] カメラ (Camera)

- **レンズ:** 内部構造を作ってガラスで覆うのはNG（重い＆描画バグの元）。
- **Alternative:** **「真っ黒な光沢のある半球」** をレンズとして配置し、周囲の環境マップを反射させることでレンズっぽく見せる。

### [ID-007] ゲームボーイ (Game Boy)

- **画面:** 液晶のドット感はモデリングせず、**「Emissiveテクスチャ」** を貼る。
- **光:** 画面全体を弱く発光させ、暗所での視認性を確保する。

### [ID-008] ランタン (Lantern)

- **ガラス:** もし中を見せたいなら、ガラス部分は「削除」し、フレームだけにするのが最も軽量で安全。
- **炎:** Blenderのパーティクルやボリュームはエクスポートできない。**「炎の絵を描いた板ポリ（ビルボード）」** を十字に配置し、Emissionを設定する。

## 4. Blender Export Settings (Reminder)

- **Format:** `.glb`
- **Compression:** Draco (実装側でデコーダー準備済み)
- **Custom Properties:** `Include Custom Properties` をONにすること（メタデータ連携のため）。
