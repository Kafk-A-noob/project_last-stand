"use client";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "react-error-boundary";

// Sceneの遅延読み込み (SSR無効化)
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function ViewCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <ErrorBoundary
        fallback={
          <div className="text-red-500 p-12">
            System Failure: Visual Module Crashed.
          </div>
        }
      >
        <Scene />
      </ErrorBoundary>
    </div>
  );
}
