"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone, Center } from "@react-three/drei";
import * as THREE from "three";


export default function ReactLogo() {
  const { scene } = useGLTF("/models/React_Logo.glb", true);
  const meshRef = useRef<THREE.Group>(null);


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
