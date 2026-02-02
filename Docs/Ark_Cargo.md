# The Digital Ark - Artifacts Manifest

## Blender作業用: データ実装スペック

コード側 (ManualLoader.tsx) は、GLBファイルに以下のデータが含まれていることを前提に動く。

1. マテリアル命名規則 (Material Naming)
ルール: マテリアル名は必ず Main_Body で始めること。
 OK: Main_Body, Main_Body_Radio, Main_Body.001
 NG: Radio_Mat, Material.001
理由: プログラムが「色を変えるべき主パーツ」を識別するために使用している。
2. カスタムプロパティ (Custom Properties)
場所: エクスポートするオブジェクト（またはScene）の Custom Properties パネル。
必須キー (Type: String):
name: モデル名 (例: "Retro Radio")
quote: キャッチコピー (例: "Music for the void.")
description: 詳細説明
contributor: 作者名 (例: "User Name")
Export設定: glTFエクスポート時、「Include > Custom Properties」 にチェックを入れるのを忘れないこと。

GLBを public/models/ に放り込むだけで、サイト上に認識・表示される

## テンプレート (コピー用)

### [ID-00X] アイテム名

- **ステータス:** `未着手` / `モデリング中` / `GLB変換済` / `実装完了`
- **提供者 (Contributor):** [名前/匿名]
- **ソース:** [Twitter/LINE/Discord/etc]

#### Data (Web表示用)

- **Item Name:** [表示するアイテム名]
- **Quote (キャプション):** [「想い」や「理由」の文章]
- **Description:** [補足説明 (Tooltip等用)]

#### Visual Definition (Blender設定)

- **外見の特徴:** [新品/使い込み/汚れ/色など]
- **マテリアル戦略:**
  - [ ] **Color Changeable:** [色変えするパーツ名] (Base: White / Roughness: 0.x)
  - [ ] **Static:** [固定パーツ名] (Texture / Black / Metal etc.)
- **資料/参考:** [画像URLやファイル名]

#### Implementation (実装チェック)

- [ ] Blender: モデリング & マテリアル割当
- [ ] Export: Draco圧縮確認 (glTF Viewer)
- [ ] Code: `store.ts` へのデータ追加
- [ ] Check: 画面表示 & エラーなし確認

---

## 積荷リスト

---

### [ID-001] ラジオ

- **ステータス:** `未着手`
- **提供者:** Nana

#### Data

- **Item Name:** Radio (ラジオ)
- **Quote:** 最期まで日常らしい時間を感じたいから。
- **Description:** いつもの時間、いつものチャンネル。

#### Visual Definition

- **外見の特徴:** ありきたりなラジオ
- **マテリアル戦略:**
  - [ ] **Body:** プラスチック？グレーがいいかも

#### Implementation

- [ ] Blender: モデリング
- [ ] Export: Draco圧縮
- [ ] Code: データ追加
- [ ] Check: 表示確認

---

### [ID-002] ピアノ(キーボード)

- **ステータス:** `未着手`
- **提供者:** Yuduki

#### Data

- **Item Name:** Keyboard (キーボード)
- **Quote:** "人間たちに音楽があったことを、知ってもらえるから。"
- **Description:** "私にとって唯一の、絶対に裏切らない友人として。そして、いつかこれを拾うかもしれない人類ではない誰かが、音を楽しんでくれることを願って。"

#### Visual Definition

- **外見の特徴:** キーボード
- **マテリアル戦略:**
  - [ ] **Body:** 黒か艶のあるマホガニー

#### Implementation

- [ ] Blender: モデリング
- [ ] Export: Draco圧縮
- [ ] Code: データ追加
- [ ] Check: 表示確認

---

### [ID-003] 缶コーヒー

- **ステータス:** `未着手`
- **提供者:** [Anonymous(Tanza)]

#### Data

- **Item Name:** Morning Coffee (缶コーヒー)
- **Quote:** "一日の始まりの一杯"
- **Description:** 毎朝飲んでいたショート缶。

#### Visual Definition

- **外見の特徴:** 飲み口の周りが少しリアルな質感。
- **マテリアル戦略:**
  - [ ] **Label:** テクスチャ貼り付け (Roughness: 0.5)
  - [ ] **Lid/Bottom:** Aluminum (Metallic: 1.0 / Roughness: 0.2)

#### Implementation

- [ ] Blender: モデリング
- [ ] Export: Draco圧縮
- [ ] Code: データ追加
- [ ] Check: 表示確認

---

### [ID-004] アコースティックギター

- **ステータス:** `未着手`
- **提供者:** AYA

#### Data

- **Item Name:** Closet Acoustic Guitar (押し入れのアコギ)
- **Quote:** "外に出せなかった憧れを、こんな時ぐらいは出してもいいんじゃないでしょうか"
- **Description:** ずっと弾けずにしまってあったギター。

#### Visual Definition

- **外見の特徴:** ホコリを被っているが、磨けば光る。弦が古びている。
- **マテリアル戦略:**
  - [ ] **Body:** 木目 (Roughness: 0.4 - 少し曇らせる)
  - [ ] **Strings:** Metal (Metallic: 1.0)

#### Implementation

- [ ] Blender: モデリング
- [ ] Export: Draco圧縮
- [ ] Code: データ追加
- [ ] Check: 表示確認

---

### [ID-005] お気に入りのマグカップ

- **ステータス:** `未着手`
- **提供者 (Contributor):** [Chika/Anonymous]

#### Data (Web表示用)

- **Item Name:** Favorite Mug (お気に入りのマグカップ)
- **Quote (キャプション):** [世界が終わっても喉は乾くし腹は減るから]
- **Description:** [最後の一杯]

#### Visual Definition (Blender設定)

- **外見の特徴:** [新品/使い込み/汚れ/色など]
- **マテリアル戦略:**
  - [ ] **Color Changeable:** [色変えするパーツ名] (Base: White / Roughness: 0.x)
  - [ ] **Static:** [固定パーツ名] (Texture / Black / Metal etc.)
- **資料/参考:** [画像URLやファイル名]

#### Implementation

- [ ] Blender: モデリング
- [ ] Export: Draco圧縮
- [ ] Code: データ追加
- [ ] Check: 表示確認

---
