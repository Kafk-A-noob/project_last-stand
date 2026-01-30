"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import InfoPanel from "../ui/InfoPanel";
import { useStore } from "@/lib/store";

// propsの型定義: 子要素(children)を受け取るための定義
interface ViewerLayoutProps {
  children: ReactNode;
}

export default function ViewerLayout({ children }: ViewerLayoutProps) {
  
  // アクション取得
  const setTargetPath = useStore((state) => state.setTargetPath);

  // [TEST] 切り替えテスト用関数
  const handleNext = () => {
    // 実際はリストから次のものを取るが、まずは動作テスト
    console.log("Switching to Radio...");
    // ※ まだファイルがないので404になるが、動作確認としてはOK
    setTargetPath("/models/radio.glb");
  }
  return (
    // relative: 子要素の基準点となる
    // overflow-hidden: 画面外へのはみ出しカット
    <div
      className={cn(
        "relative w-full h-screen bg-black",
        "text-white font-mono",
      )}
    >
      {/* --- LAYER 1: 3D Scene (Background) --- */}
      {/* z-0: 最奥のレイヤー */}
      <div className={cn("absolute inset-0 z-0")}>{children}</div>

      {/* --- LAYER 2: UI Overlay (Foreground) --- */}
      {/* z-10: 手前のレイヤー */}
      {/* pointer-events-none: UIの「余白」へのクリックを無視し、後ろの3Dに貫通 */}
      <div
        className={cn(
          "absolute inset-0 z-10 pointer-events-none",
          "flex flex-col justify-between p-6 md:p-12",
        )}
      >
        {/* Header / Footer */}

        {/* --- HEADER --- */}
        {/* pointer-events-auto: ここだけクリック判定を復活させる */}
        <header
          className={cn(
            "pointer-events-auto flex justify-between",
            "items-start",
          )}
        >
          <div>
            <h1
              className={cn(
                "text-2xl md:text-4xl font-bold",
                "tracking-widest border-b-2 border-cyan-500",
                "pb-2 inline-block",
              )}
            >
              PROJECT:LAST STAND
            </h1>
            <p className={cn("mt-2 text-xs md:text-sm text-cyan-500/80")}>
              {"// TERMINAL_ACCESS: GRANTED"} <br /> {"// USER: KafkA"}
            </p>
          </div>
          {/* 右側: 情報パネル (ここに追加！) */}
          <InfoPanel />
        </header>

        {/* --- FOOTER --- */}
        {/* pointer-events-auto: 【重要】ボタン等があるため判定を復活 */}
        <footer className={cn("pointer-events-auto")}>
          <div
            className={cn(
              "flex flex-col md:flex-row gap-4 items-center",
              "justify-between bg-black/40 backdrop-blur-md p-4 rounded-lg",
              "border border-white/10",
            )}
          >
            {/* 座標情報 (飾り) */}
            <div className={cn("text-xs text-gray-400 font-mono")}>
              <p>COORD: 35.6895° N, 139.6917° E</p>
            </div>

            {/* 操作ボタン */}
            <div className={cn("flex gap-4")}>
              <button // onClick={handlePrev}
                className={cn(
                  "px-6 py-2 bg-white/5",
                  "hover:bg-cyan-500/20 text-cyan-200 border",
                  "border-white/10 hover:border-cyan-500/50 rounded",
                  "transition-all active:scale-95",
                )}
              >
                [ <span className="text-cyan-500">PREV</span> ]
              </button>
              <button onClick={handleNext}
                className={cn(
                  "px-6 py-2 bg-white/5",
                  "hover:bg-cyan-500/20 text-cyan-200 border",
                  "border-white/10 hover:border-cyan-500/50 rounded",
                  "transition-all active:scale-95",
                )}
              >
                [ <span className="text-cyan-500">NEXT</span> ]
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
