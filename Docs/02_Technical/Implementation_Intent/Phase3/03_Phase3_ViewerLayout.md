# Implementation Intent: ViewerLayout (Overlay UI)

## コンセプト: "Digital Laboratory"

ユーザーの「作りたいものを都度追加していく」スタイルに合わせ、特定の製品に縛られない「実験室 (Laboratory)」または「ギャラリー」のようなUIを構築します。
主役はあくまで3Dモデル。UIはそれを邪魔せず、かつ情報を補完する役割に徹します。

## 技術的課題: 3D操作 vs 2D操作の競合

画面全体に3D Canvas (`OrbitControls`) が広がっているため、普通にUIを重ねると「UIをクリックしたのに後ろのカメラが動いてしまう」あるいは「UIのせいでカメラが動かせない」という問題が発生します。

### 解決策: `pointer-events` コントロール

CSSの `pointer-events` プロパティを駆使して、入力の「透過」と「遮断」を制御します。

- **レイヤー1 (奥): 3D Canvas**
  - `z-index: 0`
  - 常にマウスイベントを受け取る。
- **レイヤー2 (手前): UI Container**
  - `z-index: 10`
  - `pointer-events: none` (基本は透明人間。クリックは後ろのCanvasに貫通する)
- **レイヤー2内の要素: ボタンやテキスト**
  - `pointer-events: auto` (ここだけ実体化。クリックを受け取り、後ろへのイベントを遮断する)

## 実装イメージ (`app/components/ViewerLayout.tsx`)

```tsx
export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 1. 3D Scene Layer (Background) */}
      <div className="absolute inset-0 z-0">
        {children} {/* ここに <Scene /> が入る */}
      </div>

      {/* 2. UI Layer (Foreground Overlay) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8">
        
        {/* Header */}
        <header className="pointer-events-auto">
          <h1 className="text-white text-2xl font-bold tracking-widest">
            PROJECT: LAST STAND
          </h1>
          <p className="text-gray-400 text-xs">リアルタイム3Dコンテンツ / Blender / Web3D Portfolio</p>
        </header>

        {/* Footer / Controls */}
        <footer className="pointer-events-auto flex gap-4">
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded backdrop-blur-md border border-white/10 transition-colors">
            Reset Camera
          </button>
          <button className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-4 py-2 rounded backdrop-blur-md border border-cyan-500/30 transition-colors">
            Next Model &gt;
          </button>
        </footer>
        
      </div>
    </div>
  )
}
```

## 次のステップ

1. この `ViewerLayout` コンポーネントを作成。
2. `page.tsx` を修正し、`<Scene />` をこのレイアウトで包む。
