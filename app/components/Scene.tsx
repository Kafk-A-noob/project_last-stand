'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas>
      {/* Unity: Directional Light (ライト) */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Unity: Main Camera Control (マウス操作) */}
      <OrbitControls />

      {/* Test Object: Unity Cube (赤いキューブ) */}
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </Canvas>
  )
}