"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import ManualLoader from "./ManualLoader";
import SmartLoader from "../ui/SmartLoader";

export default function Scene() {
  const targetPath = useStore((state) => state.targetPath);
  return (
    <Canvas>
      {/* Unity: Directional Light */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* モデル読み込み (Suspense: 非同期処理の基本作法) */}
      <Suspense fallback={<SmartLoader />}>

      {/* ↓ ここでエラーを捕まえる */}
      <ErrorBoundary
      resetKeys={[targetPath]}
        fallback={
          <div
            className={cn(
              "absolute top-1/2 left-1/2",
              "transform -translate-x-1/2 -translate-y-1/2",
              "text-red-500 font-mono text-xs bg-black/80 p-4",
              "border border-red-500 rounded pointer-events-none",
            )}
          >
            WARNING: VISUAL MODULE OFFLINE. <br />
            (Model data not found or corrupted)
          </div>
        }
      >
      {/* 以前のCube・ReactLogoは.mdで除外 */}
        <ManualLoader />
      </ErrorBoundary>
      </Suspense>

      {/* カメラ操作 */}
      {/* 
      enablePan={false}: 平行移動（右ドラッグ）を禁止。
      これで「モデルが画面外に行ってしまう」事故を防ぎ、
      常にモデルを中心に回転するように強制。
      */}
      <OrbitControls makeDefault enablePan={false} />
    </Canvas>
  );
}
