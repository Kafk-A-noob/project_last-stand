# Project Last-Stand: The Digital Ark

> "We capture the soul of the end times."

## Overview (概要)

**Next.js 15+ (App Router)** と **React Three Fiber** を用いた、Web3Dポートフォリオ/デジタルアーカイブ。
Unity/VRChat・職業訓練校の経験をモダンWebスタンダードで構築しています。

## Tech Stack (使用技術)

- **Framework:** Next.js (App Router)
- **3D Engine:** Three.js / React Three Fiber (R3F)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Testing:** Vitest (CI Integration)

## Key Features (主な機能)

- **Optimistic UI Navigation:**
  アセットロード待ち時間をゼロに感じさせる、非同期状態分離による即時遷移システム (`store.ts`)。
- **Hybrid State Management:**
  React (UI) と R3F (Canvas) のステートを効率的に分離し、再レンダリングを最小限に抑えた設計。
- **SmartLoader System:**
  サーバーレス環境特有の `Content-Length` 欠損問題に対し、マニフェスト主導のフォールバックロジックで正確な進捗を表示。
- **Dynamic Data-Driven UI:**
  データ管理と表示名・連番の責務を分離し、メンテナンス性と美観を両立。
- **Asset Manifest System:**
  静的アセット定義 (`asset-manifest.ts`) をSingle Source of Truthとし、ゼロレイテンシでのメタデータアクセスを実現。
- **Draco Compression:**
  Google Draco圧縮による、高パフォーマンスな3Dアセット配信。

## Documentation (ドキュメント)

包括的な技術文書と開発ログです。

- **[Specifications](Docs/00_Specs/): Folder**
  システムアーキテクチャ、画面設計、開発ロードマップ。
- **[Technical Reports](Docs/03_Technical/): Folder**
  実装詳細、技術選定の理由、トラブルシューティング記録。
- **[Development Logs](Docs/02_Logs/): Folder**
  日々の開発履歴と意思決定のプロセス。

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

_Created by KafkA (25R1116 = Kafk-A-noob) | Powered by Next.js & R3F_
