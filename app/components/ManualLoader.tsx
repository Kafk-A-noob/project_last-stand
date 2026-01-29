import { useRef, useEffect } from "react";
import { Group } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useStore } from "@/lib/store";

export default function ManualLoader() {
  // Ref(参照)を作成
  const meshRef = useRef<Group>(null);

  // ロード処理
  const gltf = useLoader(
    GLTFLoader,
    "/models/React_Logo.glb", // publicフォルダにある既存のモデルを使用
    (Loader) => {
      // 1. DracoLoaderのインスタンスを作成
      const dracoLoader = new DRACOLoader();

      // 2. デコーダーの場所を指定 (public/draco/)
      dracoLoader.setDecoderPath("/draco/");

      // 3. GLTFLoaderにDracoLoaderを合体
      Loader.setDRACOLoader(dracoLoader);
    },
  );

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

  // Load完了後のデータ構造を確認するためのログ
  console.log("Loaded GLTF:", gltf);

  // フレーム毎の更新処理
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 2;
      meshRef.current.rotation.y += delta * 3;
      meshRef.current.rotation.z += delta * 1;
    }
  });

  // 3D空間に表示
  return <primitive object={gltf.scene} ref={meshRef} />;
}
