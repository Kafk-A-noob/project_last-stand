# Phase 3 Study: UI Integration (Strict Training)

本ドキュメントは、作成した `OverlayUI` コンポーネントをメイン画面に配置し、3Dシーンと合成するための手順書です。

## Step 3: ページへの統合 (Page Integration)

`app/page.tsx` を編集し、OverlayUIとSceneを重ね合わせます。

### Code Snippet

```tsx
// app/page.tsx

'use client'

import dynamic from 'next/dynamic'
// 1. 作成したコンポーネントをインポート (Typo注意: OverLayUI と書いた場合はそれに合わせる)
import OverlayUI from './components/OverlayUI' 

const Scene = dynamic(() => import('./components/Scene'), { ssr: false })

export default function Home() {
  return (
    <main className="h-screen w-full bg-black relative">
      
      {/* 2. UIを配置 (手前) */}
      <OverlayUI>
        <h1 className="text-4xl font-bold tracking-tighter">
          PROJECT: LAST STAND
        </h1>
        
        {/* 下部のボタンエリア */}
        <div className="flex gap-4">
           {/* 後ほどボタンを追加します */}
           <p className="text-sm opacity-50">Debug Mode: Active</p>
        </div>
      </OverlayUI>

      {/* 3. 3D Scene (奥) */}
      <Scene />
    </main>
  )
}
```

---

## 解説 (Deep Dive)

### 1. 構造の解剖 (Anatomy)

- **`relative` (親) vs `absolute` (子):**
  - 親の `<main>` に `relative` がついているため、子である OverlayUI (`absolute`) はこの mainタグを基準に `top-0 left-0` (左上) に張り付きます。
- **重ね順 (Layering):**
  - HTMLの記述順序に関わらず、CSSの `z-index` や `absolute` の配置順で重なりが決まりますが、今回は `OverlayUI` に `z-10` がついているため、Scene (z指定なし) より確実に手前に来ます。

### 2. コンポーネントの再利用 (Usage)

- **`OverlayUI` タグの中身:**
  - ここに書いた `h1` や `div` が、`OverlayUI.tsx` 内の `{children}` の部分にスコーンと入ります。
  - まるで `OverlayUI` というレイアウト用コンテナ（Prefab）の中に、コンテンツをドラッグ＆ドロップする感覚です。

### 3. 注意点 (Typo Check)

- 先ほど作成した `OverlayUI.tsx` の関数名が `OverLayUI` (Lが大文字) になっていた場合、インポート時も名前を合わせるか、`import OverLayUI from ...` とする必要があります。
- (ファイル名と関数名は一致させるのが通例ですが、動くので今回はそのままでOKです)
