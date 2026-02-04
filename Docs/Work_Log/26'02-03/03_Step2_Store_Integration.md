# Step 2: Storeの改修 (Manifest連携)

Manifest作成完了、お疲れ様でした。
次は `src/lib/store.ts` を修正し、作成したManifestから初期値を読み込むように変更します。

## 1. 修正対象ファイル

- **Path:** `src/lib/store.ts`

## 2. 実装コード (修正指示)

以下のようにコードを書き換えてください。

### A. Importの追加

ファイルの先頭にManifestのインポートを追加します。

```typescript
import { create } from 'zustand';
import { ASSET_MANIFEST } from '@/config/asset-manifest'; // [NEW]
```

### B. 初期値の変更

`targetPath` の初期値を、ハードコードされた文字列からManifestの最初のアイテムに変更します。

```typescript
// ... (中略)

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  currentModel: null,

  // [MODIFY] ハードコードを削除し、Manifest[0]を参照
  targetPath: ASSET_MANIFEST[0].path, 
  setTargetPath: (path) => set({ targetPath: path}),

  setModelData: (data) => set({ isLoaded: true, currentModel: data }),
  resetModelData: () => set({ isLoaded: false, currentModel: null }),
}));
```

## 3. 解説 (Why?)

- **Centralized Config:**
  これでもう `store.ts` の中に `"React_Logo.glb"` という文字列は存在しません。
  どのモデルを最初に表示するかは、`asset-manifest.ts` の並び順（または設定）だけで決まるようになります。

---

修正が完了したら教えてください。最後に Step 3 (UI自動生成) に進みます。
