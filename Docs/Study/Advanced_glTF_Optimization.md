# 実務レベルのGLTF最適化: gltfpack & Meshopt

Blender 5.0 (Exporter v5.0) の設定画面に `gltfpack` という文字がありました。
これがまさに「実務で使うなら身につけておくべき」最重要キーワードです。

## 1. gltfpack とは？

「3D界の JPEG圧縮機」のような最強のCLI(コマンドライン)ツールです。
Blender標準のエクスポート機能よりも圧倒的に高性能で、ゲーム会社やWeb制作の現場では**「Blenderから出した後に gltfpack を通す」**のが標準フローになりつつあります。

### なぜ必要なのか？

- **Dracoより速い:** 解凍速度が爆速な `Meshopt` 圧縮 ("EXT_meshopt_compression") を使えます。
- **Draw Call削減:** 複数のメッシュを自動で結合し、GPUが描画する回数を減らしてくれます（これが一番重い処理です）。
- **テクスチャ最適化:** 画像サイズを自動で小さくリサイズしたり、形式を変換したりできます。

## 2. 実務でのワークフロー (Modern Pipeline)

| レベル | 手法 | 特徴 |
| :--- | :--- | :--- |
| **Lv.1** | Blender標準圧縮 (Draco) | 手軽。ただし解凍が少し遅い。スマホでカクつくことがある。 |
| **Lv.2** | **gltfpack (Meshopt)** | **推奨。** ファイルサイズはDracoと同等だが、解凍が超高速。 |
| **Lv.3** | glTF Transform | さらに高度なスクリプト処理。テクスチャのWebP変換なども自動化。 |

## 3. 次のアクション (学習おすすめ)

もしこの道を極めるなら、以下の手順で `gltfpack` を試してみるのが良い経験になります。

1. **gltfpackのダウンロード:** [`meshoptimizer`](https://github.com/zeux/meshoptimizer/releases) のReleasesから `gltfpack.zip` を落とす。
2. **Blender連携:** 先ほどの「gltfpackへのパス」に、解凍した `gltfpack.exe` を指定する。
3. **Export:** すると、Blenderのエクスポート時に勝手に最強の最適化がかかるようになります。

### R3F側の対応

`gltfpack` (Meshopt) を使う場合、ローダーの設定も少し変わります。

```tsx
import { useGLTF } from '@react-three/drei'
// MeshoptDecoderを追加で読み込む必要が出てくる
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
```

実務（特に数万ポリゴン、数十個のモデルを出す場合）では、このスキルが「サイトが重い！」と言われたときの切り札になります。
