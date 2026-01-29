import { useRef, useEffect } from "react";
import { Group, Object3D, Mesh } from "three";
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

      gltf.scene.traverse((obj: Object3D) => {
        if ((obj as Mesh). isMesh) {
          const mesh = obj as Mesh;
          vertCount += mesh.geometry.attributes.position.count;
          triCount += mesh.geometry.index ? mesh.geometry.index.count / 3 : 0;
        }
      });

      // ストアに保存
      setModel({
        // System
        id: "item-000-prototype",
        active: true,
        // Narrative
        name: meta.name || "React Logo",
        quote: meta.quote || "The beginning of everything.",
        description: meta.description || "A rotating atom symbol representing the declarative UI library.",
        contributor: meta.contributor || "Meta Open Source",
        // Asset
        modelPath: "/models/React_Logo.glb",
        // Tech Specs (The Flex)
        techSpecs: {
          vertices: vertCount,
          triangles: triCount,
          compression: "Draco",
        },
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
