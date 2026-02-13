
``` React
'use client'

import {useRef} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Mesh } from 'three'


/* Vanilla JS: function Cube({ wireframe, color }) { ... }
   React: 親から color (文字列) を受け取るように変更
   Security: 受け取った値はThree.js内部でサニタイズされて扱われる。
*/

function Cube({ color}: {color: string}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
   if (meshRef.current) {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.2
   } 
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function Scene({color}: {color: string}) {
  return (
    <div className="h-full w-full">
    <Canvas>
      {/* Unity: Directional Light (ライト) */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Unity: Main Camera Control (マウス操作) */}
      <OrbitControls />

      {/* Test Object: Unity Cube (キューブ) */}
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </Canvas>
    </div>
  )
}
*/

```
