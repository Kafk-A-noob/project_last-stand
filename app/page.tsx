"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import OverLayUI from "./components/OverlayUI";

const Scene = dynamic(() => import("./components/Scene"), { ssr: false });

export default function Home() {
  const [color, setColor] = useState("cyan");

  return (
    <main className="h-screen w-full bg-black relative">
      {/* 2D UI Overlay */}
      <OverLayUI>
        <h1 className="text-4x1 font-bold tracking-tighter pointer-events-auto">
          PROJECT: LAST STAND
        </h1>
        {/*下部のボタンエリア*/}
        <div className="flex flex-col md:flex-row gap-4 
        pointer-events-auto items-start md:items-center">
          {/* 色変えボタン実装 */}

          <button
            onClick={() => setColor("cyan")}
            className={`px-4 py-2 rounded-full border transition-all ${
              color === "cyan"
                ? "bg-cyan-500 text-black border-cyan-500"
                : "border-white/20 text-white/50 hover:bg-white/10"
            }`}
          >
            CYAN
          </button>

          <button
            onClick={() => setColor("Crimson")}
            className={`px-4 py-2 rounded-full border transition-all ${
              color === "Crimson"
                ? "bg-pink-500 text-black border-pink-500"
                : "border-white/20 text-white/50 hover:bg-white/10"
            }`}
          >
            RED
          </button>

          <p className="text-sm opacity-50">Debug Mode: Active</p>
        </div>
      </OverLayUI>
        {/* 3Dシーンに色を渡す */}
      {/* 3D Scene */}
      <Scene color={color} />
    </main>
  );
}
