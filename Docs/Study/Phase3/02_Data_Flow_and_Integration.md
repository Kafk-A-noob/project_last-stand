# Phase 3 Study: Data Flow & Integration (Strict Training)

本ドキュメントは、**UI操作と3Dシーンを連動させるためのデータフロー**（State, Props）を、Unityエンジニア向けに統合・再編集したものです。

## 1. Lifting State Up (状態の持ち上げ)

「ボタン(UI)を押したら、モデル(3D)の色が変わる」
これら兄弟関係にあるコンポーネント同士は直接会話できません。親 (`page.tsx`) が仲介する必要があります。

```mermaid
graph TD
    Page[Page (Manager)]
    Page -->|Props: color| Scene[Scene.tsx]
    Page -->|Props: setColor| UI[OverlayUI.tsx]
    
    UI -->|Event: onClick| Page
    Scene -->|Update Material| WebGL
```

### Unityとの比較

- **Unity:** `FindObjectOfType<SceneManager>()` でManagerを探しに行くことが多いですが、
- **React:** 親から子へ、バケツリレー (`Props Drilling`) で渡していくのが基本です。

---

## 2. 実装パターン (Code Pattern)

### A. 親 (Manager) での定義

```tsx
// page.tsx
const [state, setState] = useState("initial"); // public変数定義
```

### B. バケツリレー (Props Passing)

```tsx
// 子コンポーネントに渡す
<Scene myValue={state} />
<OverlayUI onMyEvent={(val) => setState(val)} />
```

### C. 子での受け取り (Receiver)

Typescriptでは「受け取る型」を定義する必要があります。

```tsx
// Scene.tsx
type SceneProps = {
  myValue: string; // 型定義 (Interface)
};

export default function Scene({ myValue }: SceneProps) {
  // ここで myValue を使う
}
```

---

## 3. Component Integration (統合の作法)

### `children` Props (Wrapper Pattern)

レイアウト用コンポーネント（`OverlayUI` や `ViewerLayout`）は、**「中身は何でもいいから、外枠だけ提供する」** という役割を持ちます。

```tsx
// 定義側 (ViewerLayout)
type Props = { children: ReactNode };
export default function ViewerLayout({ children }: Props) {
  return <div className="layout-style">{children}</div>;
}

// 利用側 (Page)
<ViewerLayout>
  <Scene /> {/* これが children として渡される */}
</ViewerLayout>
```

- **Unity訳:** Prefabの中に空の `Content` ゲームオブジェクトがあり、そこにスクリプトで `Instantiate` して子要素を追加するのと似ています。

---

## 4. `useEffect` vs `useFrame`

### `useEffect` (Event Driven)

- **いつ走る？:** 指定した変数 (`[color]`) が変わった瞬間だけ。
- **Unity訳:** `OnValidate` や プロパティの `set` ブロック。
- **用途:** マテリアルの差し替え、モデルのロード、API通信。

### `useFrame` (Game Loop)

- **いつ走る？:** 毎フレーム (60fps / 120fps)。
- **Unity訳:** `Update()`。
- **用途:** 回転、移動、アニメーション。
