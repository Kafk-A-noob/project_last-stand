# Rewrite Plan: useGLTF Hook

**Date:** 2026-02-13
**Status:** Fixing (Attempt 2)

## 1. 変更理由

手動での `useLoader` + `DRACOLoader` の組み合わせが、エラー時のインスタンス破棄処理でブラウザのWebGLコンテキストを道連れにしている可能性が高いです。
React Three Fiber 公式推奨の `useGLTF` フックに書き換えます。これは内部でキャッシング、クローン、Draco設定などを安全に行ってくれます。

## 2. 修正手順

`src/app/components/canvas/ManualLoader.tsx` を **全面的に書き換えます**。

```tsx
import { useRef, useEffect } from "react";
import { Group, Object3D, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei"; // [New]
import { useStore } from "@/lib/store";

export default function ManualLoader() {
  const meshRef = useRef<Group>(null);
  const targetPath = useStore((state) => state.targetPath);

  // useGLTF: 自動でキャッシュ・Draco対応
  // useDraco="/draco/" を指定することで、DracoLoaderも自動設定されます
  const { scene } = useGLTF(targetPath, "/draco/");

  const updateModel = useStore((state) => state.setModelData);

  useEffect(() => {
    // useGLTF はデフォルトでキャッシュされたシーンを返すため、
    // 安全のためにここでクローンします
    const clonedScene = scene.clone(true);

    if (clonedScene) {
      const meta = clonedScene.userData;
      let vertCount = 0;
      let triCount = 0;

      clonedScene.traverse((obj: Object3D) => {
        if ((obj as Mesh).isMesh) {
          const mesh = obj as Mesh;
          vertCount += mesh.geometry.attributes.position.count;
          triCount += mesh.geometry.index ? mesh.geometry.index.count / 3 : 0;
        }
      });

      updateModel({
        techSpecs: {
          vertices: vertCount,
          triangles: triCount,
          compression: "Draco (Auto)",
        },
      });

      // refにクローンしたシーンを追加
      // ※ <primitive> で object={clonedScene} を使うと再レンダリングでちらつくことがあるため
      // primitive object={scene} ではなく、primitive object={clonedScene} を使う
    }
  }, [scene, updateModel]);

  // Load完了ログ
  console.log("Loaded Scene via useGLTF:", scene);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 2;
      meshRef.current.rotation.y += delta * 3;
      meshRef.current.rotation.z += delta * 1;
    }
  });

  // クローンして描画 ( dispose={null} は念のため残す )
  return <primitive object={scene.clone(true)} ref={meshRef} dispose={null} />;
}

// プリロード（任意）
// useGLTF.preload("/models/React_Logo.glb", "/draco/");
```

で無効化しないと、共有リソースが道連れにされてキャッシュが壊れます。これでおそらく直ります。
