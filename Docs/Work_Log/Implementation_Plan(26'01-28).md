# 実装計画書 (2026-01-29)

## Phase 3: ポートフォリオ本制作 (Portfolio Construction) - START

### 概要

- **目的:** 就職活動で使用する「勝てるポートフォリオ」の本構築を開始する。
- **テーマ:** Virtual Showroom (Digital Fashion / Tech Showcase)
- **戦略:** Phase 2で確立した「Blender to Web」パイプラインを駆使し、リッチな3D空間と使いやすい2D UIを融合させる。

### 1. コンセプト策定と設計 (Concept & Design)

- **Status:** [ ] To Do
- **Goal:** 何を作るか、誰に見せるかを明確にし、手戻りを防ぐ。
- **Tasks:**
  - [ ] **テーマ決定:** 具体的な「展示物」を決める（靴？ アバター？ ガジェット？）。
  - [ ] **UI/UXデザイン:** Figmaまたは手書きメモでワイヤーフレームを作成。
    - 3D背景 + 手前の2D UI (Overlay) の構成案。
    - 「見てほしいポイント」への誘導導線。

### 2. UI/UX 実装 (Viewer Layout)

- **Status:** [ ] To Do
- **Goal:** 3Dシーンの上に、きれいなHTML/CSS (Tailwind) UIを重ねて表示する基盤を作る。
- **Tasks:**
  - [ ] `ViewerLayout` コンポーネント作成。
  - [ ] ヘッダー（ロゴ、メニュー）、フッター（著作権、リンク）の実装。
  - [ ] `pointer-events` の制御（3D操作を邪魔しないUI）。

### 3. コンテンツ実装 (Content Production)

- **Status:** [ ] To Do
- **Goal:** 実際に展示する3Dモデルを配置する。
- **Tasks:**
  - [ ] メイン展示モデルの作成・修正 (Blender)。
  - [ ] ライティング・環境設定 (Environment, ContactShadows)。

---
**本日の目標:**
まずは「1. コンセプト策定」を行い、何を作るかを確定させます。
その後、「2. UI/UX 実装」で外枠を作ってしまいましょう。
