# Phase 3 Study: Props Drilling (Strict Training)

本ドキュメントは、「バケツリレー (Props Drilling)」を行い、UIの変更を3Dモデルへ伝える手順です。

## Step 6: 連結の修正 (Fixing Connections)

先ほど作成した `app/page.tsx` には、意図的な（またはよくある）ミスが含まれていました。これを修正し、リレーの第一走者を走らせます。

### 修正 1: 初期値の統一 (Bug Fix)

- `useState("Cyan")` と大文字になっていますが、ボタンの判定は `color === "cyan"` (小文字) です。
- 初期状態でCYANボタンが光るように、初期値を小文字にします。

### 修正 2: バトンの手渡し (Passing Props)

- `<Scene />` に `color` を渡していませんでした。これではSceneは色の変化に気づけません。

```tsx
// app/page.tsx

// 修正 1: 初期値を小文字に
const [color, setColor] = useState("cyan");

// (中略)

{/* 修正 2: Propsを渡す */}
<Scene color={color} />
```

---

## Step 7: 受取口の作成 (Receiver Implementation)

バトンを受け取るために、`Scene.tsx` と `ReactLogo.tsx` を改造します。

### 1. `app/components/Scene.tsx` (中継地点)

型定義は **import文の下、function Sceneの上** に挿入します。

```tsx
// app/components/Scene.tsx

import ReactLogo from './ReactLogo'

// 【ここに追加】型定義: string型のcolorを受け取れるようにする
type SceneProps = {
  color: string;
};

// 【変更】引数で受け取る ({ color }: SceneProps)
export default function Scene({ color }: SceneProps) {
  return (
    <Canvas>
      {/* ...Lights... */}
      
      {/* 【変更】ReactLogoへさらにバトンを渡す */}
      <ReactLogo color={color} />

      <OrbitControls makeDefault enablePan={false} />
    </Canvas>
  )
}
```

### 2. `app/components/ReactLogo.tsx` (ゴール地点)

同様に、型定義を **import文の下、function ReactLogoの上** に挿入します。

```tsx
// app/components/ReactLogo.tsx

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// (中略)

// 【ここに追加】型定義
type ReactLogoProps = {
  color: string;
};

// 【変更】引数で受け取る
export default function ReactLogo({ color }: ReactLogoProps) {
  const { scene } = useGLTF('/models/React_Logo.glb', true)
  const meshRef = useRef<THREE.Group>(null)

  // 【ここに追加】重要: 色が変わった時だけ走る処理 (useEffect)
  useEffect(() => {
    // scene以下の全メッシュを探してマテリアルの色を変える
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // 色を適用 (Three.jsのColorクラス)
        child.material.color = new THREE.Color(color);
        child.material.emissive = new THREE.Color(color); // 発光色も変える
        child.material.emissiveIntensity = 1.0; // 少し強めに発光
      }
    })
  }, [color, scene]); // 監視対象: colorまたはsceneが変わったら発火

  // (以下 useFrame, return はそのまま)
  // ...
}
```

---

## 解説 (Deep Dive)

### 1. 構造の解剖 (Anatomy)

- **`scene.traverse`:**
  - **解説:** `scene` (ロードしたモデルのルート) の下にあるすべての子オブジェクトを再帰的に巡回します。
  - Unityでいう `GetComponentsInChildren<MeshRenderer>()` して `foreach` で回す処理と同じです。
- **`useEffect`:**
  - **解説:** 副作用（Side Effect）フックです。
  - `[color]` を指定することで、Unityの `OnValidate` や、変数のセッター (`set { ... }`) のように、**「値が変わった瞬間だけ」** 実行されます。これがないと、毎フレーム（Update）無駄にマテリアルを書き換えることになり、重くなります。
- **型定義の場所:**
  - コンポーネント関数の外側に書くのが通例です（C#でいうクラス定義の前の構造体定義のようなイメージ）。
  - `export` をつけて別ファイルから使い回すこともありますが、今回はこのファイル専用なので `type ...` だけでOKです。

### 2. セキュリティとパフォーマンス

- Unityではマテリアルインスタンスの生成に注意が必要ですが、Three.js/R3Fでは `child.material.color` を書き換えるだけならインスタンス爆発は起きにくいです。
- ただし、元のGLTFがマテリアルを共有している場合、一箇所変えると他も変わる可能性があります（今回は1つだけなのでOK）。
