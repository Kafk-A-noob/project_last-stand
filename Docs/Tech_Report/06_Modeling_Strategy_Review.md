# Tech Report: Modeling Strategy & Visual Polish Review

**Date:** 2026-02-14
**Target:** ID-001 Radio & Future Assets
**Context:** "Digital Laboratory" Portfolio (Next.js + R3F + Mobile First)

## 1. 質感の最適解 (Material Strategy)

### PBR vs Baked: 「ハイブリッド」が正解

完全なPBR（リアルタイム計算）はモバイルで重く、完全なベイク（書き割り）は質感が死にます。
特に「黒背景のSF UI」においては、**光の反射（リフレクション）だけを計算させ、陰影（AO）は焼き込む** のが最も見栄えが良いです。

- **推奨設定:**
  - **Environment Map (IBL):** 必須。`.hdr` ではなく、軽量な `.exr` または `Environment` コンポーネントのプリセット (`city` や `studio`) を使用し、強度は控えめに (`intensity={0.5}`)。
    - これがないと金属部分が「ただの黒い塊」に見えます。
  - **Material:** `MeshStandardMaterial` (基本)。
    - `MeshPhysicalMaterial` (ガラス/Transmission) は **Hero Assetの「レンズ」や「カバー」の1パーツ限定** ならOK。多用は厳禁（描画負荷が数倍になる）。
    - 透過 (`transparent`) は描画順バグの温床なので、可能なら「ディザリング (`alphaTest`)」か「加算合成 (`blending={THREE.AdditiveBlending}`)」で逃げる。

### サイバーパンク感を出すコツ

- **Emissive (自発光):**
  - マテリアルの `emissive` カラーだけでなく、**`emissiveIntensity` を `2.0` 以上** に設定すると、Bloomがなくても「光っている感」が出ます（トーンマップによる）。

## 2. モデリングの技術的評価ポイント (Modeling Priorities)

エンジニアとして「おっ、分かってるな」と思わせるポイントは **「シルエット」と「トポロジー」** です。

1. **ベベル (Bevel) = 必須:**
    - 現実世界に「完全に鋭利な90度の角」は存在しません。全ての角にベベルを入れることで、スペキュラ（ハイライト）が乗り、リアリティが段違いになります。
    - **優先順位:** 一番外側のシルエット > 操作パネルの境界 > ネジ穴。
2. **デカール (Decal):**
    - テクスチャに書き込むより、**「浮かせた板ポリ (Floating Geometry)」** や `@react-three/drei` の `Decal` コンポーネントを使う方が高解像度を維持できます。
    - ただし、今回はドローコール削減のため **「テクスチャへの書き込み」** を推奨します（モバイル優先）。
3. **内側の作り込み:**
    - 「分解インタラクション」を見据えるなら、外殻の内側（裏面）もモデリングしておく必要があります。Solidify（厚み付け）モディファイアを適用し、内側にもマテリアルを割り当てておくこと。

## 3. ポートフォリオとしてのポストプロセス (Post-Processing)

**結論:** **「Bloom (発光)」は入れるべき。それ以外は不要。**

「Digital Laboratory」というテーマにおいて、光の表現は生命線です。R3Fの `@react-three/postprocessing` は非常に優秀で、設定さえ詰めればモバイルでも動きます。

- **Bloom:**
  - `luminanceThreshold={1}` (1.0以上の明るさだけ光らせる)
  - `mipmapBlur` (パフォーマンスが良いぼかし手法)
  - これだけで、Emissiveを設定したパーツがボワッと光り、クオリティが爆上がりします。
- **Chromatic Aberration (色収差):**
  - 画面全体にかけると「安っぽい」「酔う」原因になります。
  - **「UI操作時やロード完了時の一瞬だけ」** かける演出として使うのがプロの技です。常時ONは非推奨。

## 4. 拡張性とコンポーネント設計 (Extensibility)

### 分解 (Exploded View) への備え

現在の `gltfjsx` は、Blenderのオブジェクト階層をそのままReactコンポーネント化します。

- **Blender側での準備:**
  - 「分解したいパーツ」ごとにオブジェクトを分けておくこと（結合しない）。
  - 原点 (Origin) を「そのパーツの回転中心」に合わせておくこと。
  - 命名規則: `Radio_Body`, `Radio_Knob_Volume`, `Radio_Antenna` など、コード側でフィルタリングしやすい名前をつける。

- **R3F側での実装:**
  - 生成された `.tsx` 内で、各 `mesh` に `onClick` イベントを仕込むことができます。
  - `useSpring` (react-spring) 等を使えば、クリックした瞬間に `position` を移動させる（分解する）アニメーションも容易です。

---

## Technical Summary (推奨構成)

| 項目 | 推奨設定 | 理由 |
| :--- | :--- | :--- |
| **Material** | `MeshStandardMaterial` + ORM Map | 軽量かつ表現力十分。 |
| **Geometry** | ベベル必須, 内部構造あり | ハイライトの品質向上と分解ギミック対応。 |
| **PostProcess** | Bloom (Selective) | SF感の演出に不可欠。負荷は設定次第。 |
| **Interaction** | オブジェクト分割維持 | R3F側での個別アニメーション制御のため。 |

**Next Action:** ID-001 Radio は、この方針に従い **「ベベル強め」「発光パーツあり」「パーツ分割維持」** でモデリングを進めてください。
