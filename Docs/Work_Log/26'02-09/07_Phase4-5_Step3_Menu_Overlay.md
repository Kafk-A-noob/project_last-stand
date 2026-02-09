# How-To: Implement Hybrid Navigation (Part 3: Menu Overlay)

**Date:** 2026-02-09
**Target:**

1. `src/app/components/ui/NavigationMenu.tsx` (新規作成)
2. `src/app/components/layout/ViewerLayout.tsx` (修正)

**Goal:** 「MENU」ボタンを押すと、全画面でアイテム一覧が表示され、クリックで飛べるようにする。

> [!IMPORTANT]
> **これは「写経用」の手順書です。**
> 自分でコードを入力し、構造を理解しながら実装してください。

---

## 1. Menuコンポーネントの作成

まずは「一覧画面」そのものを作ります。
`src/app/components/ui/NavigationMenu.tsx` を作成し、以下のコードを記述してください。

### ポイント (Concept)

- **Fixed Overlay:** `fixed inset-0 z-50` で画面全体を覆います。
- **Grid Layout:** `grid-cols-2 md:grid-cols-4` でスマホなら2列、PCなら4列に並べます。
- **Store連携:** `ASSET_MANIFEST` を直接ループするのではなく、Storeのアクション (`setTargetPath`) を呼びます。

```tsx
// src/app/components/ui/NavigationMenu.tsx

"use client";

import { cn } from "@/lib/utils";
import { ASSET_MANIFEST } from "@/config/asset-manifest";
import { useStore } from "@/lib/store";

interface NavigationMenuProps {
  onClose: () => void; // 閉じるための関数を親から受け取る
}

export default function NavigationMenu({ onClose }: NavigationMenuProps) {
  const setTargetPath = useStore((state) => state.setTargetPath);
  const currentPath = useStore((state) => state.targetPath);

  return (
    // 背景 (黒の半透明)
    <div className="fixed inset-0 z-50 bg-black/90 text-white p-8 overflow-y-auto">
      {/* 閉じるボタン (右上) */}
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-white/20 rounded hover:bg-white/10"
        >
          [ CLOSE ]
        </button>
      </div>

      {/* グリッド一覧 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {ASSET_MANIFEST.map((item) => {
          const isLocked = !item.active;
          const isActive = item.path === currentPath;

          return (
            <button
              key={item.id}
              disabled={isLocked}
              onClick={() => {
                if (!isLocked) {
                  setTargetPath(item.path);
                  onClose(); // 選択したら閉じる
                }
              }}
              className={cn(
                "aspect-square border rounded p-4 flex flex-col items-center justify-center gap-2 transition-all",
                // Active (選択中)
                isActive
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-white/10",
                // Hover
                !isLocked &&
                  !isActive &&
                  "hover:bg-white/5 hover:border-white/30",
                // Locked
                isLocked && "opacity-30 cursor-not-allowed bg-black/50",
              )}
            >
              <div className="text-xl font-bold">
                {isLocked ? "?" : item.name[0]} {/* 頭文字を表示 */}
              </div>
              <div className="text-xs text-center">{item.name}</div>
              {isLocked && (
                <div className="text-[10px] text-red-500">OFFLINE</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

## 2. ViewerLayoutへの統合

作ったメニューを表示するための「スイッチ」を作ります。

### Step 1: Stateの追加

`ViewerLayout.tsx` に `useState` を追加します。

```tsx
// src/app/components/layout/ViewerLayout.tsx

import { useState, ReactNode } from "react"; // useStateを追加
import NavigationMenu from "../ui/NavigationMenu"; // Importを追加

// ...

export default function ViewerLayout({ children }: ViewerLayoutProps) {
  // メニューの開閉状態
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Store ...
```

### Step 2: Overlayの配置

`return` の中の最後（`</div>` の直前あたり）に、条件付きでメニューを表示します。

```tsx
      {/* menu overlay */}
      {isMenuOpen && (
        <NavigationMenu onClose={() => setIsMenuOpen(false)} />
      )}
    </div> // ここでdivが閉じる
  );
}
```

### Step 3: ボタンの有効化

フッターの `[ MENU ]` ボタンを書き換えます。

```tsx
{
  /* [ Menu ] Button */
}
<button
  onClick={() => setIsMenuOpen(true)} // 開く
  className={cn(
    "ml-4 px-4 py-2 text-xs border border-white/10 rounded",
    "hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all text-cyan-200",
  )}
  // disabled を削除
>
  [ MENU ]
</button>;
```

これで完成です！
ブラウザで `[ MENU ]` を押し、グリッドが表示されるか確認してください。
