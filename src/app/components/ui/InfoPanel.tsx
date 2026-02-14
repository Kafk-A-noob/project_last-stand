"use client";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function InfoPanel() {
  const { currentModel, isLoaded } = useStore();

  if (!currentModel) return null; // データが無ければ何も表示しない

  return (
    <div
      className={cn(
        "bg-black/80 border-l-2 border-cyan-500 p-4 text-cyan-500",
        "font-mono text-sm w-64 backdrop-blur-sm",
      )}
    >
      {/* Narrative Section */}
      <h2 className="text-lg font-bold mb-1 text-white">{currentModel.name}</h2>
      <div className="text-xs text-gray-400 mb-4 italic">
        &quot;{currentModel.quote}&quot;
      </div>
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
  );
}
