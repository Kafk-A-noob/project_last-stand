# 作業ログ: SmartLoader UI Fix

**日付:** 2026-02-16
**Status:** Done
**Type:** Manual Coding Training

## 1. 目的

`SmartLoader` のロード進捗表示で、`content-length` ヘッダーが取得できない場合に「0 / 0 MB」という不適切な表示になる問題を解決する。

## 2. 解決策

Asset Bundle System (Unity) のように、マニフェスト側でファイルサイズを手動定義し、それを表示に使用するフォールバックロジックを実装する。

## 3. 実装手順 (Manual Execution)

以下のコードを参考に、`src/app/components/ui/SmartLoader.tsx` を編集してください。

### [Diff] SmartLoader.tsx

```tsx
"use client";

import { Html, useProgress } from "@react-three/drei";
import { cn } from "@/lib/utils";
// [New] Storeへのアクセスを追加
import { useStore } from "@/lib/store";

export default function SmartLoader() {
  const { progress, loaded, total } = useProgress();

  // [New] 現在のアクティブなモデルデータを取得
  const currentModel = useStore((state) => state.currentModel);
  // [New] マニフェストに書いた手動サイズ ("0.07 MB" とか)
  const manualSize = currentModel?.techSpecs?.fileSize;

  // バイト数をMB変換する関数
  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  // [Logic] 分母(Total)の表示決定
  // 手動サイズがあるならそれを使う。なければ auto total を使う（0なら表示しない）
  const displayTotal = manualSize
    ? manualSize
    : total > 0
      ? `${toMB(total)} MB`
      : null;

  return (
    <Html center>
      <div
        className={cn(
          "text-white font-mono",
          "text-xl bg-black/50 p-4 border border-white/20",
          "backdrop-blur-md opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]",
        )}
        style={{ animationDelay: "500ms" }}
      >
        <div className={cn("text-xs text-gray-400 mb-1")}>
          LOADING ASSETS...
        </div>

        {/* [Change] 表示ロジックの変更 */}
        <div className="flex gap-2 items-baseline">
          {/* ロード済み (分子) */}
          <span className="text-cyan-400 font-bold">{toMB(loaded)} MB</span>
          {/* スラッシュと合計 (分母) - 存在する場合のみ */}
          {displayTotal && (
            <span className="text-gray-500 text-sm">/ {displayTotal}</span>
          )}
        </div>

        {/* 進捗率 (0-100%) */}
        <div className="text-right text-xs mt-1 text-cyan-600">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}
```

## 4. 解説 (Technical Note)

- **`useStore` hook:**
  - Unityでいう `Singleton` や `GameManager` に近いです。アプリ全体のデータ（現在どのモデルを表示中か）にアクセスするために使用します。
- **Conditional Rendering (`displayTotal`):**
  - 三項演算子 (`? :`) を使い、「手動サイズがあればそれを、なければ自動計算を使う」というロジックを1行で記述しています。
  - さらに、`total` が 0 の場合は分母を表示しない (`null`) ことで、不格好な「/ 0 MB」を防ぎます。
