import { create } from 'zustand';

// データの型定義
type ModelData = {
  name: string;        // 名前
  description: string; // 説明文
  tech: string;        // 使用技術
  vertices: number;    // 頂点数
  triangles: number;   // 三角面数
}

// ストアの定義
interface AppState {
  // 状態(State)
  isLoaded: boolean;
  currentModel: ModelData | null;

  // アクション(Action)
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