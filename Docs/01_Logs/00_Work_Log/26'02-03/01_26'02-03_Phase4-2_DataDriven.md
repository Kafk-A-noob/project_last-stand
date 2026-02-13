# Phase 4.2: Data-Driven Refactoring (Asset Manifest)

**実施日:** 2026-02-03
**担当:** Antigravity (Implementation)
**概要:**
ハードコードされたアセットパスとUIボタンロジックを排除し、`src/config/asset-manifest.ts` に集約する「データ駆動型アーキテクチャ」への移行を実施。

## 変更内容 (Changes)

### 1. Manifestの作成

- **File:** `src/config/asset-manifest.ts`
- **内容:** 全モデルデータのRegistry。`id`, `name`, `path` を管理。

### 2. Storeの改修

- **File:** `src/lib/store.ts`
- **変更:** 初期 `targetPath` をハードコード文字列から `ASSET_MANIFEST[0].path` に変更。
- **効果:** マニフェストの並び順を変えれば、初期表示モデルも変わるようになった。

### 3. UIの動的生成

- **File:** `src/app/components/layout/ViewerLayout.tsx`
- **変更:** `handleNext` (テスト用) を削除し、マニフェスト配列の `.map()` によるボタン生成ロジックへ換装。
- **効果:** モデルが増えてもUIコードを触る必要がなくなった。

## Verification

- [x] **Compile Check:** `store.ts`, `ViewerLayout.tsx` の型整合性確認。
- [x] **Lint:** Unused Function (`handleNext`) の排除。

## Next Action

- [ ] **Asset Creation:** 自宅PCにて `radio.glb` などを実際に配置して表示確認を行う。
