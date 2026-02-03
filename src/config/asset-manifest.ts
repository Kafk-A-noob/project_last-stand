import { ArchiveItem } from "@/lib/store"

// マニフェストの型定義
// 将来的にシーンごとの初期カメラ位置やスケールもここに記述

export type AssetManifestItem = {
  id: string;
  name: string;
  path: string;
};

/*
  ASSET_MANIFEST (The Registry)
  アプリケーションが認識するすべてのモデル定義。
  増やすときはここに行を追加するだけ。
*/
export const ASSET_MANIFEST: AssetManifestItem[] = [
  {
    id: "item-000-logo",
    name: "React Logo",
    path: "models/React_Logo.glb",
  },
  {
    id: "item-001-radio",
    name: "Retro Radio",
    path: "models/radio.glb",
  },
];