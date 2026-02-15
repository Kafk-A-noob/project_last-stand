# Work Log: Switch to Manual File Size Entry

**Date:** 2026-02-15
**Goal:** ファイルサイズ表示を「自動取得」から「手動入力」に変更し、確実に表示されるようにする。
**Reason:** Next.jsの標準サーバー（`npm start`）でも静的ファイルの `Content-Length` ヘッダーが省略される仕様があり、自動取得が困難であるため。

## 1. Loader Update (`src/app/components/canvas/ManualLoader.tsx`)

不安定な `fetch` 処理を削除し、純粋にジオメトリ情報だけを計算するように戻します。

### [MODIFY] `src/app/components/canvas/ManualLoader.tsx`

`useEffect` の中身を以下のように簡素化します。

```typescript
  // ... imports ...

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

      // 2. 更新 (fetch無し)
      // fileSizeはここでは計算せず、Store/Manifestにある値をそのまま使う
      // (techSpecsの一部だけ更新、というのはStoreの仕様上できないので、fileSizeも引き継ぐ必要があるが、
      //  Manifestに書かれた初期値は currentModel.techSpecs.fileSize に入っているはず)
      
      // ★ しかし store.ts の setModelData は「浅いマージ」なので、
      // ここで techSpecs を上書きすると Manifest の fileSize が消えてしまう可能性がある。
      
      // そのため、現在の currentModel から fileSize を取得して再利用する実装にする。
      
      updateModel({
        techSpecs: {
          vertices: vertCount,
          triangles: triCount,
          compression: "Draco (Auto)",
          // ↓ Manifestに書いた値を維持するために、currentModelから読み込む
          fileSize: currentModel?.techSpecs?.fileSize, 
        },
      });
    }
  }, [scene, targetPath, updateModel, currentModel]); // currentModel を依存配列に追加

  // ...
```

## 2. Manifest Update (`src/config/asset-manifest.ts`)

各モデルのエントリーに `techSpecs` オブジェクトと `fileSize` を追記します。
（※ `vertices` 等はLoaderが上書きしてくれますが、`fileSize` はここが正となります）

### [MODIFY] `src/config/asset-manifest.ts`

```typescript
export const ASSET_MANIFEST: ArchiveItem[] = [
  {
    id: "item-000-React_Logo",
    // ...
    path: "/models/00_React_Logo.glb",
    
    // [追加] 初期値として記述
    techSpecs: {
      vertices: 0, // Loaderが更新するので0でOK
      triangles: 0,
      compression: "Draco",
      fileSize: "0.5 MB", // ★ここに手動で書く
    },
    // ...
  },
  {
    id: "item-001-radio",
    // ...
    path: "/models/01_radio.glb",
    scale: [3, 3, 3],
    position: [0, -1.0, 0],
    
    // [追加]
    techSpecs: {
      vertices: 0,
      triangles: 0,
      compression: "Draco",
      fileSize: "4.2 MB", // ★ここに手動で書く (推定値または実測値)
    },
    // ...
  },
  // ...
];
```
