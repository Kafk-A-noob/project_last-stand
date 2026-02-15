# Handover: Radio Integration & System Hardening

**Date:** 2026-02-16
**Author:** Assistant (for User)
**Subject:** ID-001 Radio Implementation Status & Next Actions

## 1. Executive Summary

本セッションでは、最初のストーリーテリング・アセット「Radio (ID-001)」を実機で動作させるための基盤実装を完了しました。
また、モバイル環境でのレイアウト崩れや、無限ループによるクラッシュなどの重大な不具合を修正し、コードベースの安定化を図りました。

**Current Status:** **STABLE (Ready for Content)**
システムは安定しており、あとは「完成したRadioモデル（テクスチャ付き）」を配置するだけの状態です。

## 2. Completed Implementations

### A. Asset Pipeline Hardening

- **個別トランスフォーム制御:** `store.ts` と `ManualLoader.tsx` を拡張し、モデルごとに `scale` / `position` / `rotationSpeed` を `asset-manifest.ts` で指定可能にしました。
  - Radioは `scale: [3,3,3]`, `position: [0, -1.0, 0]` で設定済み。
- **ファイルサイズ表示 (Manual Mode):** 自動取得 (`fetch`) の信頼性が低いため、マニフェスト手動入力方式 (`fileSize: "0.98 MB"`) に切り替えました。これにより、サーバー環境に依存せず確実にスペックを表示できます。
- **Git管理:** `.gitignore` を修正し、`.glb` ファイルをリポジトリの管理対象に含めました（Vercelデプロイ用）。

### B. Visual & UI Fixes

- **Environment Map:** `City` プリセットを追加。これにより、RadioやReactロゴの金属部分が正しく反射し、リッチな見た目になりました。
- **Mobile Layout:** iPhone (Safari) のアドレスバーによる表示崩れを `100dvh` で解消。スクロールバウンスも無効化しました。
- **Crash Fix:** `InfoPanel` で発生していた `undefined` アクセスエラーを `?.` (Optional Chaining) で修正。

## 3. Pending Actions (Next Steps)

### Blender Work (User Task)

現在表示されているRadioは「形状のみ（グレー）」の状態です。
以下の作業をBlenderで行い、ファイルを上書きしてください。

1. **Texture Baking:**
    - マテリアル（Body, Glass）の質感をテクスチャに焼き込む。
2. **Export:**
    - ファイル名: `01_radio.glb`
    - 保存先: `d:\KafkA\Documents\project_last-stand\public\models\`
    - ※上書き保存するだけで、Web側の設定（大きさ・位置・回転）が自動的に適用されます。

### Optional Cleanup

- `asset-manifest.ts` の `techSpecs` 内にある `fileSize` は、実際にエクスポートされた `.glb` のサイズを見て手動で書き換えてください。

## 4. Key Decisions & Rationales

| Decision | Rationale |
| :--- | :--- |
| **Manual File Size** | Next.js開発鯖や一部CDNが `Content-Length` を返さないため、信頼性を優先して手動入力とした。 |
| **Direct Manifest Import** | `ManualLoader` で Store (`currentModel`) を参照すると無限ループが発生するため、静的ファイル (`ASSET_MANIFEST`) を直接読み込む設計に変更した。 |
| **PBR Environment** | 背景は「黒（虚無）」だが、マテリアルには反射が必要なため、`background={false}` で環境マップのみを適用する手法を採用した。 |
