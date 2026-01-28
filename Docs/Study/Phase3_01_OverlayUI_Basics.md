# Phase 3 Study: OverlayUI Basics (Strict Training)

本ドキュメントは、コーディング訓練として提示されたコードの解説補足資料です。
提示されたスニペットを `app/components/OverlayUI.tsx` に入力する際、本資料を「教科書」として参照してください。

## Step 1: コンポーネントの定義 (Props & Type)

まずはコンポーネントの外側（インターフェース）を定義します。

### Code Snippet

```tsx
// app/components/OverlayUI.tsx

import { ReactNode } from 'react';

// 子供の要素 (ボタンなど) を受け取るための定義
type OverlayUIProps = {
  children: ReactNode;
};
```

---

## 解説 (Deep Dive & Security)

### 1. 構造の解剖 (Anatomy)

- **`type OverlayUIProps = { children: ReactNode; };`**
  - **解説:** Reactコンポーネントが「タグの中に挟んだ要素」を受け取るための標準的なルール定義です。
  - **`ReactNode`:** 文字列、数値、JSX要素（`<div>`など）なんでも受け取れる「Reactとして描画可能なすべてのパーツ」を表す型です。
  - **省略時の挙動 (Bug):** TypeScriptの場合、これを定義しないとコンポーネント内に `<OverlayUI>ココ!</OverlayUI>` のように要素を挟んだ瞬間に型エラーが発生し、何も渡せなくなります。

### 2. 概念翻訳 (Concept Translation)

#### 🎮 Unity / VRChat エンジニア向け

- **Hierarchy構造の定義:**
  - `UI Canvas` プレハブ（親）の中に、`Button` や `Text`（子）をドラッグ＆ドロップで入れ子にする仕組みを作っている状態です。
  - `children` という変数は、Hierarchy上の **「自分の直下にある子オブジェクト全て」** に相当します。

#### 🌐 Vanilla JS / Web エンジニア向け

- **DOMコンテナ:**
  - `div` 要素などの `innerHTML` や `appendChild()` を使って、動的に中身を流し込むための「枠（Placeholder）」を用意した状態です。
  - 今後実装する `return` 文の中で `{children}` と書いた場所に、外から渡された要素が挿入されます。

### 3. セキュリティ知識 (Security)

- **XSS (Cross Site Scripting) 対策:**
  - Reactはデフォルトで `children` として渡されたテキストを安全にエスケープ（無害化）します。
  - 悪意あるスクリプトタグが含まれていても、文字列として表示されるだけで実行はされません。
  - **⚠️ 注意点:** `dangerouslySetInnerHTML` というプロパティを使わない限りは安全です。今回は標準の `children` を使うため、セキュリティリスクはありません。

### 4. 応用と拡張 (Usage)

- **Wrapper Pattern:**
  - この「外枠だけ定義して中身は外から貰う」パターンは、**「共通レイアウト」** や **「AuthGuard（ログイン認証ガード）」** などで頻繁に使われます。
  - 例: 「ログインしていないと中身が見えない箱」を作る場合も、この `children` の仕組みを利用します。

---

## Step 2: 実装 (Implementation)

Step 1の続きに、コンポーネント本体を記述します。

### Code Snippet

```tsx
// propsを受け取る形にします
export default function OverlayUI({ children }: OverlayUIProps) {
  return (
    // Unityでいう "Canvas (Render Mode: Overlay)"
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 p-8 flex flex-col justify-between text-white">
      {/* 
        pointer-events-none: 
        ここが重要！UIのない透明な部分はクリックを貫通させる。
        Unity Graphic Raycaster の "Blocks Raycasts" を false にした状態に近い。
      */}
      
      {/* 実際に表示したいボタン等はここに入ります */}
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
```

---

## 解説 (Deep Dive)

### 1. 構造の解剖 (Anatomy)

- **`absolute top-0 left-0 w-full h-full`:**
  - 画面全体を覆う透明なシートを作ります。
- **`z-10`:**
  - 3D Canvas (z-0) よりも手前に表示するための順序指定です（UnityのSort Order）。
- **`pointer-events-none`:**
  - **最重要プロパティです。**
  - これがないと、透明な `div` が画面全体を覆ってしまい、奥にある3Dモデルをマウスで操作（OrbitControls）できなくなります。
  - 透明なフィルムへのクリック判定を無効化し、奥へパススルーさせます。
- **`pointer-events-auto` (内部):**
  - 逆に、ボタンなどの「触りたい要素」だけはこのプロパティでクリック判定を復活させます。

### 2. 概念翻訳 (Concept Translation)

- **Unity uGUI:**
  - Canvas の `Graphic Raycaster` コンポーネント設定と同じです。
  - 親のCanvasで「当たり判定なし」にしておき、子のButtonで「当たり判定あり」にするテクニックです。
- **Anchors:**
  - `justify-between`: Flexboxを使って、コンテンツを「上端」と「下端」に押し広げます（Anchor Top-Bottom Stretch）。

### 3. セキュリティ知識

- **Clickjacking対策:**
  - 全画面を覆う透明レイヤーは、悪用されると「クリックジャッキング攻撃」に使われますが、今回は `pointer-events-none` で入力を透過させているため、ユーザーの意図しないクリックを誘発するリスクは低減されています。
