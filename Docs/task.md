# 作戦計画: Operation Last-Stand (Web3Dポートフォリオ構築)

## Phase 1: 基礎と開眼 (Basic Training & Awakening) [2026年1月末まで]

- [x] 実行計画に対するユーザーの承認を得る
- [x] **環境構築 (Environment Setup)** <!-- id: 0 -->
  - [x] `npx create-next-app` (TypeScript, Tailwind, App Router) <!-- id: 1 -->
  - [x] 依存関係のインストール (`three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`) <!-- id: 2 -->
  - [x] 初期ボイラープレートの削除とクリーンアップ <!-- id: 3 -->
- [x] **Mission: 最初のキューブ (The First Cube)** <!-- id: 4 -->
  - [x] 3D Canvasコンポーネントの作成 (Scene) <!-- id: 5 -->
  - [x] 赤いCubeメッシュの実装 <!-- id: 6 -->
  - [x] 回転アニメーションの追加 (`useFrame`) <!-- id: 7 -->
  - [x] `OrbitControls` による視点操作の実装 <!-- id: 8 -->
  - [x] 背景色の設定 (黒) <!-- id: 9 -->
- [x] **React Hooks 訓練 (Unity概念翻訳)** <!-- id: 10 -->
  - [x] 2Dカウンターの実装 (State管理の理解) <!-- id: 11 -->
  - [x] 2D UIボタンによる3Dオブジェクトの色変更連携 (Props/イベントハンドリング) <!-- id: 12 -->

## Phase 1.5: VCS連携 (GitHub Setup)

- [x] **リポジトリ設定** <!-- id: 35 -->
  - [x] GitHub CLI (gh) のインストール <!-- id: 36 -->
  - [x] `gh auth login` (認証) <!-- id: 37 -->
  - [x] `gh repo create` (作成とプッシュ) <!-- id: 38 -->

## Phase 1.8: 座学・設計戦略 (Strategy & Architecture Study) [2026年1月26日]

- [x] **Unity to R3F 概念翻訳 (Concept Translation)** <!-- id: 39 -->
  - [x] `Resources.Load` vs `useGLTF` <!-- id: 40 -->
  - [x] Prefab vs Component <!-- id: 41 -->
- [x] **アーキテクチャ設計 (ModelViewer Draft)** <!-- id: 42 -->
  - [x] `ModelViewer.tsx` のインターフェース設計 <!-- id: 43 -->

## Phase 1.9: Blender to Web 理論 (Blender Theory) [2026年1月27日]

- [x] **Standard Shader -> PBR (glTF) 変換理論** <!-- id: 44 -->
  - [x] VRChat(Metallic/Smoothness) との違い <!-- id: 45 -->
  - [x] ORM Map (R:Occlusion, G:Roughness, B:Metalness) の理解 <!-- id: 46 -->

## Phase 3.0: コンセプト・設計戦略 (Concept Strategy) [2026年1月27日]

- [x] **ポートフォリオ企画書 (Design Doc) 作成** <!-- id: 47 -->
  - [x] テーマ決定: Virtual Showroom (Digital Fashion) <!-- id: 48 -->
  - [x] ターゲット層とアピールポイントの整理 <!-- id: 49 -->
  - [x] サイト構成 (Wireframe) の定義 <!-- id: 50 -->

## Phase 2: Unity知識の移植 (Unity Knowledge Transfer) [2026年2月]

- [ ] **Blender to Web パイプライン** <!-- id: 13 -->
  - [ ] Blenderでのモデル作成・最適化 (glTF書出し, ORMマップ焼き込み) <!-- id: 14 -->
  - [ ] `.glb` 形式でのエクスポート (圧縮設定確認) <!-- id: 15 -->
- [ ] **R3F 統合 (Integration)** <!-- id: 16 -->
  - [ ] `useGLTF` を使用したモデルの読み込み <!-- id: 17 -->
  - [ ] HTML <=> Canvas 間の双方向通信の実装 <!-- id: 18 -->
  - [ ] HTMLボタン経由でのアニメーション再生制御 <!-- id: 19 -->

## Phase 3: ポートフォリオ構築 (Portfolio Construction) [2026年2月下旬 - 3月中旬]

- [ ] **コンセプト策定と設計** <!-- id: 20 -->
  - [ ] テーマ決定 (例: Webアバタービューワー、3D製品カタログ等) <!-- id: 21 -->
  - [ ] UI/UXデザイン (Figmaまたはプロトタイピング) <!-- id: 22 -->
- [ ] **実装 (Implementation)** <!-- id: 23 -->
  - [ ] コア3D機能の実装 <!-- id: 24 -->
  - [ ] レスポンシブデザイン対応 (スマホ対応) <!-- id: 25 -->
- [ ] **最適化 (Optimization)** <!-- id: 26 -->
  - [ ] パフォーマンスチューニング (Lighthouseスコア改善) <!-- id: 27 -->
  - [ ] アセット最適化 (Draco圧縮、テクスチャリサイズ) <!-- id: 28 -->

## Phase 4: 脱獄・就活 (Jailbreak & Deployment) [2026年3月下旬]

- [ ] **デプロイ (Deployment)** <!-- id: 29 -->
  - [ ] Vercelへのデプロイ <!-- id: 30 -->
  - [ ] 最終QA検証 <!-- id: 31 -->
- [ ] **就職活動 (Job Hunting)** <!-- id: 32 -->
  - [ ] 履歴書・Wantedlyプロフィールの更新 <!-- id: 33 -->
  - [ ] ターゲット企業への応募開始 <!-- id: 34 -->
