# Project Last-Stand: Operation Roadmap & System Health Report

**Date:** 2026-02-06
**Version:** 1.2 (Preventive Update)

## 1. 完了済みのマイルストーン (Achievements)

### Phase 1: Foundation (基礎・開眼)

- [x] **Environment:** Next.js (App Router), R3F, TypeScript環境の構築完了。
- [x] **Concept:** 「UnityエンジニアのためのWeb3D」というメンタルモデルの確立。
- [x] **State Management:** Zustandの導入 (`store.ts`) とUI連携の確立。

### Phase 2: Pipeline (パイプライン)

- [x] **Blender to Web:** Draco圧縮を含む最適なエクスポートフローの確立。
- [x] **Loader:** `useLoader` / `useGLTF` を用いた動的読み込みの実装。

### Phase 4: Architecture (データ駆動設計)

- [x] **Manifest System:** `asset-manifest.ts` によるアセット情報の台帳化。
- [x] **Hybrid Metadata:** 静的データ(Manifest)と動的データ(GLB)の二段構え構成の準備。
- [x] **Safety UI:** `active` フラグによる未実装機能の安全なロック (Coming Soon)。

---

## 2. 現在地と直近のタスク (Current Position)

現在、**「システム（器）」は完成し、「コンテンツ（中身）」を待っている状態** です。

### Phase 3.5: Modeling Party (現在進行中)

- **場所:** 自宅PC (Blender必須)
- **目的:** 登録されたアセットリスト (`Ark_Cargo.md`) の実体化。
- **Action:**
  - `ID-001 Radio` の作成とエクスポート。
  - `ID-002` 以降の順次作成。

---

## 3. 今後のロードマップ (Future Roadmap)

### Phase 5: Polish & Optimization (仕上げ)

- [ ] **Smart Loading:** GLBファイルのメタデータ(`extras`)を読み込み、Manifest情報を上書きするロジックの実装。
- [ ] **Performance:** Lighthouseスコア計測と、テクスチャサイズ/解剖の最適化。
- [ ] **Mobile Touch:** スマホでの操作感（タッチスワイプ等）の調整。

### Phase 6: Deployment (出撃)

- [ ] **Vercel Deploy:** 本番環境へのデプロイ。
- [ ] **SEO/OGP:** シェアされた際のカード画像設定など。

---

## 4. 症例報告・リスク分析 (Symptomatic Report)

現段階で見えている「技術的な懸念点」と「将来発症しうる症状」を列挙します。

### 症例 A: "The Heavy Load" (初期ロード肥大化)

- **症状:** アセットが増えるにつれ、初回ロード時間が長くなる。
- **処方箋:**
  - 現状は「オンデマンド読み込み」のため初期ロードは軽いが、切り替え時にラグが発生する。
  - 将来的に `preload` を使うか、ロード中に「気の利いた演出」を入れる必要がある。

### 症例 B: "Shader Complexity" (スマホの発熱)

- **症状:** `Transmission` (ガラス) や `Bloom` を使いすぎると、スマホでフレームレートが落ち、発熱する。
- **処方箋:**
  - `02_Visual_Definition_Constraints.md` で定めた通り、**「Fake（擬似表現）」** を徹底する。
  - シェーダーは標準の `MeshStandardMaterial` を基本とし、カスタムシェーダーは必要最小限に抑える。

### 症例 C: "Manifest Drift" (データ不整合)

- **症状:** コード上の `asset-manifest.ts` と、実際の `public/models/` 内のファイル名がズレて 404 エラーになる。
- **処方箋:**
  - 人力管理の限界。将来的には、`public/models/` を走査してマニフェストを自動生成するスクリプト (`scripts/gen-manifest.js`) を導入するのも手。

### 症例 D: "Ghost Touch" (操作競合)

- **症状:** スマホでモデルを回転させようとスワイプすると、ブラウザの「戻る」や「リロード」が暴発する。
- **処方箋:**
  - CSSで `touch-action: none` をCanvasに適用する。
  - R3Fの `OrbitControls` 設定で `enableZoom={false}` (あるいは2本指制限) にするなどのチューニングが必要。

### 症例 E: "Zombie Assets" (キャッシュ汚染)

- **症状:** モデルを更新してアップロードしたのに、ユーザー側で古いモデルが表示され続ける（ブラウザの強力なキャッシュ）。
- **処方箋:**
  - ファイル名にバージョンハッシュを付ける (`radio.v1.glb`) か、Vercel等のCDN設定で `Cache-Control` ヘッダーを適切に管理する。

### 症例 F: "The Invisible Link" (OGP未設定)

- **症状:** ポートフォリオ完成後、X(Twitter)やDiscordにURLを貼っても、ただの青い文字リンクしか表示されず、誰もクリックしてくれない。
- **処方箋:**
  - Next.jsの `metadata` API を使い、`openGraph` (OGP) 画像を設定する。
  - **「3Dなんだから、最高のスクショを撮って看板にする」** のが礼儀。

### 症例 G: "The Fat Bundle" (バンドル肥大化)

- **症状:** 開発中は気にならないが、本番ビルド(`npm run build`)するとJSファイルのサイズが巨大で、警告が出る。
- **処方箋:**
  - `@next/bundle-analyzer` を導入して内訳を可視化する。
  - `Three.js` 全体をimportせず、必要なモジュールだけをimportする書き方になっているか確認する（Tree Shaking）。

---

## 5. 結論 (Conclusion)

コードベースは **"Production Ready"** (実戦投入可能) な状態です。
あとはひたすら「モデリング」という物理作業を行い、器に魂を込めていくフェーズです。
焦らず、Phase 3.5 を遂行してください。
