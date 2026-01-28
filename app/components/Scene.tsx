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

      {/* 
      enablePan={false}: 平行移動（右ドラッグ）を禁止。
      これで「モデルが画面外に行ってしまう」事故を防ぎ、
      常にモデルを中心に回転するように強制。
      */}
      <OrbitControls makeDefault enablePan={false} />
    </Canvas>
  )
}