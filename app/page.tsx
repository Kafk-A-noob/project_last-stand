'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  return (
    <main className="h-screen w-full bg-black relative">

      {/* 2D UI Overlay */}

      {/* 3D Scene */}
      <Scene />
    </main>
  )
}
