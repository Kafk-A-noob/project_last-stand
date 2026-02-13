# Cleanup: page.tsx

## 課題

`Scene.tsx` をシンプル化（Props削除）しましたが、呼び出し元の `app/page.tsx` はまだ古い仕様のまま `<Scene color={boxColor} />` と記述されています。
このままでは「型エラー」または「Propsが無視される」状態になります。

また、Counter（2Dカウンター）機能も、今回の「ロゴ表示」ミッションとは関係なくなるため、一旦削除してコードを綺麗にします。

## 修正案

### `app/page.tsx`

`useState` や `Counter` のインポートを削除し、純粋に `Scene` だけを表示する形に戻します。

```tsx
'use client'

import dynamic from 'next/dynamic'
// CounterやuseStateは削除
// import Counter from './components/Counter'
// import { useState } from 'react'

const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  // State削除
  // const [count, setCount] = useState(0)

  return (
    // relativeクラスはCSSで重ね合わせをする場合に必要ですが、全画面表示ならそのままでOK
    <main className="h-screen w-full bg-black relative">
      
      {/* 2D UI (Counter) は削除 */}
      {/* <Counter count={count} setCount={setCount} /> */}

      {/* 3D Scene: color属性を削除してシンプルに呼ぶ */}
      <Scene />
      
    </main>
  )
}
```

## 解説

これで `page.tsx` -> `Scene.tsx` のパイプラインが正常化します。
「2D UI」が必要になったら、またこの `Home` コンポーネントの中に追記していきます（例: `<OverlayUI />` など）。
