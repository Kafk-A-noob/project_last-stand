# Work Log: Radio Integration & Logic Hardening

**Date:** 2026-02-16
**Status:** Completed
**Focus:** Radio Model Integration, Mobile Layout, Bug Fixes

## 1. Summary

本セッションでは、最初のメインアセットである「Radio」のシステム組み込みを完了させた。
また、開発中に発覚した「スマホでの表示崩れ」や「無限ループによるクラッシュ」といった深刻な不具合を修正し、コードベースとしての強度を高めた。

## 2. Technical Challenges & Fixes

### A. Infinite Loop in ManualLoader

- **Issue:** `useEffect` 内で `updateModel` を呼ぶ際、`currentModel` を依存配列に入れていたため、更新→再検知→更新のループが発生。
- **Fix:** Storeの `currentModel` ではなく、不変の `ASSET_MANIFEST` から値を参照するように変更し、依存を断ち切った。

### B. Mobile Layout (Safari Address Bar)

- **Issue:** `h-screen` (100vh) を指定していたため、iPhoneのSafariでアドレスバーが表示されるとUIの下部が隠れてしまった。
- **Fix:** `h-dvh` (Dynamic Viewport Height) を採用し、動的に高さを調整するように変更。

### C. File Size Fetching

- **Issue:** Next.jsの開発サーバーが静的ファイルの `Content-Length` を返さず、サイズが "Unknown" になる。
- **Fix:** `fetch` を廃止し、`asset-manifest.ts` に手動でファイルサイズを記述する運用に変更。これによりHTTPリクエストを減らし、確実性を向上させた。

## 3. Pending Tasks

- **Blender Texture Baking:** Radioモデルのマテリアル設定とテクスチャ焼き込み（ユーザー作業）。
- **Asset Cleanup:** 他のプレースホルダーモデルの差し替え。

## 4. Work Files

- `src/app/components/canvas/ManualLoader.tsx`
- `src/app/components/ui/InfoPanel.tsx`
- `src/config/asset-manifest.ts`
- `src/lib/store.ts`
