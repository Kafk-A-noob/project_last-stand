"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function InfoPanel() {
  const { currentModel } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentModel) return null; // データが無ければ何も表示しない

  return (
    <div
      onClick={() => setIsOpen(!isOpen)} // タップで開閉
      className={cn(
        "bg-black/80 border-l-2 border-cyan-500 p-4 text-cyan-500",
        "font-mono text-sm w-64 backdrop-blur-sm cursor-pointer transition-colors",
        "hover:bg-black/90 select-none",
      )}
    >
      {/* Name/Quote Section */}
      <h2
        className={cn(
          "text-lg font-bold mb-1 text-white flex",
          "justify-between items-center",
        )}
      >
        {currentModel.name}
        {/* Mobile用の開閉アイコン (PCでは非表示) */}
        <span
          className={cn(
            "text-xs md:hidden transform",
            "transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        >
          ▼
        </span>
      </h2>
      <div className="text-xs text-gray-400 mb-4 italic">
        &quot;{currentModel.quote}&quot;
      </div>

      {/* --- Collapsible Content (詳細情報) --- */}
      {/* md:max-h-none md:opacity-100: PCでは常に表示 */}
      {/* max-h-0 opacity-0: スマホ初期状態は非表示 */}

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen
            ? "max-h-96 opacity-100 mt-4"
            : "max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-4",
        )}
      >
        {/* Tech Spec Section */}
        {currentModel.techSpecs && (
          <div
            className={cn(
              "space-y-1 mb-4 text-xs font-bold border-l-2",
              "border-cyan-500/50 pl-2 text-cyan-400",
            )}
          >
            <p>VERT: {currentModel.techSpecs.vertices.toLocaleString()}</p>
            <p>TRIS: {currentModel.techSpecs.triangles.toLocaleString()}</p>
            <p>COMP: {currentModel.techSpecs.compression}</p>
          </div>
        )}
        {/* Description Section */}
        <p
          className={cn(
            "pt-4 border-t border-cyan-500/30",
            "text-xs text-gray-300 leading-relaxed",
          )}
        >
          {currentModel.description}
        </p>
        <div className="mt-2 text-[10px] text-right text-gray-500">
          Provided by {currentModel.contributor}
        </div>
      </div>
    </div>
  );
}
