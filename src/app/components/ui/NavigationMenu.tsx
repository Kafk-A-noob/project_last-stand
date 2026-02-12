
"use client";
import { cn } from "@/lib/utils";
import { ASSET_MANIFEST } from "@/config/asset-manifest";
import { useStore } from "@/lib/store";

interface NavigationMenuProps {
  onClose: () => void; // 閉じるための関数を親から受け取る
}

export default function NavigationMenu({ onClose }:
  NavigationMenuProps) {
    const setTargetPath = useStore((state) => state.setTargetPath);
    const currentPath = useStore((state) => state.targetPath);

    return (
      // 背景 (黒の半透明)
      <div className={cn("fixed inset-0 z-50 bg-black/90",
        "pointer-events-auto",
        "text-white p-8 overflow-y-auto",)}>
          {/* 閉じるボタン (右上) */}
          <div className="flex justify-end mb-8">
            <button
              onClick={onClose}
              className={cn("px-4 py-2 border",
                "border-white/20 rounded hover:bg-white/10")}
            >
              [CLOSE]
            </button>
          </div>

          {/* グリッド一覧 */}
          <div className={cn("grid grid-cols-2 md:grid-cols-4",
          "gap-4 max-w-4xl mx-auto")}>
            {ASSET_MANIFEST.map((item) => {
              const isLocked = !item.active;
              const isActive = item.path === currentPath;

              return (
                <button
                key={item.id}
                disabled={isLocked}
                onClick={() => {
                  if (!isLocked) {
                    setTargetPath(item.path);
                    onClose(); // 選択したら閉じる
                  }
                }}
                className={cn(
                  "aspect-square border rounded p-4 flex flex-col",
                  "items-center justify-center gap-2 transition-all",
                  // Active(選択中)
                  isActive
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-white/10",
                  // Hover
                  !isLocked &&
                    !isActive &&
                    "hover:bg-white/5 hover:border-white/30",
                  // Locked
                  isLocked && "opacity-30 cursor-not-allowed bg-black/50",
                )}
                >
                  <div className="text-xl font-bold">
                    {isLocked ? "?" : item.name[0]} {/* 頭文字を表示 */}
                  </div>
                  <div className="text-xs text-center">{item.name}</div>
                  {isLocked && (
                    <div className="text-[10px] text-red-500">OFFLINE</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
  )}