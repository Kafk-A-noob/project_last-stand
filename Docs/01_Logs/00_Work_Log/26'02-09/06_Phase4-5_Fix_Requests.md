# Fix Request: ViewerLayout Integration & Typo Fix

**Date:** 2026-02-09
**Target:** `src/app/components/layout/ViewerLayout.tsx`

実装ありがとうございます！
`NavigationMenu.tsx` は完璧です。
しかし、`ViewerLayout.tsx` にいくつか**惜しい点（忘れ物とタイプミス）**がありました。

これらを修正すれば、Phase 4.5 は完全コンプリートです！

## 1. 忘れ物: メニューの統合 (Integration)

メニューを作りましたが、まだ画面に表示する処理が入っていません。
以下の3ステップを追加してください。

### Step A: ImportとStateの追加 (上の方)

```tsx
"use client";

import { ReactNode, useState } from "react"; // useState を追加
import { cn } from "@/lib/utils";
import InfoPanel from "../ui/InfoPanel";
import { useStore } from "@/lib/store";
import { ASSET_MANIFEST } from "@/config/asset-manifest";
import NavigationMenu from "../ui/NavigationMenu"; // Import を追加

// ... (中略) ...

export default function ViewerLayout({ children }: ViewerLayoutProps) {
  // ▼ Stateを追加
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentModel = useStore((state) => state.currentModel);
```

### Step B: メニューを表示する (下の方)

`return` の最後、`</div>` の直前に以下を追加します。

```tsx
        </footer>
      </div>

      {/* ▼ 追加: メニューオーバーレイ */}
      {isMenuOpen && (
        <NavigationMenu onClose={() => setIsMenuOpen(false)} />
      )}

    </div>
  );
}
```

### Step C: ボタンを有効にする (真ん中あたり)

`[ MENU ]` ボタンの `onClick` を修正します。

```tsx
                {/* [ Menu ] Button */}
                <button
                  onClick={() => setIsMenuOpen(true)} // ← ここを修正
```

---

## 2. タイプミス: `hober` → `hover`

Tailwindのクラス名で惜しいタイプミスがあります。
`hober` (ほばー) になっているので、 `hover` (はばー) に直してください。
（Prev, Next, Menu の3箇所すべてにあります）

```tsx
// ❌ hober:bg-cyan-500/20
// ⭕ hover:bg-cyan-500/20
```

修正完了後、ブラウザで `[ MENU ]` ボタンを押して動作確認をお願いします！
