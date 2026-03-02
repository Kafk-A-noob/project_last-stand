# 作戦計画: Operation Last-Stand (Web3Dポートフォリオ構築)

## Phase 1: 基礎と開眼 (Basic Training & Awakening) [2026年1月末まで]

- [x] 実行計画に対するユーザーの承認を得る
- [x] **環境構築 (Environment Setup)**
  - [x] `npx create-next-app` (TypeScript, Tailwind, App Router)
  - [x] 依存関係のインストール (`three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`)
  - [x] 初期ボイラープレートの削除とクリーンアップ
- [x] **Mission: 最初のキューブ (The First Cube)**
  - [x] 3D Canvasコンポーネントの作成 (Scene)
  - [x] 赤いCubeメッシュの実装
  - [x] 回転アニメーションの追加 (`useFrame`)
  - [x] `OrbitControls` による視点操作の実装
  - [x] 背景色の設定 (黒)
- [x] **React Hooks 訓練 (Unity概念翻訳)**
  - [x] 2Dカウンターの実装 (State管理の理解)
  - [x] 2D UIボタンによる3Dオブジェクトの色変更連携 (Props/イベントハンドリング)

## Phase 1.5: VCS連携 (GitHub Setup)

- [x] **リポジトリ設定**
  - [x] GitHub CLI (gh) のインストール
  - [x] `gh auth login` (認証)
  - [x] `gh repo create` (作成とプッシュ)

## Phase 1.8: 座学・設計戦略 (Strategy & Architecture Study) [2026年1月26日]

- [x] **Unity to R3F 概念翻訳 (Concept Translation)**
  - [x] `Resources.Load` vs `useGLTF`
  - [x] Prefab vs Component
- [x] **アーキテクチャ設計 (ModelViewer Draft)**
  - [x] `ModelViewer.tsx` のインターフェース設計

## Phase 1.9: Blender to Web 理論 (Blender Theory) [2026年1月27日]

- [x] **Standard Shader -> PBR (glTF) 変換理論**
  - [x] リアルタイム3Dコンテンツ(Metallic/Smoothness) との違い
  - [x] ORM Map (R:Occlusion, G:Roughness, B:Metalness) の理解

## Phase 3.0: コンセプト・設計戦略 (Concept Strategy) [2026年1月27日]

- [x] **ポートフォリオ企画書 (Design Doc) 作成**
  - [x] テーマ決定: Virtual Showroom (Digital Fashion)
  - [x] ターゲット層とアピールポイントの整理
  - [x] サイト構成 (Wireframe) の定義

## Phase 2: Unity知識の移植 (Unity Knowledge Transfer) [2026年2月]

- [x] **Blender to Web パイプライン**
  - [x] Blenderでのモデル作成・最適化 (glTF書出し, ORMマップ焼き込み)
  - [x] `.glb` 形式でのエクスポート (圧縮設定確認)
- [x] **R3F 統合 (Integration)**
  - [x] `useGLTF` を使用したモデルの読み込み
  - [x] HTML <=> Canvas 間の双方向通信の実装
  - [x] HTMLボタン経由でのアニメーション再生制御

## Phase 3: ポートフォリオ構築 (Portfolio Construction) [2026年2月下旬 - 3月中旬]

- [x] **コンセプト策定と設計**
  - [x] テーマ決定 (例: Webアバタービューワー、3D製品カタログ等)
  - [x] UI/UXデザイン (Figmaまたはプロトタイピング)
- [x] **実装 (Implementation)**
  - [x] コア3D機能の実装
  - [x] レスポンシブデザイン対応 (スマホ対応)
- [x] **最適化 (Optimization)**
  - [x] パフォーマンスチューニング (Lighthouseスコア改善)
  - [x] アセット最適化 (Draco圧縮、テクスチャリサイズ)

## Phase 4: 脱獄・就活 (Jailbreak & Deployment) [2026年3月下旬]

- [x] **デプロイ (Deployment)** (Local Successful)
  - [x] Vercelへのデプロイ
  - [x] 最終QA検証
- [ ] **就職活動 (Job Hunting)**
  - [ ] 履歴書・Wantedlyプロフィールの更新
  - [ ] ターゲット企業への応募開始

## Phase 5: Verification & Polish [2026年3月]

- [x] **Deployment Verification**
  - [x] Vercel Deploy Check
  - [x] Build Success Confirmation
  - [x] Fix: Git Branch sync (master -> main)
    - [x] Fix: Asset Loading (Force Add .glb)
    - [x] **QA & Hotfix (Phase 5.1)**
      - [x] Optimistic UI Implementation (store.ts)
      - [x] Error Boundary Styling (ViewCanvas.tsx)
    - [ ] **Release**: Blocked by Vercel/GitHub Auth (Requires Manual Redeploy from Home)
- [ ] **Final Verification**
  - [ ] Live URL Check (Pending Redeploy)
- [x] **Documentation**
  - [x] Update README.md (Portfolio Face)
  - [x] Organize Docs/ Structure
  - [x] Create Handoff Documentターゲット企業への応募開始

## Phase 6: Job Hunting (Target: Dwango)

- [x] **Strategy Planning**
  - [x] Analyze Job Description (ZEN Study)
  - [x] Create Interview Strategy (`Docs/01_Job_Hunting`)
  - [x] Create Code Walkthrough (`Docs/01_Job_Hunting/Architecture_and_Code_Walkthrough.md`)
  - [x] Create Technical Glossary (`Docs/01_Job_Hunting/Technical_Glossary.md`)
- [ ] **Application Materials**
  - [ ] Resume Update
  - [ ] Wantedly Profile Update
