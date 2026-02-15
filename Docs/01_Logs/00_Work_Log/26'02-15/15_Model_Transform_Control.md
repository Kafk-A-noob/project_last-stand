# Work Log: Individual Model Transform Control

**Date:** 2026-02-15
**Goal:** モデルごとに個別のスケール（大きさ）と位置（高さなど）を設定できるようにする。
**Method:** ユーザーによる手動コーディング (Manual Implementation)

## 1. Store Definition Update (`src/lib/store.ts`)

モデルデータの型定義 `ArchiveItem` に、`scale` と `position` のオプションを追加します。

### [MODIFY] `src/lib/store.ts`

```typescript
export type ArchiveItem = {
  // ... existing fields ...
  path: string;
  camPos?: [number, number, number];
  rotationSpeed?: [number, number, number];
  
  // [追加] 個別のトランスフォーム設定 (Option)
  scale?: [number, number, number];    // 例: [2, 2, 2]
  position?: [number, number, number]; // 例: [0, -1, 0]

  // ... existing techSpecs ...
};
```

## 2. Loader Update (`src/app/components/canvas/ManualLoader.tsx`)

読み込んだモデルを表示する際、Storeから取得した `scale` と `position` を適用するようにします。

### [MODIFY] `src/app/components/canvas/ManualLoader.tsx`

`return` 文の `<primitive>` コンポーネントに props を渡します。

```typescript
export default function ManualLoader() {
  // ... existing code ...
  const currentModel = useStore((state) => state.currentModel);

  // デフォルト値の設定
  const scale = currentModel?.scale || [1, 1, 1];
  const position = currentModel?.position || [0, 0, 0];

  useFrame((state, delta) => {
      // ... existing rotation code ...
  });

  // [修正] scaleとpositionを適用
  return (
    <primitive 
      object={scene.clone(true)} 
      ref={meshRef} 
      dispose={null} 
      scale={scale}
      position={position}
    />
  );
}
```

## 3. Asset Manifest Update (`src/config/asset-manifest.ts`)

Radioモデルの設定に、拡大と位置補正を追加します。

### [MODIFY] `src/config/asset-manifest.ts`

```typescript
  {
    id: "item-001-radio",
    active: true,
    name: "Radio",
    path: "/models/01_radio.glb",
    rotationSpeed: [0, 0.5, 0], // 回転速度はお好みで
    
    // [追加] 拡大して、少し下に下げる（重心位置補正）
    scale: [3, 3, 3],       // 3倍に拡大
    position: [0, -1.0, 0], // 1.0ユニット下げる
    
    quote: "最期まで日常らしい時間を感じたいから。",
    // ...
  },
```
