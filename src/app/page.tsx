"use client";

import dynamic from "next/dynamic";
import ViewerLayout from "./components/layout/ViewerLayout";
import { ErrorBoundary } from "react-error-boundary";

// Sceneは重いのでSSR(サーバーレンダリング)を無効化して読み込む
const Scene = dynamic(() => import("./components/canvas/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    // <ViewerLayout> で包む
    <ViewerLayout>
      <ErrorBoundary fallback={<div 
      className="text-red-500 p-12">
        System Failure: Visual Module Crashed.</div>}>
      <Scene />
      </ErrorBoundary>
    </ViewerLayout>
  );
}
