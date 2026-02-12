# Final Fix: Menu Button & Model Path

**Date:** 2026-02-12
**Target:** `src/app/components/layout/ViewerLayout.tsx`, `public/models/`

原因が特定できました。

1. **メニューが開かない:** ボタンの中身が `()` (空っぽ) のままです。
2. **クラッシュする:** コードは `radio.glb` を探していますが、実体は `React_Logo.glb` です。

---

## 1. ViewerLayout.tsx の修正 (Menu Button)

`[MENU]` ボタンの `onClick` が空っぽのまま戻ってしまっています。
これを修正してください。

**Target:** `src/app/components/layout/ViewerLayout.tsx` (130行目付近)

### Before (現在)

```tsx
                <button
                  onClick={() => {}} // ← ここが空っぽ！
                  className={cn(
```

### After (修正後)

```tsx
                <button
                  onClick={() => setIsMenuOpen(true)} // ← これを入れる！
                  className={cn(
```

---

## 2. NavigationMenu.tsx の修正 (Clickable Fix)

メニューが表示されてもクリックできない問題を防ぐため、念の為 `pointer-events-auto` を追加します。

**Target:** `src/app/components/ui/NavigationMenu.tsx` (18行目付近)

```tsx
    return (
      // 背景
      <div className={cn("fixed inset-0 z-50 bg-black/90 pointer-events-auto", // ← 追加
        "text-white p-8 overflow-y-auto",)}>
```

---

## 3. モデルファイルの準備 (Model Rename)

コードは `radio.glb` を読み込もうとして失敗しています。
現在ある `React_Logo.glb` を `radio.glb` にリネーム（名前変更）してください。

**操作:**

1. エクスプローラーで `C:\Users\25R1116\Documents\Project_Last-Stand\project_last-stand\public\models` を開く。
2. `React_Logo.glb` を **`radio.glb`** に名前変更する。

---

### Step 4. Push

最後にこれをGitへPushすれば完了です。

```bash
git add .
git commit -m "fix: Menu button logic & Model rename"
git push origin main
```
