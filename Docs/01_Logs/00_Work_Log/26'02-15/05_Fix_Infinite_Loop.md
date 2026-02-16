# Work Log: Fix Infinite Loop in ManualLoader

**Date:** 2026-02-16
**Goal:** `ManualLoader.tsx` で発生している無限ループ（`Maximum update depth exceeded`）を修正する。
**Cause:** `useEffect` の依存配列に `currentModel` が含まれており、その中で `updateModel` を呼ぶことで `currentModel` が更新され、再び `useEffect` が走るという循環参照が発生していた。

## 1. Loader Update (`src/app/components/canvas/ManualLoader.tsx`)

`currentModel` への依存を断ち切るため、ファイルサイズの参照元を Store (`currentModel`) ではなく、定数 (`ASSET_MANIFEST`) に変更します。

### [MODIFY] `src/app/components/canvas/ManualLoader.tsx`

1. `ASSET_MANIFEST` をインポートします。
2. `useEffect` 内で `ASSET_MANIFEST` から該当モデルを探し、その `fileSize` を使います。
3. 依存配列から `currentModel` を削除します。

```typescript
import { useRef, useEffect } from "react";
// ... imports ...
import { useGLTF } from "@react-three/drei";
import { useStore } from "@/lib/store";
// [追加] Manifestを直接読み込む
import { ASSET_MANIFEST } from "@/config/asset-manifest";

export default function ManualLoader() {
  const meshRef = useRef<Group>(null);
  const targetPath = useStore((state) => state.targetPath);
  const currentModel = useStore((state) => state.currentModel);
  const updateModel = useStore((state) => state.setModelData);

  // ... (scale, positionなどはそのまま) ...
  const scale = currentModel?.scale || [1, 1, 1];
  const position = currentModel?.position || [0, 0, 0];

  const { scene } = useGLTF(targetPath, "/draco/");

  useEffect(() => {
    const clonedScene = scene.clone(true);

    if (clonedScene) {
      // 1. ジオメトリ計算
      let vertCount = 0;
      let triCount = 0;

      clonedScene.traverse((obj: Object3D) => {
        if ((obj as Mesh).isMesh) {
          const mesh = obj as Mesh;
          vertCount += mesh.geometry.attributes.position.count;
          triCount += mesh.geometry.index ? mesh.geometry.index.count / 3 : 0;
        }
      });

      // 2. ファイルサイズ取得 (Manifestから直接)
      // StoreのcurrentModelは更新頻度が高いため、依存配列に入れるとループする。
      // 代わりに静的なManifestから探すことでループを防ぐ。
      const manifestItem = ASSET_MANIFEST.find(item => item.path === targetPath);
      const staticFileSize = manifestItem?.techSpecs?.fileSize;

      // 3. 更新
      updateModel({
        techSpecs: {
          vertices: vertCount,
          triangles: triCount,
          compression: "Draco (Auto)",
          fileSize: staticFileSize, // Manifestの値を使う
        },
      });
    }
    // [修正] 依存配列から currentModel を削除し、targetPath等のみにする
  }, [scene, targetPath, updateModel]);

  // ... (以下略) ...
}
```

これで `updateModel` が呼ばれても、`targetPath` が変わらない限り `useEffect` は再実行されず、ループが止まります。
度重なる不手際、誠に申し訳ございません。
