# Work Log: Mobile UI Refinement

**Date:** 2026-02-14
**Target:** InfoPanel.tsx, ViewerLayout.tsx
**Goal:** モバイルでの情報過多を防ぐための「折りたたみ機能」実装と、フッターの見た目調整。

## 1. InfoPanel の折りたたみ (Mobile Only)

スマホでは `Name` と `Quote` のみを表示し、タップすると詳細 (`Tech Specs`, `Description`, `Contributor`) が展開されるようにします。
**PCでは常に全て表示されます。**

### `src/app/components/ui/InfoPanel.tsx`

`useState` を新たに import し、状態管理を追加してください。

```tsx
// 1. useState を追加
import { useState } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function InfoPanel() {
  const { currentModel } = useStore();
  // 2. 開閉状態 (初期値: false = 閉じている)
  const [isOpen, setIsOpen] = useState(false);

  if (!currentModel) return null;

  return (
    <div
      // 3. 全体をタップ可能にし、背景色やポインターを追加
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "bg-black/80 border-l-2 border-cyan-500 p-4 text-cyan-500",
        "font-mono text-sm w-64 backdrop-blur-sm",
        "cursor-pointer transition-colors hover:bg-black/90", // ホバー効果
        "select-none" // テキスト選択防止
      )}
    >
      {/* --- Always Visible (常時表示) --- */}
      <h2 className="text-lg font-bold mb-1 text-white flex justify-between items-center">
        {currentModel.name}
        {/* Mobile用の開閉アイコン (PCでは非表示) */}
        <span className={cn("text-xs md:hidden transform transition-transform", isOpen ? "rotate-180" : "")}>
          ▼
        </span>
      </h2>
      <div className="text-xs text-gray-400 mb-0 italic">
        &quot;{currentModel.quote}&quot;
      </div>

      {/* --- Collapsible Content (詳細情報) --- */}
      {/* md:max-h-none md:opacity-100: PCでは常に表示 */}
      {/* max-h-0 opacity-0: スマホ初期状態は非表示 */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100 md:mt-4"
        )}
      >
        {/* Tech Spec Section */}
        {currentModel.techSpecs && (
          <div
            className={cn(
              "space-y-1 mb-4 text-xs font-bold border-l-2",
              "border-cyan-500/50 pl-2 text-cyan-400",
            )}
          >
            <p>VERT: {currentModel.techSpecs.vertices.toLocaleString()}</p>
            <p>TRIS: {currentModel.techSpecs.triangles.toLocaleString()}</p>
            <p>COMP: {currentModel.techSpecs.compression}</p>
          </div>
        )}

        {/* Description Section */}
        <p
          className={cn(
            "pt-4 border-t border-cyan-500/30",
            "text-xs text-gray-300 leading-relaxed",
          )}
        >
          {currentModel.description}
        </p>
        <div className="mt-2 text-[10px] text-right text-gray-500">
          Provided by {currentModel.contributor}
        </div>
      </div>
    </div>
  );
}
```

## 2. Footer 文字位置調整

フッターのモデル名 (`currentModel.name`) が少し上に寄って見えるため、中央揃えを強化します。

### `src/app/components/layout/ViewerLayout.tsx`

フッター内の該当箇所（117行目付近）に `flex items-center justify-center pt-1` クラスを追加して微調整します。

```tsx
              {/* [ Label ] Current Item Name */}
              <div
                className={cn(
                  "text-xs text-cyan-200 font-bold min-w-[100px] text-center",
                  "flex items-center justify-center pt-0.5" // [Modified] 中央揃えと微調整
                )}
              >
                {/* モデルがロードされるまでは Loading... と表示 */}
                {currentModel ? currentModel.name : "LOADING..."}
              </div>
```
