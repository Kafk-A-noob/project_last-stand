"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import ManualLoader from "./ManualLoader";
import SmartLoader from "../ui/SmartLoader";

export default function Scene() {
  const targetPath = useStore((state) => state.targetPath);
  // ロード完了フラグを取得
  const isLoaded = useStore((state) => state.isLoaded);
  return (
    <Canvas>
      {/* Unity: Directional Light */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* 2. 環境マップの追加 (AmbientLightの下あたり) */}
      {/* cityプリセットを使い、background={false} で背景自体は非表示にする */}
      <Environment preset="city" background={false} />

      <Suspense fallback={<SmartLoader />}>
        <ErrorBoundary
          resetKeys={[targetPath]}
          fallbackRender={({ error }: { error: any }) => (
            <Html center>
              <div
                className={cn(
                  "bg-black/80 p-4 border border-red-500 rounded",
                  "text-red-500 font-mono text-xs text-center pointer-events-none",
                  "whitespace-pre-wrap max-w-[300px]",
                )}
              >
                WARNING: VISUAL MODULE OFFLINE. <br />
                (Model data not found or corrupted)
                <p className="mt-2 opacity-50 text-[10px]">{error.message}</p>
              </div>
            </Html>
          )}
        >
          <ManualLoader />
        </ErrorBoundary>
      </Suspense>

      {/* カメラ操作 */}
      {/* 
      enablePan={false}: 平行移動（右ドラッグ）を禁止。
      これで「モデルが画面外に行ってしまう」事故を防ぎ、
      常にモデルを中心に回転するように強制。
      */}
      {isLoaded && <OrbitControls makeDefault enablePan={false} />}
    </Canvas>
  );
}
