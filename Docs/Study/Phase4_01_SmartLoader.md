# Mission: Smart Loader 実装 (Training Mode)

**鉄の掟:** コピペ禁止。コードの意味を理解し、自分の手で打ち込むこと。

## 概要

「一瞬で読み終わるならロード画面を出さない」という高級感ある挙動を、JavaScriptの複雑なタイマー処理なしで実装します。
**CSSの `animation-delay`** を利用したトリックを使います。

## 1. 作成するファイル

`app/components/SmartLoader.tsx`

## 2. 実装ステップ

### Step 1: 必要なフックのインポート

`@react-three/drei` から、ロード状況を取得する最強のフック `useProgress` を呼び出します。

```tsx
"use client";

import { Html, useProgress } from "@react-three/drei";

// Html: 3Dキャンバスの中にHTML要素(divなど)を浮かべるためのコンポーネント
// useProgress: 現在のロード進捗率(progress)などを提供するフック
```

### Step 2: 骨格とフックの使用

Unityでいう `AsyncOperation.progress` (0.0~1.0) に加え、ダウンロード済みバイト数も取得します。

```tsx
export default function SmartLoader() {
  // loaded: 読み込み済みバイト数
  // total: 全体のバイト数
  // progress: 0~100の進捗率
  const { progress, loaded, total } = useProgress();

  // ヘルパー関数: バイト数を "XX.XX MB" という文字列に変換
  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  return (
    <Html center>
      <div className="text-white font-mono">
        {toMB(loaded)} MB / {toMB(total)} MB ({progress.toFixed(0)}%)
      </div>
    </Html>
  );
}
```

まずはここまで書いて、`Scene.tsx` で使ってみて「数字が出るか」を確認するのが定石ですが、今回は一気にロジックまで解説します。

### Step 3: CSSによる遅延表示 (The Debounce Trick)

ここが今回の核心です。
「0.5秒待ってからフェードインする」というスタイルを適用します。

- **ロードが0.2秒で終わった場合:** フェードインが始まる前にコンポーネントが消滅する → **何も表示されない (成功)**
- **ロードが長引いた場合:** 0.5秒後からじわっと表示される。

```tsx
export default function SmartLoader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const toMB = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);

  return (
    <Html center>
      {/* 
        opacity-0: 最初は透明
        animate-[fadeIn_0.5s_ease-in_forwards]: フェードインアニメ
        delay-500: 500ms待機 (これがミソ！)
      */}
      <div 
        className="text-white font-mono text-xl bg-black/50 p-4 border border-white/20 backdrop-blur-md opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]"
        style={{ animationDelay: "500ms" }}
      >
        <div className="text-xs text-gray-400 mb-1">LOADING ASSETS...</div>
        {toMB(loaded)} MB / {toMB(total)} MB
      </div>
    </Html>
  );
}
```

> [!TIP] **Deep Dive: Tailwindでキーフレームアニメ**
> `animate-[...]` はJITコンパイラの機能ですが、動かない場合は `global.css` に `@keyframes fadeIn { to { opacity: 1; } }` を書く定石があります。
> 今回はまず上記を試してみてください。

### Step 4: 配置 (Scene.tsx)

作ったローダーを使うには、`<Suspense>` コンポーネントの `fallback` 属性に渡します。
これはReactの非同期処理の基本作法です。

**`app/components/Scene.tsx`**:

```tsx
import { Suspense } from 'react'; // React本体から
import SmartLoader from './SmartLoader';

// ...

return (
  <Canvas>
    <Suspense fallback={<SmartLoader />}>
      {/* モデルたち */}
      <ManualLoader />
    </Suspense>
    {/* ... */}
  </Canvas>
)
```

---

## 3. 実践

上記の解説を元に、ファイルを作成しコードを記述してください。
書けたら、ブラウザのリロードを行って挙動を確認しましょう。
(※ローカル環境は爆速でロードが終わるので、逆に「何も出ない」のが正解かもしれません。その場合はF12ツールで `Network` -> `Slow 3G` にして低速シミュレーションしてください)
