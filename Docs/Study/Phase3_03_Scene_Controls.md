# Phase 3 Study: Refining Controls (Strict Training)

本ドキュメントは、3Dビューワーの操作性を「ショールーム向け」に調整するための手順です。

## Step 4: カメラ制御の固定 (Disable Pan)

ユーザーからの「右クリックで移動（Pan）した後、回転がおかしくなる」という指摘に対応します。

### Code Snippet

`app/components/Scene.tsx` の `OrbitControls` を以下のように修正します。

```tsx
// app/components/Scene.tsx

// (前略)
<Canvas>
  {/* (Light & Mesh...) */}

  {/* 
    enablePan={false}: 平行移動（右ドラッグ）を禁止します。
    これで「モデルが画面外に行ってしまう」事故を防ぎ、
    常にモデルを中心に回転するように強制します。
  */}
  <OrbitControls makeDefault enablePan={false} />
</Canvas>
```

---

## 解説 (Deep Dive)

### 1. 構造の解剖 (Anatomy)

- **現象の正体:**
  - `OrbitControls` は「Target（注視点）」を中心にカメラを旋回させます。初期値は `(0,0,0)` です。
  - 右ドラッグ（Pan）をすると、カメラだけでなく **Targetの座標** も一緒に移動します。
  - その状態で回転（Left Drag）すると、ずれたTargetを中心に回るため、原点にあるモデルが大きく振り回されて（公転して）視界から消えます。
- **`enablePan={false}`:**
  - Targetを `(0,0,0)` から動かせなくします。これにより、ユーザーは常に「モデルの観察」に集中できます。

### 2. 概念翻訳 (Concept Translation)

- **Blender:**
  - 「Shift + 中クリック」で視点をずらした後、回転すると変な周り方をするアレです。
  - Blenderでは `Numpad .` (Frame Selected) でリセットしますが、Webの一般ユーザーにその操作を強いるのは酷です。
- **VRChat World:**
  - PickupオブジェクトをInspect（詳細表示）しているモードに近い挙動です。

### 3. 応用 (Usage)

- **製品ビューワー:** 車や靴などの3Dカタログでは、必ずと言っていいほどPanは無効化（または範囲制限）されています。
