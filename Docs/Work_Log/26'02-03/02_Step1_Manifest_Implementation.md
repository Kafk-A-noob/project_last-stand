# Step 1: Asset Manifestの実装

**Phase 4.2 Data-Driven Refactoring** の第一歩として、アセット情報を管理する「台帳」を作成します。

## 1. ファイル作成

`src/` 配下に `config/` フォルダを作成し（なければ）、`asset-manifest.ts` を作成してください。

- **Path:** `src/config/asset-manifest.ts`

## 2. 実装コード (写経用)

以下のコードを記述してください。

```typescript
import { ArchiveItem } from "@/lib/store";

// マニフェストの型定義
// 将来的には、シーンごとの初期カメラ位置やスケールもここに記述します
export type AssetManifestItem = {
  id: string;
  name: string;
  path: string;
};

/**
 * ASSET_MANIFEST (The Registry)
 * アプリケーションが認識するすべてのモデル定義。
 * 増やすときはここに行を追加するだけです。
 */
export const ASSET_MANIFEST: AssetManifestItem[] = [
  {
    id: "item-000-logo",
    name: "React Logo",
    path: "/models/React_Logo.glb",
  },
  {
    id: "item-001-radio",
    name: "Retro Radio",
    path: "/models/radio.glb",
  },
];
```

## 3. 解説 (Why?)

- **Single Source of Truth:**
  これまで `ViewerLayout.tsx` や `store.ts` に散らばっていたパス情報を一箇所に集めました。
  もしモデルのファイル名が変わっても、ここを1箇所直すだけで済みます。

---

実装が完了したら教えてください。次に `store.ts` の改修に進みます。
