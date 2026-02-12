# Final Fix: Menu Architecture (The Real Solution)

**Date:** 2026-02-12
**Target:** `src/app/components/layout/ViewerLayout.tsx`

`pointer-events` の上書きが環境によって効かないようなので、**「物理的に場所を移動」** させます。
これが最強かつ確実な修正です。

## `ViewerLayout.tsx` の修正

`<NavigationMenu />` を、`pointer-events-none` の `div` の **外** に出します。

### Before (現在)

```tsx
      {/* --- LAYER 2: UI Overlay (Foreground) --- */}
      <div className={cn("absolute inset-0 z-10 pointer-events-none", ...)}>
        <header>...</header>
        <footer>...</footer>

        {/* ここにいるのが間違い */}
        {isMenuOpen && <NavigationMenu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </div>
  );
}
```

### After (修正後)

`</div>` を一つまたいで、外に出してください。

```tsx
      {/* --- LAYER 2: UI Overlay (Foreground) --- */}
      <div className={cn("absolute inset-0 z-10 pointer-events-none", ...)}>
        <header>...</header>
        <footer>...</footer>
      </div> {/* ← ここで UI Overlay を閉じる！ */}

      {/* Menu Overlay (完全に独立させる) */}
      {isMenuOpen && <NavigationMenu onClose={() => setIsMenuOpen(false)} />}

    </div>
  );
}
```

これでメニューは `pointer-events-none` の影響を一切受けなくなります。
確実に直ります。
