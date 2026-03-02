import { create } from 'zustand';
import { ASSET_MANIFEST } from '@/config/asset-manifest';

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
  path: string;   // e.g. "/models/radio.glb"
  camPos?: [number, number, number]; // ベストアングル
  rotationSpeed?: [number, number, number]; // 自動回転速度 [x, y, z]

  // 個別のトランスフォーム設定
  scale?: [number, number, number];    // 例: [2, 2, 2]
  position?: [number, number, number]; // 例: [0, -1, 0]
  rotation?: [number, number, number]; // 例: [Math.PI / 4, 0, 0] (静的な初期角度)

  // Tech Specs (The Flex)
  techSpecs?: {
    vertices?: number;
    triangles?: number;
    compression?: string; // "Draco" or "None"
    fileSize?: string;
  };
};

// ストアの定義
interface AppState {
  // 状態(State)
  isLoaded: boolean;
  currentModel: ArchiveItem | null; // パネル表示用データ

  // 制御用
  targetPath: string;
  setTargetPath: (path: string) => void;
  setIsLoaded: (status: boolean) => void;// ロード状態だけを操作する

  // アクション(Action)
  setModelData: (data: Partial<ArchiveItem>) => void;
  resetModelData: () => void;

  // Next/Prev Actions
  goToNext: () => void;
  goToPrev: () => void;
}

// ストア作成
// 初期ロード時に最初のactiveなアイテムを探す
const initialItem = ASSET_MANIFEST.find((item) => item.active) || ASSET_MANIFEST[0];

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  currentModel: initialItem, // activeな最初のアイテム

  targetPath: initialItem.path,
  setTargetPath: (path) => {
    // パスから次のモデルデータを探す
    const target = ASSET_MANIFEST.find((item) => item.path === path);

    // パス変更と同時にモデルデータも更新してしまう (ロードを待たない)
    set({ targetPath: path, currentModel: target || null, isLoaded: false });
  },

  setModelData: (data) => set((state) => ({
    isLoaded: true,
    currentModel: state.currentModel ? {...state.currentModel, ...data} : null
  })),
  resetModelData: () => set({ isLoaded: false, currentModel: null }),
  // [New] ロード状態のみ更新するアクション
  setIsLoaded: (status) => set({ isLoaded: status }),

  goToNext: () => {
    // 現在のステート取得
      set((state) => {
        // activeなアイテムのみのリストを作る
      const activeItems = ASSET_MANIFEST.filter((item) => item.active);
      if (activeItems.length === 0) return state;
      //現在のインデックスを探す
      const currentIndex = activeItems.findIndex(
        (item) => item.path === state.targetPath,
      );
      // 次のインデックスを計算
      const nextIndex = (currentIndex + 1) % activeItems.length;
      // 次のアイテムデータを確定させる
      const nextItem = activeItems[nextIndex];
      // 新しいパスをセット
      return {
        targetPath: nextItem.path,
        currentModel: nextItem,// ここで即座にUIを更新(Optimistic Update)
        isLoaded: false
      };
    });
  },

  goToPrev: () => {
    set((state) => {
      const activeItems = ASSET_MANIFEST.filter((item) => item.active);
      if (activeItems.length === 0) return state;

      const currentIndex = activeItems.findIndex(
        (item) => item.path === state.targetPath,
      );

      // 前のインデックスを計算
        // Tip:(currentIndex - 1 + length) % length で負の値を防ぐ
      const previndex = 
      (currentIndex - 1 + activeItems.length) % activeItems.length;
      // 前のアイテムデータを確定
      const prevItem = activeItems[previndex];

      return {
        targetPath: prevItem.path,
        currentModel: prevItem, // 即UI更新
        isLoaded: false
      };
    })
  },
}));