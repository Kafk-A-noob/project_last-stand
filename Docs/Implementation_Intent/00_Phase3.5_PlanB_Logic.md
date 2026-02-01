# Implementation Intent: Material Logic Plan B

**Date:** 2026-01-31
**Phase:** 3.5 (Asset Production)
**Changes:** `src/app/components/canvas/ManualLoader.tsx`

## 1. 目的 (Objective)

`Mission_05_Blender_Specs` で定義された **Plan B: The Split**（動的パーツと静的パーツのマテリアル分割）に対応するため、ローダー側で特定のマテリアル (`Main_Body`) を検出するロジックを実装します。

## 2. 実装詳細 (Approach)

Three.js の `traverse` ループ内で、「`Main_Body` という名前のマテリアルを持っているか？」を判定します。

### 技術的なポイント

- **型アサーション:** `mesh.material` は単一の場合 (`Material`) と配列の場合 (`Material[]`) があります。`!Array.isArray(mat)` で単一であることを確認します。
- **ログ:** 現時点では `console.log` を出すだけに留め、将来的に色変更ロジック（`mat.color.set`）を挿入する場所を確保します。

### Code Snippet (Unity翻訳)

```typescript
// Unity: foreach(Transform child in transform) { ... }
gltf.scene.traverse((obj: Object3D) => {
  if ((obj as Mesh).isMesh) {
    const mesh = obj as Mesh;
    
    // Unity: Material mat = renderer.material;
    // Unity: if (mat.name.StartsWith("Main_Body")) { ... }
    const mat = mesh.material;
    // 配列チェック + "Main_Body" で始まる名前なら何でもOKにする (例: Main_Body_Radio, Main_Body.001)
    if (!Array.isArray(mat) && mat.name.startsWith("Main_Body")) {
        console.log("Target Material Detected:", mat.name);
        // Future: mat.color.setHex(0xff0000);
    }
  }
});
```

## 3. この修正を行わない場合のリスク

- Blenderでマテリアルを分けて出力しても、Web側がそれを認識できず、将来的な「色変え機能」の実装時に全モデルの再チェック（またはコードの大規模改修）が必要になります。
