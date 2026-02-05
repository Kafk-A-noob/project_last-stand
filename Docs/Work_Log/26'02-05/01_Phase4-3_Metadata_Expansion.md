# Phase 4.3: Metadata Expansion Logic

**Docs/Ark_Cargo.md** で定義されたテキストデータ（Quote, Description, Contributor）を、アプリケーションに取り込むための実装手順書です。

## 概要 (Overview)

1. **Schema Upgrade:** `lib/store.ts` の型定義を拡張する。
2. **Data Entry:** `config/asset-manifest.ts` にデータを入力する。
3. **UI Update:** `InfoPanel` に拡張したデータを表示させる（今回はデータ入力までをスコープとします）。

---

## Step 1: 型定義の拡張

まず、「データの受け皿」を作ります。

**File:** `src/lib/store.ts`

```typescript
// データの型定義
export type ArchiveItem = {
  // System
  id: string;          // e.g. "item-001-radio"
  active: boolean;     // [NEW] 開発中フラグ (falseならUIに出さない等の制御用)
  
  // Narrative (The Soul) [NEW]
  name: string;        // e.g. "Retro Radio"
  quote: string;       // e.g. "最期まで日常らしい時間を..."
  description: string; // e.g. "いつもの時間、いつものチャンネル。"
  contributor: string; // e.g. "Nana"
  
  // Asset (The Body)
  path: string;        // [Modified] modelPath -> path に統一推奨（Manifestと合わせる）
  
  // Tech Specs (The Flex) - 将来用
  /*
  techSpecs: {
    vertices: number;
    triangles: number;
  };
  */
};
```

※ `AssetManifestItem` もこれに合わせて拡張する必要があります。`store.ts` の型をインポートして使うのがスマートです。

---

## Step 2: データ入力 (Data Entry)

拡張した型に合わせて、マニフェストにデータを流し込みます。

**File:** `src/config/asset-manifest.ts`

```typescript
import { ArchiveItem } from "@/lib/store";

// Manifestの型はStoreの型を継承、あるいは同一視する
export const ASSET_MANIFEST: ArchiveItem[] = [
  {
    id: "item-001-radio",
    active: false, // まだモデルがないので false
    name: "Radio",
    path: "/models/radio.glb",
    quote: "最期まで日常らしい時間を感じたいから。",
    description: "いつもの時間、いつものチャンネル。",
    contributor: "Nana",
  },
  // 以下、ID-002以降も同様に追加...
];
```

## Tips: コンパイルエラーへの対処

型定義を変えると、既存のコード（`ASSET_MANIFEST` や `ViewerLayout`）で「プロパティが足りない」というエラーが出ます。
素早く全てのアイテムに `quote: "", description: ""` などの空文字を入れて辻褄を合わせるのがコツです。

---

## Step 3: UI修正 (InfoPanelの整合性確保)

`src/app/components/ui/InfoPanel.tsx` を確認すると、既に `quote` や `description` を表示するコードが含まれています。
しかし、`store.ts` で `techSpecs` を一時的に無効化したため、**このままではコンパイルエラー** になります。

### 修正内容

`src/app/components/ui/InfoPanel.tsx` の `Tech Spec Section` をコメントアウト（または削除）してください。

```tsx
      {/* Tech Spec Section - データがないので一時的に非表示 */}
      {/* 
      <div className="space-y-1 mb-4 text-xs font-bold border-l-2 border-gray-700 pl-2">
        <p>VERT: {currentModel.techSpecs.vertices.toLocaleString()}</p>
        <p>TRIS: {currentModel.techSpecs.triangles.toLocaleString()}</p>
        <p>COMP: {currentModel.techSpecs.compression}</p>
      </div>
      */}
```

これで型エラーが消え、入力したテキストデータが画面に表示されるはずです。
修正を行ってください。
