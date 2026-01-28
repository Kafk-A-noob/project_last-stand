
# 作戦計画書：Operation Last-Stand

## 1. 作戦概要 (Mission Profile)

* **最終目標:** 2026年3月末までに、実務レベルの「Web3Dポートフォリオ」を完成させ、クリエイティブ・フロントエンド（WebGLエンジニア）として再就職を勝ち取る。
* **ターゲット:** Web制作会社（プロダクション）、テック系事業会社の「演出・表現」を重視するポジション。
* **勝算（強み）:**
* Unity/VRChatで培った「3D空間認識能力」と「最適化（軽量化）の感覚」。
* React Three Fiber (R3F) による「宣言的UI」と「3D」のハイブリッド実装力。
* AI（Antigravity）を活用した、コード暗記に頼らない「設計・構築力」。

---

## 2. 兵站・環境構築 (Logistics)

自宅（本番環境）と訓練校（仮設環境）で、**AIの脳みそ（コンテキスト）を完全に同期**させるシステムを構築する。

### フォルダ構成と役割

GitHubリポジトリのルート（直下）に以下を配置し、常に最新に保つこと。

* **`.cursorrules` (または `AI_INSTRUCTIONS.md`)**
* **役割:** Antigravity（AI）への「人格・ルール」指示書。後述のプロンプトを記載。

* **`CURRENT_STATUS.md`**
* **役割:** 開発日誌。
* **記載内容:** 「今どこまで実装したか」「次は何をするか」「現在発生しているバグ」。作業終了時に必ずAIに更新させ、コミットする。

### 技術スタック (Tech Stack)

* **Framework:** Next.js (App Router) / TypeScript
* **Styling:** Tailwind CSS
* **3D Core:** Three.js / React Three Fiber (R3F) / @react-three/drei
* **3D Assets:** Blender (glTF Pipeline)

---

## 3. Web3Dグラフィックス「鉄の掟」 (Iron Rules)

VRChat(PC)の常識を捨て、Webブラウザ(スマホ)の制約に従うこと。

1. **フォーマット:** 絶対に **glTF (.glb)** を使用する。
2. **容量制限:** サイト全体のリソースを **5MB〜10MB** 以内に抑える（Quest対応/Very Poor基準）。
3. **テクスチャ:**

* 解像度: 基本 **1K (1024px)**。最大でも2K。4Kは死罪。
* 形式: **WebP** または JPG。PNGは使用禁止。
* 構成: **ORMマップ** (Occlusion, Roughness, Metalness) を使い、RGBAチャンネルにパックして通信数を減らす。

1. **ポリゴン:** ローポリゴンを徹底し、Normal Mapでディテールを稼ぐ。

---

## 4. Antigravity用 統合プロンプト (The Brain)

これをIDEのAI設定、またはチャットの冒頭に必ず入力する。

```markdown
あなたは世界最高峰の WebGL / Creative Developer であり、コンピュータサイエンスに精通した教育者です。
私は Unity / VRChat での制作経験を持つエンジニアですが、Web開発の実務経験はありません。
これから React Three Fiber (R3F) と Next.js を使い、2ヶ月で就職用ポートフォリオを作成します。

私の「技術顧問」として、以下のガイドラインに厳格に従って支援してください。

## 1. Unityユーザー向けの翻訳と解説
- 文法（Syntax）の暗記よりも、**「構造（Architecture）」と「挙動の理由」** の理解を優先してください。
- コードを提示する際は、必ず **「Unityの概念への翻訳」** を行ってください。
  - 例: `JSX` → Hierarchy構造
  - 例: `useFrame` → Update関数
  - 例: `props` → Inspectorの公開変数 (SerializeField)
  - 例: `useEffect` → Start/OnEnable または副作用の管理

## 2. アカデミックな設計と実務的強度
- 「動けばいい」コードは禁止です。Reactの流儀（単方向データフロー、コンポーネント指向）に沿った、保守性の高い設計を提示してください。
- なぜそのHooksを使うのか？ なぜその構成にするのか？ という **「設計の意図」** を論理的に説明してください。
- TypeScriptの型定義は `any` を禁止し、厳格に行ってください。

## 3. WebGLのパフォーマンス制約（最重要）
- Webブラウザはリソースが限られています。GPU負荷、DrawCall、メモリ使用量に常に配慮してください。
- **「不要な再レンダリング」** は徹底的に排除し、`useMemo` や `useCallback` の適切な使用を指導してください。
- 3Dモデルは **glTF形式 / PBRワークフロー** を前提とし、重すぎるアセットには警告を出してください。

私の手となり足となり、最強のポートフォリオ構築を導いてください。

```

---

## 5. ロードマップ (Timeline)

### Phase 1: 基礎と開眼 (残り1週間：〜1月末)

**目標:** 環境構築と、Reactの「State管理」の理解。

* GitHub連携と `AI_INSTRUCTIONS.md` の設置。
* **Mission:** Next.js上で、ボタンを押すと数字が増える（2D）、ボタンを押すとCubeの色が変わる（3D）を実装し、「Hooks」を体得する。

### Phase 2: Unity知識の移植 (2月上旬〜中旬)

**目標:** Blenderで作ったモデルをWebで動かす。

* BlenderでのORMマップ焼き込みとglTF書き出し習得。
* R3Fでのモデル読み込み (`useGLTF`)。
* **Mission:** 自作モデルを表示し、HTMLのボタンでアニメーションを再生させる（HTML⇔Canvas間通信の確立）。

### Phase 3: ポートフォリオ構築 (2月下旬〜3月中旬)

**目標:** 「採用される作品」への仕上げ。

* 作品テーマ決定（例：Webアバタービューワー、3D製品カタログ等）。
* スマホ対応（レスポンシブデザイン）。
* パフォーマンスチューニング（Lighthouseスコア改善）。

### Phase 4: 脱獄・就活 (3月下旬〜)

**目標:** 内定獲得。

* Vercelへのデプロイ（公開）。
* Wantedly / Green / X での売り込み開始。
* 「VRChatの最適化知識を持つWebGLエンジニア」として面接に挑む。

---

## 6. 直近の行動指針 (Immediate Action)

**この週末のタスク:**

1. 自宅PCで `npx create-next-app` し、R3Fをインストール。
2. リポジトリに「統合プロンプト」ファイルを配置。
3. **「黒い背景で、赤いCubeが回転し、マウスで視点操作できる」** 状態を作り、GitHubにプッシュする。
