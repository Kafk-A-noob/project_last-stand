# Step 3: UIの動的生成 (Final Step)

ManifestとStoreの準備が整いました。
最後に、UI (`ViewerLayout.tsx`) を修正し、Manifestの内容に基づいてボタンを自動生成するようにします。

## 1. 修正対象ファイル

- **Path:** `src/app/components/layout/ViewerLayout.tsx`

## 2. 実装コード (修正指示)

### A. Importの追加

Manifestをインポートします。

```typescript
import { useStore } from "@/lib/store";
import { ASSET_MANIFEST } from "@/config/asset-manifest"; // [NEW]
```

### B. テスト関数の削除

不要になった `handleNext` 関数を削除します。

```diff
- // [TEST] 切り替えテスト用関数
- const handleNext = () => {
-   // ...
- };
```

### C. ボタン生成ロジックの書き換え

`<footer>` 内のボタン部分を以下のように書き換えます。

**Before:**

```tsx
<div className={cn("flex gap-4")}>
  <button>[ PREV ]</button>
  <button>[ NEXT ]</button>
</div>
```

**After (Dynamic):**

```tsx
<div className={cn("flex gap-4")}>
  {/* マニフェストからボタンを動的生成 */}
  {ASSET_MANIFEST.map((item) => (
    <button
      key={item.id}
      onClick={() => setTargetPath(item.path)}
      className={cn(
        "px-4 py-2 bg-white/5 text-xs",
        "hover:bg-cyan-500/20 text-cyan-200 border",
        "border-white/10 hover:border-cyan-500/50 rounded",
        "transition-all active:scale-95",
      )}
    >
      [{item.name}]
    </button>
  ))}
</div>
```

## 3. 解説 (Why?)

- **Automation:**
  `.map()` 関数を使うことで、配列の要素数だけ自動的に `<button>` が作られます。
  これにより、`asset-manifest.ts` にアイテムを追加するだけで、画面上に選択ボタンが即座に現れるようになります。

---

これが最後のステップです。修正完了後、報告をお願いします。
