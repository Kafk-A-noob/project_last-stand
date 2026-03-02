# Troubleshooting 08: Model Origin Offset (モデルの原点ズレ問題)

## Issue (現象)

Blenderからエクスポートしたモデル (例: `03_Can_Coffee.glb`) をR3F (`ManualLoader.tsx` 等) で読み込んだ際、意図した配置から大きく逸脱して表示される現象。
特に `scale` を大きく設定している場合に、わずかなズレが致命的な座標の狂いとなって現れる。

## Cause (原因)

現在のR3F実装 (`ManualLoader.tsx`) では `@react-three/drei` の `<Center>` コンポーネント等による自動センタリングが行われておらず、純粋な `<primitive>` として読み込まれている。
よって、**Blenderのエクスポート時のローカル原点（オレンジの点）が、そのままR3F側の世界の中心座標として扱われる**ため。

## Solutions (解決策)

次回作業時に以下のいずれかのアプローチを実行すること。

### Approach 1: Blenderでの原点再設定 (推奨)

R3F側は弄らず、Blenderで再出力するベーシックな手法。

1. Blenderで対象オブジェクトを選択。
2. `Right Click` > `Set Origin` (原点の設定) > `Origin to Geometry` (ジオメトリへ移動)
3. `Alt + G` でオブジェクトをワールド原点 (0, 0, 0) へ移動。
4. `Ctrl + A` > `All Transforms` (全トランスフォーム) を適用。
   - ※トランスフォームを適用しないと、Unity/R3F側で元のオフセットが復活する恐れがある。
5. 再度 `.glb` としてエクスポートして上書き。

### Approach 2: R3F側 (`@react-three/drei`) の `<Center>` 導入 (堅牢性重視)

今後追加される有象無象のモデルデータに都度Blender側で対応するのが手間の場合は、システム側で吸収する。
`ManualLoader.tsx` の返り値を以下のように修正する。

```tsx
import { Center } from "@react-three/drei";

// ...省略...

  return (
    <Center>
      <primitive
        object={scene.clone(true)}
        ref={meshRef}
        dispose={null}
        scale={scale}
        // position={position} は Center コンポーネント側、または外側のGroupで制御する形へ変更が必要になる場合あり
      />
    </Center>
  );
```

※注意: 複数のパーツが組み合わさったモデルの場合、バウンディングボックスの中心が「期待する中心」とズレる可能性があることに留意。
