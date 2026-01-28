"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Billboard, Clone, Center } from "@react-three/drei";
import * as THREE from "three";

type ReactLogoProps = {
  color: string;
};

export default function ReactLogo({ color }: ReactLogoProps) {
  const { scene } = useGLTF("/models/React_Logo.glb", true);
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // scene以下の全メッシュを探してマテリアルの色を変える
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // 色を適用 (Three.jsのColorクラス)
        child.material.color = new THREE.Color(color);
        child.material.emissive = new THREE.Color(color); // 発光色も変える
        child.material.emissiveIntensity = 1.0; // 少し強めに発光
      }
    });
  }, [color, scene]); // 監視対象: colorまたはsceneが変わったら発火

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 2;
      meshRef.current.rotation.y += delta * 3;
      meshRef.current.rotation.z += delta * 1;
    }
  });

  return (
    // <Billboard follow={true}>
    <Center>
      <Clone object={scene} ref={meshRef} scale={[0.5, 0.5, 0.5]} />
    </Center>
    // </Billboard>
  );
}
