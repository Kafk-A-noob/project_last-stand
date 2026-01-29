# Mission: 次元を超えろ (Weapon: Zustand)

**「Canvasの中（3D）」と「Canvasの外（HTML）」は、別世界です。**
`ManualLoader` (3D側) で取得したデータを、`InfoPanel` (2D側) に表示するには、この「次元の壁」を超えるための **「架け橋（Bridge）」** が必要です。

React標準の `Context` でも可能ですが、Web3D界隈ではより高速で簡潔な **Zustand** がデファクトスタンダードです。これを使います。

## 1. 必要なもの

```bash
npm install zustand
```

## 2. 架け橋を作る (Store)

データを入れておく「箱」をグローバルな場所に作ります。

**File:** `lib/store.ts` (新規作成)

```typescript
import { create } from 'zustand';

// データの型定義
type ModelData = {
  name: string;        // 名前
  description: string; // 説明文
  tech: string;        // 使用技術
  vertices: number;    // 頂点数
  triangles: number;   // 三角面数
}

// ストアの型定義
interface AppState {
  // 状態 (State)
  isLoaded: boolean;
  currentModel: ModelData | null;
  
  // アクション (Actions)
  setModelData: (data: ModelData) => void;
  resetModelData: () => void;
}

// ストア作成
export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  currentModel: null,

  setModelData: (data) => set({ isLoaded: true, currentModel: data }),
  resetModelData: () => set({ isLoaded: false, currentModel: null }),
}));
```

## 3. データを渡す (Sender: ManualLoader)

ロードが完了した瞬間に、ストアへデータを書き込みます。

**File:** `app/components/ManualLoader.tsx`

```tsx
import { useStore } from "@/lib/store";
import { useEffect } from "react";

// ...

// useLoaderの後ろあたりで...
const setModel = useStore((state) => state.setModelData);

useEffect(() => {
  if (gltf) {
    // BlenderのCustom Propertiesは userData に入る
    const meta = gltf.scene.userData; 
    
    // 頂点数カウント (簡易版)
    let vertCount = 0;
    let triCount = 0;
    
    gltf.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        vertCount += obj.geometry.attributes.position.count;
        triCount += obj.geometry.index ? obj.geometry.index.count / 3 : 0;
      }
    });

    // ストアに保存
    setModel({
      name: meta.name || "Unknown Model",
      description: meta.description || "No description available.",
      tech: meta.tech || "Standard glTF",
      vertices: vertCount,
      triangles: triCount,
    });
  }
}, [gltf, setModel]);
```

## 4. データを受け取る (Receiver: InfoPanel)

ストアからデータを読み取って表示します。

**File:** `app/components/InfoPanel.tsx`

```tsx
"use client";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function InfoPanel() {
  const { currentModel, isLoaded } = useStore();

  if (!isLoaded || !currentModel) return null; // データが無ければ何も表示しない

  return (
    <div className={cn(
      "bg-black/80 border-l-2 border-cyan-500 p-4 text-cyan-500 font-mono text-sm",
      "w-64 backdrop-blur-sm"
    )}>
      <h2 className="text-lg font-bold mb-2 text-white">{currentModel.name}</h2>
      <div className="space-y-1 opacity-80">
        <p>TECH: {currentModel.tech}</p>
        <p>VERT: {currentModel.vertices.toLocaleString()}</p>
        <p>TRIS: {currentModel.triangles.toLocaleString()}</p>
      </div>
      <p className="mt-4 pt-4 border-t border-cyan-500/30 text-xs text-gray-300">
        {currentModel.description}
      </p>
    </div>
  );
}
```

---

### 実践

1. `npm install zustand`
2. `lib/store.ts` 作成
3. `ManualLoader.tsx` 修正 (送信側)
4. `InfoPanel.tsx` 作成 (受信側)
5. `ViewerLayout.tsx` などのOverLayレイヤーに `<InfoPanel />` を配置

ここまでやると、画面右下などにカッコいいパネルが出るはずです（ただしデータはまだ空っぽかUnknownです）。
配置まで終わったら教えてください。最後に **Blender側** の設定をやります！
