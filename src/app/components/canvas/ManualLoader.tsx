import { useRef, useEffect } from "react";
import { Group, Object3D, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useStore } from "@/lib/store";

export default function ManualLoader() {
  const meshRef = useRef<Group>(null);
  const targetPath = useStore((state) => state.targetPath);
  const currentModel = useStore((state) => state.currentModel);
  const updateModel = useStore((state) => state.setModelData);

  // useGLTF: 自動でキャッシュ・Draco対応
  const { scene } = useGLTF(targetPath, "/draco/");

  useEffect(() => {
    // クローンして使用
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
    }
  }, [scene, updateModel]);

  // Load完了ログ
  console.log("Loaded Scene via useGLTF:", scene);

  useFrame((state, delta) => {
    // 個別の回転速度が定義されている場合のみ回転させる
    const speed = currentModel?.rotationSpeed;
    if (meshRef.current && speed) {
      meshRef.current.rotation.x += delta * speed[0];
      meshRef.current.rotation.y += delta * speed[1];
      meshRef.current.rotation.z += delta * speed[2];
    }
  });

  // クローンして描画 + dispose={null}
  // ここで clone(true) しないとキャッシュ本体が使われてしまい、Context Lostの原因になる
  return <primitive object={scene.clone(true)} ref={meshRef} dispose={null} />;
}
