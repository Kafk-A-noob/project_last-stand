# Debug Plan: Invisible Model (ReactLogo)

**Date:** 2026-02-13
**Status:** Debugging

## 1. 現象 (Issue)

- `Radio` (ID-001) は正常に表示される。
- `ReactLogo` (ID-000) に切り替えると、エラーは出ないが **「何も表示されない（見えない）」**。
- `ErrorBoundary` は発動していないため、ロード自体は成功している。

## 2. 原因仮説 (Hypothesis)

1. **スケールが極端に小さい/大きい:** カメラの視錐台（Frustum）の外にあるか、小さすぎて見えない。
2. **位置がずれている:** 原点 (0,0,0) から遠く離れた場所に配置されている。
3. **マテリアルが透明/裏面:** 法線が裏返っている、あるいは `opacity: 0` になっている。

## 3. デバッグ手順 (Debug Steps)

`src/app/components/canvas/ManualLoader.tsx` に以下のデバッグコードを埋め込み、モデルの状態を可視化します。

### Step 1: `BoxHelper` (バウンディングボックス) の表示

モデルの「大きさ」と「場所」を可視化する赤い枠線を表示します。

```tsx
// Imports
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";

export default function ManualLoader() {
  const meshRef = useRef<Group>(null);

  // ↓ これを追加 (赤い枠線を表示)
  useHelper(meshRef, BoxHelper, "red");

  // ...
```

### Step 2: 強制中心配置 & スケール正規化

ロード完了時に、モデルを強制的に正規化します。

```tsx
useEffect(() => {
  if (gltf && meshRef.current) {
    // バウンディングボックスを計算
    const box = new Box3().setFromObject(gltf.scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    console.log("Model Size:", size);
    console.log("Model Center:", center);

    // モデルの座標を原点に合わせる (Centering)
    gltf.scene.position.x += gltf.scene.position.x - center.x;
    gltf.scene.position.y += gltf.scene.position.y - center.y;
    gltf.scene.position.z += gltf.scene.position.z - center.z;

    // 極端に小さい/大きい場合は警告
    if (size.length() < 0.1) console.warn("Model is TOO SMALL!");
    if (size.length() > 100) console.warn("Model is TOO BIG!");
  }
}, [gltf]);
```

---

## 4. ユーザーへのお願い

まずは **Step 1 (BoxHelper)** だけで構いません。
赤い枠線が表示されるか確認してください。

- **枠線が見える:** モデルのマテリアル（透明度など）の問題。
- **枠線も見えない:** スケールか位置が極端におかしい。
