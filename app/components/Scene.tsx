'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ReactLogo from './ReactLogo'

export default function Scene() {
  return (
    <Canvas>
      {/* Unity: Directional Light */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      
      {/* 以前のCubeは.mdで除外 */}
      {/* Reactロゴ設置 */}
      <ReactLogo />

      {/* カメラ操作 */}
      <OrbitControls makeDefault />
    </Canvas>
  )
}