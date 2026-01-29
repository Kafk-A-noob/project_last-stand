# Phase 3 Advanced: System Architecture Master Guide

**テーマ:** "The Bridge between Two Worlds" (Web & 3D)

このドキュメントは、Phase 3.4で構築したシステムの技術的な解説を統合したものです。
Canvas内の3Dロジックと、Canvas外の2D UIをどのように連携させ、スタイリングし、ローディング制御しているかを解説します。

---

## Chapter 1: 次元を超える架け橋 (State Bridge)
>
> Source: `Phase3.4_03_State_Bridge.md`

### 1.1 The Problem

React Three Fiber (R3F) の `<Canvas>` 内は独立したレンダリングコンテキストを持ちます。
そのため、Canvas内の `ManualLoader` が「ロード完了」を知っても、Canvas外の `InfoPanel` や `SmartLoader` はそれを知る術がありません。
React標準の `Context` や Propsバケツリレーでも解決できますが、より高速で簡潔な解法が必要です。

### 1.2 The Solution: Zustand

**Zustand** は、Hooksベースの超軽量グローバルステート管理ライブラリです。
これを「架け橋」として利用します。

```typescript
// src/lib/store.ts
export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  currentModel: null, // ArchiveItem型
  setModelData: (data) => set({ isLoaded: true, currentModel: data }),
}));
```

### 1.3 Implementation Pattern

1. **Sender (3D Side):** `ManualLoader.tsx` がロード完了時に `setModelData(data)` を呼ぶ。
2. **Receiver (UI Side):** `InfoPanel.tsx` が `useStore()` でデータを監視し、変更があれば自動再描画する。

これにより、3D空間の出来事が瞬時に2D UIに反映される「リアクティブな連携」が実現します。

---

## Chapter 2: 高級なローディング体験 (Smart Loader)
>
> Source: `Phase3.4_01_SmartLoader.md`

### 2.1 The Philosophy: "Anti-Flicker"

ローディング画面は「あればいい」ものではありません。
「0.1秒しか表示されないローディング」は、ユーザーにとって「画面がチカッとしたバグ (Flicker)」に見えます。
高級車のドアのように、動作には「重み」と「タメ」が必要です。

### 2.2 The Debounce Trick

CSSの `animation-delay` を利用したトリックを使います。

1. **Wait:** `delay-500` (500ms待機)
2. **Hidden:** `opacity-0` (その間は透明)
3. **Show:** `fadeIn` (500ms経過後に初めて表示)

```tsx
<div className={cn(
  "opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]",
  "delay-500" // 500ms未満でロードが終われば、このdivは表示される前に消滅する
)}>
```

- **ロードが速い場合:** 何も表示されず、即座にコンテンツが出る（理想的）。
- **ロードが遅い場合:** 0.5秒後から優雅にフェードインする。

---

## Chapter 3: スタイリングの武器 (Tailwind Utils)
>
> Source: `Phase3.4_02_Tailwind_Utils.md`

### 3.1 The Tool: `cn` (Class Name)

Tailwind CSSを使うと、クラス名が非常に長くなり、条件分岐での結合が汚くなりがちです。
また、`bg-red-500` と `bg-blue-500` が競合した時、単なる文字列結合ではどちらが勝つか保証されません。

### 3.2 Implementation

`clsx` (条件分岐) と `tailwind-merge` (競合解決) を組み合わせたユーティリティ関数 `cn` を実装します。

```typescript
// src/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3.3 Usage

```tsx
<div className={cn(
  "text-white bg-black",         // Base styles
  isError && "bg-red-500",       // Conditional: blackをredで安全に上書き
  className                      // External overrides
)}>
```

これ無しでのモダン開発は考えられません。
