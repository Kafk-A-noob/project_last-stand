"use client";

import dynamic from "next/dynamic";
// 新しいレイアウトをインポート
import ViewerLayout from "./components/ViewerLayout";

// Sceneは重いのでSSR(サーバーレンダリング)を無効化して読み込む
const Scene = dynamic(() => import("./components/Scene"), { ssr: false });

export default function Home() {
  return (
    // <ViewerLayout> で包むだけで、あのSF風UIが適用されます
    <ViewerLayout>
      <Scene />
    </ViewerLayout>
  );
}
