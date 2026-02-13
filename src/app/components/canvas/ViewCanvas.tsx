"use client";

import dynamic from "next/dynamic";

// Sceneの遅延読み込み (SSR無効化)
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function ViewCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Scene />
    </div>
  );
}
