'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Billboard, Clone, Center } from '@react-three/drei'
import * as THREE from 'three'

export default function ReactLogo() {
// 環境が安定したので、本番用ファイルに戻します (Draco有効)
  const { scene } = useGLTF('/models/React_Logo.glb', true)
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.rotation.z += delta * 0.1
    }
  })

  return (
    <Billboard follow={true}>
      <Center>
        <Clone 
          object={scene} 
          ref={meshRef} 
          scale={[0.5, 0.5, 0.5]} 
        />
      </Center>
    </Billboard>
  )
}