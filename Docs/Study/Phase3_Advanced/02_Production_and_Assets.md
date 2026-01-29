# Phase 3 Advanced: Production & Assets Master Guide

**テーマ:** "From Prototype to Product"

このドキュメントは、Phase 3.4.5 〜 Phase 3.5 で実施した「製品化プロセス」と「アセット制作理論」の統合解説です。
個人開発のプロトタイプを、いかにして「人に見せられる製品」に仕上げるか、その理論と実践をまとめました。

---

## Chapter 1: 製品化硬化処理 (Production Hardening)
>
> Source: `Phase3.4.5_Production_Hardening.md`

### 1.1 Metadata & SEO (名刺代わりの情報)

「検索に引っかかる」だけがSEOではありません。「リンクを貼った時に怪しくないか」が重要です。
Next.js (App Router) では `layout.tsx` の `metadata` オブジェクトで管理します。
特に **OGP (Open Graph Protocol)** は、DiscordやTwitterでの見栄え（サムネイル、タイトル）を決定する重要な「顔」です。

### 1.2 Git LFS vs Local Strategy

3Dモデル（バイナリ）はGitの天敵です。コミットするたびにリポジトリが肥大化します。
今回はGitHub Free枠の制限を考慮し、**「巨大ファイル (.glb) は .gitignore し、ローカル(Google Drive等)で管理する」** という戦略を採用しました。
これにより、リポジトリを軽量に保ちつつ、アセットの紛失を防ぎます。

### 1.3 Error Boundary (命綱)

WebGLは繊細です。GPUドライバの相性やメモリ不足で容易にクラッシュします。
`react-error-boundary` を導入し、3D部分 (`<Scene>`) をラップすることで、**「3Dが死んでもサイト自体（ヘッダーやフッター）は生き残る」** 状態を作ります。
「白い画面 (White Screen of Death)」はユーザーに最大の不安を与えます。必ずFallback UIを用意しましょう。

---

## Chapter 2: データ構造の哲学 (Data Architecture)
>
> Source: `Phase3.5_00_Data_Architecture.md`

### 2.1 文脈を持たせる (`ArchiveItem`)

初期の `ModelData` 型は `vertices` などの技術スペックのみを持っていました。
しかし、ポートフォリオの目的は「技術自慢」ではなく「想いの伝達」です。

- **Narrative:** `quote` (キャプション), `description` (背景ストーリー)
- **Credit:** `contributor` (提供者)

これらをデータ構造の根幹 (`src/lib/store.ts`) に組み込むことで、システム全体が「スペック表」から「アーカイブ」へと進化しました。

### 2.2 TypeScript Type Guard

Three.jsの `traverse` 関数は汎用的な `Object3D` を返しますが、`geometry` プロパティを持つのは `Mesh` だけです。
`any` で逃げずに `if ((obj as Mesh).isMesh)` と型ガード（キャスト）を行うことで、堅牢なコードベースを維持します。

---

## Chapter 3: Web3Dアセット理論 (Web3D Asset Theory)
>
> Source: `Phase3.5_01_Web3D_Asset_Theory.md`

### 3.1 Why Low Poly? (Target: 3k-5k tris)

スマホのGPU性能はPCの1/10以下、メモリもカツカツです。
「1画面10万ポリゴン」が限界ライン。1つのアイテムに数万を使う贅沢は許されません。

### 3.2 Why One Material? (Draw Calls)

マテリアル数 = 描画命令(Draw Call)の回数です。
これが多すぎると、GPUより先にCPUが「命令出し」でオーバーヒートします。
テクスチャアトラス（複数画像の結合）を用いて、**1モデル1マテリアル** に統合するのがWeb3Dの鉄則です。

### 3.3 Why ORM Map?

PBRに必要な3つの画像 (Occlusion, Roughness, Metalness) を、1枚の画像のRGBチャンネルにそれぞれパッキングします。

- R: Occlusion
- G: Roughness
- B: Metalness
これにより、通信リクエスト数とメモリ使用量を1/3に削減します。

### 3.4 Why Draco?

Googleが開発したメッシュ圧縮技術。ファイルサイズを劇的に（1/10程度に）減らせます。
デコードのCPU負荷という代償はありますが、モバイル回線でのダウンロード時間短縮の恩恵の方が遥かに大きいです。
