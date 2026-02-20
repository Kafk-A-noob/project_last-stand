# Daily Report

Date: 2026-02-21

## 実施事項 (Completed Tasks)

- **Vercel デプロイメントエラーの対応**:
  - `01_Radio.glb` モデルの 404エラーの原因が Git 上の Case-Sensitivity (大文字・小文字の区別) にあることを特定。
  - `git mv` コマンドを用いて Git index 上でのファイル名の大文字小文字を同期。Vercel 環境での正常な読み込みを確認。
- **缶コーヒーモデル (Item-003) 原点オフセット調査**:
  - R3F上で缶コーヒーモデルが意図しない座標に飛ぶ問題を調査。
  - `ManualLoader.tsx` では純粋な `<primitive>` としてモデルが扱われており、Blenderからのローカル原点がそのままワールド原点として計算されていることを確認（スケール20倍の影響で数センチのズレが数メートルのズレへ拡大）。
  - **解決策の策定**: Blender側での原点再設定 (Approach A) または R3F側での `<Center>` コンポーネント導入 (Approach B) の両方の解決策を提示し技術資料（`08_Model_Origin_Offset.md`）として保存。

## 次回持ち越しタスク (Pending / Next Actions)

- 本日作成したトラブルシューティングガイド（`Docs/02_Technical/Troubleshooting/08_Model_Origin_Offset.md`）に基づき、「缶コーヒー」モデルの原点ズレ問題を修正する（Blenderまたは R3F側での対応を選択・実行）。
- その他アイテム群の実装・テスト。

## 特記事項 (Notes)

- `CURRENT_STATUS.md` を更新し、次回引き継ぎ事項を記載しました。
