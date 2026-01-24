import dynamic from 'next/dynamic'

// クライアント側でのみレンダリングするように動的インポート (Unityはサーバーで動かないため、SSRを無効化して読み込む
const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  return (
    <main className="h-screen w-full bg-black">
      <Scene />
    </main>
  )
}