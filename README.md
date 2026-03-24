# Project Last-Stand: The Digital Ark

> "We capture the soul of the end times."

## Overview (概要)

**Next.js 15+ (App Router)** と **React Three Fiber** を用いた、Web3Dポートフォリオ/デジタルアーカイブ。
Unityを用いた3Dアセット制作の知見と、職業訓練校での学びを活かし、モダンWebスタンダードで構築しています。

## Tech Stack (使用技術)

- **Framework:** Next.js (App Router)
- **3D Engine:** Three.js / React Three Fiber (R3F)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Testing:** Vitest (CI Integration)
- **AI Mentorship:** Gemini AI (技術顧問・資料作成として活用)

## Key Features (主な工夫した点)

- **Optimistic UI (先読み画面遷移):**
  3Dデータを待つ間もUIだけは即座に切り替わるようにし、ユーザーが「重い」と感じにくい工夫（状態管理の分離）をしています。
- **SmartLoader System (プログレス表示):**
  Vercelでダウンロード容量が上手く取れない問題に対し、事前に設定したマニフェスト（設定情報）から容量を逆算し、正確なローディングのカウントアップを表示する仕組みを組み込みました。
- **データ駆動型UI (追加が簡単な設計):**
  モデルを追加する際、UIのコードをいじらなくても設定ファイル (`asset-manifest.ts`) にモデル情報を追加するだけで、名前や番号、3Dモデルが自動で画面に反映される設計にしています。
- **Draco Compression (モデルの軽量化):**
  GoogleのDraco圧縮規格を用いて、高画質な3Dモデルのファイルサイズを極限まで削り、ブラウザでも快適に動くように最適化しました。

## Documentation (関連資料)

本プロジェクトの仕様から日々の作業ログに至るまでを記録しています。

- **[00_Specs/](Docs/00_Specs/):**
  全体仕様書、画面設計、開発のロードマップ。
- **[01_Logs/](Docs/01_Logs/):**
  日々の実装手順や作業履歴（AIとのペアプログラミング記録）。
- **[02_Technical/](Docs/02_Technical/):**
  技術的なレポート、バグの解決策、なぜその技術を選んだかの理由。
- **[03_Manual/](Docs/03_Manual/):**
  手動デプロイの手順などを含む操作マニュアル。

## Operation Guide (操作方法)

本ポートフォリオは、直感的な 3D インタラクションとデータ連携 UI を備えています。

### 3D View Controls (カメラ操作)

- **Rotate (回転)**: ドラッグ / スマホでスワイプ
- **Zoom (拡大・縮小)**: マウスホイール / スマホでピンチイン・アウト
- *(※ モデルを画面外に逃がさないよう、平行移動(Pan)は意図的に無効化しています)*

### Navigation (モデル切り替え)

本番環境では、画面下部のコントロールパネルからシームレスなモデル切り替えが可能です。

- **Sequential (順次切替)**: `[ < ]` `[ > ]` ボタンで前後のモデルへ順番に切り替えます。
- **Direct Jump (直接一覧ジャンプ)**: `[MENU]` ボタンから全モデルの一覧グリッドを展開し、任意のモデルへジャンプできます。

### Info Panel (詳細情報パネル)

- **画面右上 (スマホは右寄り) のパネル**: タップまたはクリックすることで、現在のモデルの背景情報 (一言フレーズ、詳細文、提供者) および、技術仕様 (頂点数、ファイルサイズ等) を展開/格納できます。

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000
```

## Project Structure

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── canvas/    # 3D Logic (R3F)
│   │   ├── ui/        # 2D Overlay UI
│   │   └── layout/    # Composition Layer
│   └── (pages)/       # Next.js Routes
├── lib/               # Utilities & Stores
└── public/            # Static Assets
```

## License (利用規約)

本リポジトリの内容を確認する前に、以下の規約を遵守してください。

- **Source Code (ソースコード):**
  本プロジェクトは、就職活動におけるポートフォリオ評価および技術的なコードレビューを目的として公開されています。
  **商用利用、再配布、および著作者の許可なきコードの流用は固く禁じます。**
  採用担当者様およびエンジニアの方によるコード分析は歓迎いたします。

- **Assets (3Dモデル・画像・デザイン):**
  本リポジトリに含まれるすべての 3Dモデルおよび視覚的アセットは、制作者の独自の著作物です。
  一部のアセットは二次創作（ファンアート）であり、それぞれの権利保有者に帰属します。
  **いかなる形であれ、これらを無断で再配布・流用・商用利用することは固く禁じます。**

&copy; 2026 KafkA (25R1116). All rights reserved.

---

*Created by KafkA (25R1116 = Kafk-A-noob) | Powered by Next.js & R3F*
