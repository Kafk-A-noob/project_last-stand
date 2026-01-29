"use client";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function InfoPanel() {
  const { currentModel,  isLoaded } = useStore();

  if (!isLoaded || !currentModel) return null;// データが無ければ何も表示しない

  return (
    <div className={cn(
      "bg-black/80 border-l-2 border-cyan-500 p-4 text-cyan-500",
      "font-mono text-sm w-64 backdrop-blur-sm")}>
      <h2 className="text-lg font-bold mb-2 text-white">
        {currentModel.name}
      </h2>
      <div className="space-y-1 opacity-80">
        <p>TECH: {currentModel.tech}</p>
        <p>VERT: {currentModel.vertices.toLocaleString()}</p>
        <p>TRIS: {currentModel.triangles.toLocaleString()}</p>
      </div>
      <p className={cn("mt-4 pt-4 border-t border-cyan-500/30",
       "text-xs text-gray-300")}>
        {currentModel.description}
      </p>
    </div>
  )
}