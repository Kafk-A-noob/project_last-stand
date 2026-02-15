# Work Log: Fix InfoPanel Crash

**Date:** 2026-02-16
**Goal:** `InfoPanel.tsx` で発生している `TypeError: Cannot read properties of undefined` を修正する。
**Cause:** `store.ts` で `vertices` 等を「任意項目 (Optional)」に変更したが、UI側でその考慮が漏れていたため、ロード完了前に `undefined` にアクセスして落ちている。

## 1. UI Update (`src/app/components/ui/InfoPanel.tsx`)

`vertices` や `triangles` がまだ存在しない場合（ロード中）は、ハイフン `-` などを表示するように修正します。

### [MODIFY] `src/app/components/ui/InfoPanel.tsx`

64-66行目付近を以下のように書き換えてください。
`.` (ドット) の前に `?` を付け、後ろに `?? "-"` (データがない場合の表示) を追加します。

```tsx
          <div
            className={cn(
              "space-y-1 mb-4 text-xs font-bold border-l-2",
              "border-cyan-500/50 pl-2 text-cyan-400",
            )}
          >
            {/* [修正] オプショナルチェーン (?.) と Null合体演算子 (??) を使用 */}
            <p>VERT: {currentModel.techSpecs.vertices?.toLocaleString() ?? "-"}</p>
            <p>TRIS: {currentModel.techSpecs.triangles?.toLocaleString() ?? "-"}</p>
            <p>COMP: {currentModel.techSpecs.compression ?? "-"}</p>
            
            {currentModel.techSpecs.fileSize && (
              <p>SIZE: {currentModel.techSpecs.fileSize}</p>
            )}
          </div>
```

これで、データがまだ無いときは「VERT: -」のように表示され、アプリが落ちなくなります。
お手数をおかけしました。
