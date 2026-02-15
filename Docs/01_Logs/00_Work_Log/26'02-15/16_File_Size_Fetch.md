# Work Log: Fetch & Display Model File Size

**Date:** 2026-02-15
**Goal:** モデル（.glb）のファイルサイズを自動取得し、画面に表示する。
**Method:** `fetch` API (HEADメソッド) を使用して `Content-Length` を取得する。

## 1. Store Definition Update (`src/lib/store.ts`)

`techSpecs` に `fileSize` (文字列: 例 "4.2 MB") を追加します。

### [MODIFY] `src/lib/store.ts`

```typescript
export type ArchiveItem = {
  // ...
  techSpecs?: {
    vertices: number;
    triangles: number;
    compression: string;
    // [追加] ファイルサイズ表記 (Optional)
    fileSize?: string; 
  };
};
```

## 2. Loader Update (`src/app/components/canvas/ManualLoader.tsx`)

モデル読み込み時にファイルサイズも取得し、Storeを更新します。

### [MODIFY] `src/app/components/canvas/ManualLoader.tsx`

`useEffect` の中に、ファイルサイズ取得ロジックを追加します。

```typescript
export default function ManualLoader() {
  // ... existing code ...
  const updateModel = useStore((state) => state.setModelData);

  // useGLTF: 自動でキャッシュ・Draco対応
  const { scene } = useGLTF(targetPath, "/draco/");

  useEffect(() => {
    // クローンして使用
    const clonedScene = scene.clone(true);

    if (clonedScene) {
      // 1. ジオメトリ計算
      let vertCount = 0;
      let triCount = 0;
      clonedScene.traverse((obj: Object3D) => {
        if ((obj as Mesh).isMesh) {
          const mesh = obj as Mesh;
          vertCount += mesh.geometry.attributes.position.count;
          triCount += mesh.geometry.index ? mesh.geometry.index.count / 3 : 0;
        }
      });

      // 2. ファイルサイズ取得して、まとめて更新 (All-in-One Update)
      // fetchの中で vertices 等も一緒に渡すことで、型エラーを防ぐ
      fetch(targetPath, { method: "HEAD" })
        .then((res) => {
          const length = res.headers.get("Content-Length");
          const sizeStr = length 
            ? `${(parseInt(length) / 1024 / 1024).toFixed(2)} MB` 
            : "Unknown";

          // 成功時: 全データ揃えて更新
          updateModel({
            techSpecs: {
              vertices: vertCount,
              triangles: triCount,
              compression: "Draco (Auto)",
              fileSize: sizeStr,
            },
          });
        })
        .catch((e) => {
          console.error("Size fetch failed", e);
          // 失敗時: サイズ以外で更新（または Unknown）
          updateModel({
            techSpecs: {
              vertices: vertCount,
              triangles: triCount,
              compression: "Draco (Auto)",
              fileSize: "Unknown",
            },
          });
        });
    }
  }, [scene, targetPath, updateModel]); // targetPath も依存配列に追加

  // ... (useFrame, returnなど)
}
```

### 推奨実装パターン（Promise.all的なアプローチ）

```typescript
    if (clonedScene) {
      // 1. ジオメトリ計算
      let vertCount = 0;
      let triCount = 0;
      clonedScene.traverse((obj: Object3D) => { /* ... */ });

      // 2. ファイルサイズ取得して、まとめて更新
      fetch(targetPath, { method: "HEAD" })
        .then((res) => {
          const length = res.headers.get("Content-Length");
          const sizeStr = length 
            ? `${(parseInt(length) / 1024 / 1024).toFixed(2)} MB` 
            : "Unknown";

          updateModel({
            techSpecs: {
              vertices: vertCount,
              triangles: triCount,
              compression: "Draco (Auto)",
              fileSize: sizeStr, // [New]
            },
          });
        })
        .catch(() => {
          // 失敗してもジオメトリ情報は出す
          updateModel({
            techSpecs: {
              vertices: vertCount,
              triangles: triCount,
              compression: "Draco (Auto)",
              fileSize: "Unknown",
            },
          });
        });
    }
```

## 3. UI Update (`src/app/components/ui/InfoPanel.tsx`)

取得した `fileSize` を表示します。

### [MODIFY] `src/app/components/ui/InfoPanel.tsx`

Tech Specs セクションに追加します。

```tsx
          <div className={cn(...) }>
            <p>VERT: {currentModel.techSpecs.vertices.toLocaleString()}</p>
            <p>TRIS: {currentModel.techSpecs.triangles.toLocaleString()}</p>
            <p>COMP: {currentModel.techSpecs.compression}</p>
            {/* [追加] */}
            {currentModel.techSpecs.fileSize && (
               <p>SIZE: {currentModel.techSpecs.fileSize}</p>
            )}
          </div>
```
