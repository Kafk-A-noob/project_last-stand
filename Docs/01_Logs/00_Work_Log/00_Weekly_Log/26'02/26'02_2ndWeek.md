# Weekly Log: 26'02_2ndWeek

**期間:** 02-09 (Mon) ~ 02-15 (Sun)

## 1. 週間サマリー (Executive Summary)

モバイル対応およびデプロイ環境（Vercel）における安定化を徹底した週。
特に「無限ループによるクラッシュ」や「ロード中のUI不整合」といったUXを損なう重大なバグを修正し、実用レベルへの引き上げを行った。

## 2. 主な成果 (Key Achievements)

### デプロイメント & CI/CD

- **Vercel Hotfix:** ビルドエラー（TypeScript型違反、ESLintエラー）を解消し、継続的デプロイメント環境を構築。
- **Optimistic UI:** 「ボタンを押しても反応しない（ロード待ち）」状態を解消するため、データを即座に更新する楽観的UI更新を実装。

### モバイル & UI改善

- **Viewport Fix:** iPhone (Safari) におけるアドレスバー問題を `dvh` (Dynamic Viewport Height) で解決。
- **Crash Looping Fix:** `ManualLoader` における `useEffect` の依存関係ループを修正し、ブラウザクラッシュを防いだ。
- **Context Lost対策:** `OrbitControls` が GPU Context Lost 時にエラーを吐く問題を、安全なアンマウント処理で回避。

## 3. 日次ログ (Details)

- **02-09 (Mon):** [26'02-09_DailyReport.md](../../26'02-09/26'02-09_DailyReport.md) (Mobile Layout)
- **02-12 (Thu):** [26'02-12_DailyReport.md](../../26'02-12/26'02-12_DailyReport.md) (Deployment Hotfix)
- **02-13 (Fri):** [26'02-13_DailyReport.md](../../26'02-13/26'02-13_DailyReport.md) (Doc & Polish)
- **02-15 (Sun):** [26'02-15_DailyReport.md](../../26'02-15/26'02-15_DailyReport.md) (Infinite Loop Fix)
