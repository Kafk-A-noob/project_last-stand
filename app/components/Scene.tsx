'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
// import ReactLogo from './ReactLogo'
import ManualLoader from './ManualLoader'
import SmartLoader from './SmartLoader'



export default function Scene() {
  return (
    <Canvas>
      {/* Unity: Directional Light */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      
      {/* モデル読み込み (Suspense: 非同期処理の基本作法) */}
      <Suspense fallback={<SmartLoader />}>

      {/* 以前のCube・ReactLogoは.mdで除外 */}
        <ManualLoader />
      </Suspense>

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