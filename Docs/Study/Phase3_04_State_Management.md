# Phase 3 Study: Interaction & State (Strict Training)

本ドキュメントは、HTML UI（ボタン）の操作を 3Dシーン（モデル）に反映させるための「状態管理 (State Management)」の手順です。

## Step 5: 状態の持ち上げ (Lifting State Up)

「ボタンを押したら色が変わる」を実現するためには、UIと3Dの両方の親である `app/page.tsx` で変数を管理する必要があります。

### Code Snippet

`app/page.tsx` に `useState` を追加し、色情報を管理します。

```tsx
// app/page.tsx

'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react' // 1. 追加
import OverlayUI from './components/OverlayUI'

// SceneコンポーネントにもPropsを渡せるようにする (後述のステップでScene側も修正が必要)
const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  // 2. 状態の定義 (初期値は "cyan")
  const [color, setColor] = useState('cyan')

  return (
    <main className="h-screen w-full bg-black relative">
      
      <OverlayUI>
        <h1 className='text-4xl font-bold tracking-tighter pointer-events-auto'>
           PROJECT: LAST STAND
        </h1>
        
        <div className="flex gap-4 pointer-events-auto">
          {/* 3. 色変えボタンの実装 */}
          <button 
            onClick={() => setColor('cyan')}
            className={`px-4 py-2 rounded-full border transition-all ${
              color === 'cyan' ? 'bg-cyan-500 text-black border-cyan-500' : 'border-white/20 text-white/50 hover:bg-white/10'
            }`}
          >
            CYAN
          </button>
          
          <button 
            onClick={() => setColor('hotpink')}
            className={`px-4 py-2 rounded-full border transition-all ${
              color === 'hotpink' ? 'bg-pink-500 text-black border-pink-500' : 'border-white/20 text-white/50 hover:bg-white/10'
            }`}
          >
            PINK
          </button>
        </div>
      </OverlayUI>

      {/* 4. 3Dシーンに色を渡す (まだScene側が受け取れないのでエラーになるかも？ -> 次ステップで修正) */}
      {/* @ts-ignore 現時点での型エラーは無視してOK */}
      <Scene color={color} />
    </main>
  )
}
```

---

## 解説 (Deep Dive)

### 1. 構造の解剖 (Anatomy)

- **`const [color, setColor] = useState('cyan')`:**
  - **解説:** Unityでいう「ManagerクラスのPublic変数」を作るイメージです。
  - `color`: 現在の値（Get）
  - `setColor`: 値を更新する関数（Set）
- **`Scene color={color}`:**
  - **Props Drilling (バケツリレー):** 親(Page)から子(Scene)へ、変数を渡しています。
  - これにより、Scene内部で「今何色が選ばれているか」を知ることができるようになります。

### 2. 概念翻訳 (Concept Translation)

- **Unity Event System:**
  - Buttonの `OnClick()` イベントに、`GameManager.SetColor("cyan")` を割り当てているのと同じです。
  - Reactでは、値が変わると自動的に `Scene` も再描画（Re-render）され、色が即座に反映されます（Updateが走るイメージ）。

### 3. 注意点

- この時点では `Scene.tsx` が `color` というPropsを受け取るように作られていないため、TypeScriptのエラー（または無視）が出ますが、正常な手順です。
- 次のステップで `Scene.tsx` の受け口を作ります。
