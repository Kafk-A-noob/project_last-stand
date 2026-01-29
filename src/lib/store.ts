import { create } from 'zustand';

// データの型定義
export type ArchiveItem = {
  // System
  id: string;          // e.g. "item-001-radio"
  active: boolean;     // 開発中フラグ
  // Narrative (The Soul)
  name: string;        // e.g. "Retro Radio"
  quote: string;       // e.g. "最期まで日常らしい時間を..."
  description: string; // e.g. "いつもの時間、いつものチャンネル。"
  contributor: string; // e.g. "Nana"
  // Asset (The Body)
  modelPath: string;   // e.g. "/models/radio.glb"
  camPos?: [number, number, number]; // ベストアングル
  // Tech Specs (The Flex)
  techSpecs: {
    vertices: number;
    triangles: number;
    compression: string; // "Draco" or "None"
  };
};

// ストアの定義
interface AppState {
  // 状態(State)
  isLoaded: boolean;
  currentModel: ArchiveItem | null;

  // アクション(Action)
  setModelData: (data: ArchiveItem) => void;
  resetModelData: () => void;
}

// ストア作成
export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  currentModel: null,

  setModelData: (data) => set({ isLoaded: true, currentModel: data }),
  resetModelData: () => set({ isLoaded: false, currentModel: null }),
}));