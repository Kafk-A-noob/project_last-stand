# Phase 2: Blender to Web Pipeline (React Logo)

本ドキュメントは、Phase 2で行われた「Blenderで作成したアセットをWebで表示する」までの一連の実装ログです。

## 概要

**目的:** BlenderからWebへの「アセット搬入ルート」の開通。
**成果物:** `ReactLogo.tsx` (回転する3Dロゴコンポーネント)。

## 1. Pipeline Concept

Unityの `Prefab` をWebで再現するために、以下のR3F(React Three Fiber)エコシステムを使用しました。

| Unity Concept | R3F Concept | 役割 |
| :--- | :--- | :--- |
| **Resources.Load** | `useGLTF` | 外部ファイル(.glb)の非同期ロード |
| **Prefab (GameObject)** | `primitive object={scene}` | 3Dモデル実体の表示 |
| **Component (Script)** | `useFrame` | 毎フレーム実行されるロジック(回転など) |

## 2. Implementation Steps

### A. Component Implementation (`ReactLogo.tsx`)

`@react-three/drei` の `<Billboard>` を使用し、常にカメラ目線で回転するロゴを実装しました。

```tsx
export default function ReactLogo() {
  const { scene } = useGLTF('/models/react_logo.glb')
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
     // Z軸回転 (Tumble Animation)
     if(meshRef.current) meshRef.current.rotation.z += delta * 0.5
  })

  return (
    <Billboard follow={true}>
      <primitive object={scene} ref={meshRef} scale={[0.5, 0.5, 0.5]} />
    </Billboard>
  )
}
```

### B. Scene Integration (`Scene.tsx`)

Phase 1の実験コード（CubeやColor Props）を削除し、純粋なビューワーとして再構築しました。

```tsx
export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <ReactLogo />
      <OrbitControls makeDefault />
    </Canvas>
  )
}
```

## 3. Troubleshooting Log

### Context Lost Issue

- **現象:** HMR (Hot Module Replacement) 時にWebGLコンテキストが消失する。
- **原因:** React Strict Mode が2回レンダリングを行うため。
- **対策:** `next.config.ts` で `reactStrictMode: false` に設定。

### GLB Compression

- **現象:** Draco圧縮されたモデルが表示されない。
- **対策:** `useGLTF(path, true)` 第2引数でDracoデコーダーを有効化。

---
*Merged from: 02_Phase2_FirstAsset & Supplement*
