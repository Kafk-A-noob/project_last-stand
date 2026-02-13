```

'use client'

import dynamic from 'next/dynamic'
import Counter from './components/Counter'
import { useState } from 'react'
// クライアント側でのみレンダリングするように動的インポート (Unityはサーバーで動かないため、SSRを無効化して読み込む
const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  const [count, setCount] = useState(0)

  /*
  カウントが偶数なら赤(red)、奇数なら青(blue)にするロジック
  Vanilla JS: const color = (count % 2 === 0) ? 'red' : 'blue';
  */

  const boxColor = count % 2 === 0 ? 'red' : 'blue'
  return (
    <main className="h-screen w-full bg-black relative">
      {/* 2D UI Overlay */}

       {/* 親の count と setCount を子に貸す */}
      <Counter count={count} setCount={setCount} />

      {/* 3D Scene */}
      {/* Vanilla JS: Scene(boxColor) のように関数を呼ぶイメージ */}
      {/* React: color属性として渡す。countが変わる→boxColorが変わる→Sceneが再描画される */}
      <Scene color={boxColor} />
    </main>
  )
}
```