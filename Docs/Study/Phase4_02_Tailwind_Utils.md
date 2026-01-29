# Mission: Tailwind CSS 可読性向上 (Weapon: cn)

**鋭いご指摘、ありがとうございます。**
長くなったclassNameを整理し、かつ安全に結合するための「最強のユーティリティ関数」を実装します。
これはReact × Tailwindのプロジェクトでは **「三種の神器」** と言われるほど必須のテクニックです。

## 1. 必要なもの

以下の2つのライブラリをインストールします。

- **clsx:** 条件分岐でクラスを付け外しするツール。
- **tailwind-merge:** 「`bg-red-500` と `bg-blue-500`」がぶつかった時に、後ろの方を優先させてくれるツール（これがないとスタイルがバグります）。

### Step 1: インストール

ターミナルで以下を実行してください。

```bash
npm install clsx tailwind-merge
```

## 2. 実装するファイル

プロジェクト全体で使う便利な関数なので、`lib` というフォルダを作ってそこに置くのが通例です。

**File:** `lib/utils.ts` (新規作成)

### Step 2: コードの実装

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * クラス名を結合・最適化するユーティリティ
 * 例: cn("bg-red-500", isError && "text-white", "bg-blue-500")
 * 結果: "text-white bg-blue-500" (赤が青に上書きされ、警告も消える)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 3. 使ってみる

`SmartLoader.tsx` をスッキリさせましょう。

**Before:**

```tsx
<div className="text-white font-mono opacity-0 animate-[fadeIn_0.5s_ease-in_forwards] delay-500">
```

**After:**

```tsx
import { cn } from "@/lib/utils";

// ...

<div className={cn(
  "text-white font-mono",
  "opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]",
  "delay-500" // 将来ここを条件分岐 (isLoading ? "delay-500" : "") にもしやすい
)}>
```

---

### 実践

1. コマンドでライブラリをインストール。
2. `lib/utils.ts` を作成。
3. `SmartLoader.tsx` に `cn` を導入してリファクタリング。

ここまで完了したら教えてください！
