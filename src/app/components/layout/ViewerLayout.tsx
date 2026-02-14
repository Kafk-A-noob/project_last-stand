"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import InfoPanel from "../ui/InfoPanel";
import { useStore } from "@/lib/store";
import NavigationMenu from "../ui/NavigationMenu";

// propsの型定義: 子要素(children)を受け取るための定義
interface ViewerLayoutProps {
  children: ReactNode;
}

export default function ViewerLayout({ children }: ViewerLayoutProps) {
  // アクション取得(既存の setTargetPath はもう使わないかも)
  // const setTargetPath = useStore((state) => state.setTargetPath);
  const currentModel = useStore((state) => state.currentModel);
  const goToNext = useStore((state) => state.goToNext);
  const goToPrev = useStore((state) => state.goToPrev);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* [TEST] 切り替えテスト用関数
  const handleNext = () => {
    // 実際はリストから次のものを取るが、まずは動作テスト
    console.log("Switching to Radio...");
    // ※ まだファイルがないので404になるが、動作確認としてはOK
    setTargetPath("/models/radio.glb");
  };
  */
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
      {/* pointer-events-none: UIの余白へのクリックを無視、後ろの3Dに貫通 */}
      <div
        className={cn(
          "absolute inset-0 z-10 pointer-events-none",
          "flex flex-col justify-between p-6 md:p-12",
        )}
      >
        {/* Header / Footer */}

        {/* --- HEADER --- */}
        {/* pointer-events-auto: ここだけクリック判定を復活 */}
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
              PROJECT: <br className="md:hidden" />LAST STAND
            </h1>
            <p className={cn("mt-2 text-xs md:text-sm text-cyan-500/80")}>
              {"// TERMINAL_ACCESS: GRANTED"} <br /> {"// USER: KafkA"}
            </p>
          </div>
        </header>

        {/* --- INFO PANEL LAYER (Absolute) --- */}
        {/* z-20: Header(z-10)より手前。pointer-events-autoでクリック可能 */}
        <div className={cn("absolute top-32 right-6 z-20",
        "md:top-24 md:right-12 pointer-events-auto")}>
        <InfoPanel />
        </div>

        {/* --- FOOTER --- */}
        {/* pointer-events-auto: ボタン等があるため判定を復活 */}
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

            {/* 操作ボタン(Footer) */}
            <div className={cn("flex gap-4")}>
              {/* [ < ] Prev Button */}
              <button
                onClick={() => {
                  goToPrev();
                }}
                className={cn(
                  "px-4 py-2 text-xs border-white/10 rounded",
                  "hover:bg-cyan-500/20 hover:border-cyan-500/50",
                  "transition-all active:scale-95",
                )}
              >
                {"<"}
              </button>

              {/* [ Label ] Current Item Name */}
              <div
                className={cn(
                  "text-xs text-cyan-200 font-bold min-w-[100px] text-center",
                  "flex items-center justify-center pt-0.5"
                )}
              >
                {/* モデルがロードされるまでは Loading... と表示 */}
                {currentModel ? currentModel.name : "LOADING..."}
              </div>

              {/* [ > ] Next Button */}
              <button
                onClick={() => {
                  goToNext();
                }}
                className={cn(
                  "px-4 py-2 text-xs border-white/10 rounded",
                  "hover:bg-cyan-500/20 hover:border-cyan-500/50",
                  "transition-all active:scale-95",
                )}
              >
                {">"}
              </button>

              {/* [ Menu ] Button (Placeholder) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className={cn(
                  "px-4 py-2 text-xs border-white/10 rounded",
                  "hover:bg-cyan-500/20 hover:border-cyan-500/50",
                  "transition-all active:scale-95",
                )}
              >
                [MENU]
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && <NavigationMenu onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}
