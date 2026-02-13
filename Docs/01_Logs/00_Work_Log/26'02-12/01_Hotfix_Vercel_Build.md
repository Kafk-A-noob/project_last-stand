# Hotfix: Vercel Build Error & Menu Integration

**Date:** 2026-02-12
**Target:** `src/app/page.tsx`, `src/app/components/canvas/ViewCanvas.tsx`, `src/app/components/layout/ViewerLayout.tsx`

Vercelでのビルドエラー (`ssr: false` is not allowed...) を修正し、ついでに未実装だったメニュー機能も統合します。

---

## 1. キャンバスの分離 (Create ViewCanvas)

`ssr: false` な `dynamic` import を、独立したクライアントコンポーネントに隔離します。

**Action:** `src/app/components/canvas/ViewCanvas.tsx` を新規作成します。

```tsx
"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

// Sceneの遅延読み込み (SSR無効化)
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function ViewCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <ErrorBoundary
        fallback={
          <div className="text-red-500 p-12">
            System Failure: Visual Module Crashed.
          </div>
        }
      >
        <Scene />
      </ErrorBoundary>
    </div>
  );
}
```

---

## 2. Pageの修正 (Clean Page)

`page.tsx` から `"use client"` を削除し、サーバーコンポーネントに戻します。
先ほど作った `ViewCanvas` を読み込みます。

**Action:** `src/app/page.tsx` を以下のように書き換えます。

```tsx
import ViewerLayout from "./components/layout/ViewerLayout";
import ViewCanvas from "./components/canvas/ViewCanvas";

export default function Home() {
  return (
    <ViewerLayout>
      <ViewCanvas />
    </ViewerLayout>
  );
}
```

---

## 3. ViewerLayoutの修正 (Menu Integration)

前回の修正依頼が反映されていない（メニューが開かない）状態なので、ここで統合します。

**Action:** `src/app/components/layout/ViewerLayout.tsx` を修正します。

### A. ImportとStateの追加 (上部)

```tsx
"use client";

import { ReactNode, useState } from "react"; // useState 追加
import { cn } from "@/lib/utils";
import InfoPanel from "../ui/InfoPanel";
import { useStore } from "@/lib/store";
// ... (中略)
import NavigationMenu from "../ui/NavigationMenu"; // Import 追加

export default function ViewerLayout({ children }: ViewerLayoutProps) {
  // State定義
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentModel = useStore((state) => state.currentModel);
  // ...
```

### B. ボタンの有効化 (Footer)

Disabled を削除し、onClick を設定します。
ついでに `hober` (typo) も `hover` に直しましょう。

```tsx
{
  /* [ Menu ] Button */
}
<button
  onClick={() => setIsMenuOpen(true)} // Open
  className={cn(
    "px-4 py-2 text-xs border-white/10 rounded",
    "hover:bg-cyan-500/20 hover:border-cyan-500/50", // Typo fix
    "transition-all active:scale-95",
  )}
  // disabled 削除
>
  [MENU]
</button>;
```

### C. オーバーレイの表示 (最下部)

`</footer>` の下に追加します。

```tsx
        </footer>

        {/* Menu Overlay */}
        {isMenuOpen && (
          <NavigationMenu onClose={() => setIsMenuOpen(false)} />
        )}
      </div>
    </div>
  );
}
```

---

これを適用してコミット＆プッシュすれば、今度こそVercelでビルドが通るはずです！
