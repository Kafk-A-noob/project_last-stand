# How-To: UI Tuning (Compact Mode)

**Date:** 2026-02-09
**Target:** `src/app/components/layout/ViewerLayout.tsx`

> [!TIP]
> **「余白がデカすぎる」問題の修正**
> 画面を広く使うため、フッターの余白（Padding）を削ります。
> 数値をいじって、好みのサイズ感を探してみてください。

## 修正箇所

### 1. フッター全体の余白を削る

コンテナ (`footer` タグの中の `div`) の `p-4` (16px) を `p-2` (8px) にします。

```tsx
// Before (82行目付近)
"justify-between bg-black/40 backdrop-blur-md p-4 rounded-lg",

// After (手入力)
"justify-between bg-black/40 backdrop-blur-md p-2 rounded-lg",
```

### 2. ボタンのデカさを削る

ボタン (`button` タグ) の `px-6` (24px) / `py-2` (8px) を半分くらいにします。

```tsx
// Before (106行目付近)
"px-6 py-2 text-xs border rounded transition-all",

// After (手入力)
"px-3 py-1 text-xs border rounded transition-all",
```

### 3. (Option) 文字サイズを極限まで小さくする

もしそれでも邪魔なら、`text-xs` (12px) を `text-[10px]` にします。

```tsx
"px-3 py-1 text-[10px] border rounded transition-all",
```

---

**確認:**
これで「モデルが見やすくなった」と感じれば成功です。
「小さすぎて押せない」と感じたら、数値を戻してください。
