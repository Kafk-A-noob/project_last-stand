"use client";

import { Html, useProgress } from "@react-three/drei";
import { cn } from "@/lib/utils";

// Html: 3Dキャンバスの中にHTML要素(divなど)を浮かべるためのコンポーネント
// useProgress: 現在のロード進捗率(progress)などを提供するフック

export default function SmartLoader() {
  // loaded: 読み込み済みバイト数
  // total: 全体のバイト数
  // progress: 0~100の進捗率
  const { progress, loaded, total } = useProgress();

  // ヘルパー関数: バイト数を "XX.XX MB" という文字列に変換
  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  return (
    <Html center>
      {/* Important!
        opacity-0: 最初は透明
        animate-[fadeIn_0.5s_ease-in_forwards]: フェードインアニメ
        delay-500: 500ms待機 
      */}
      <div className={cn("text-white font-mono",
      "text-xl bg-black/50 p-4 border border-white/20",
      "backdrop-blur-md opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]")}
        style={{animationDelay: "500ms"}}>


      <div className={cn("text-xs text-gray-400 mb-1")}>LOADING ASSETS...</div>
      {toMB(loaded)} MB / {toMB(total)} MB ({progress.toFixed(0)}%)
      </div>
    </Html>
  );
}