"use client";

import { Html, useProgress } from "@react-three/drei";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

// Html: 3Dキャンバスの中にHTML要素(divなど)を浮かべるためのコンポーネント
// useProgress: 現在のロード進捗率(progress)などを提供するフック

export default function SmartLoader() {
  // loaded: 読み込み済みバイト数
  // total: 全体のバイト数
  // progress: 0~100の進捗率
  const { progress, loaded, total } = useProgress();
  const currentModel = useStore((state) => state.currentModel);
  const manualSize = currentModel?.techSpecs?.fileSize;
  // ヘルパー関数: バイト数を "XX.XX MB" という文字列に変換
  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  /*
[Logic] 分母(Total)の表示決定
手動サイズがあるならそれを使う。
なければ auto total を使う（0なら表示しない）
*/
  const displayTotal = manualSize ? manualSize : total > 0 ? toMB(total) : null;

  return (
    <Html center>
      {/* Important!
        opacity-0: 最初は透明
        animate-[fadeIn_0.5s_ease-in_forwards]: フェードインアニメ
        delay-500: 500ms待機 
      */}
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
        {/* 表示ロジック */}
        <div className="flex gap-2 items-baseline">
          {/* ロード済み (分子) */}
          <span className="text-cyan-400 font-bold">
            {toMB(loaded)}
            MB
          </span>

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
