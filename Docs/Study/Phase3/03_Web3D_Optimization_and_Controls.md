# Phase 3 Study: Web3D Optimization & Controls (Strict Training)

本ドキュメントは、**実務レベルのWeb3D品質** を担保するための最適化理論と制御手法を、Unityエンジニア向けに統合・再編集したものです。

## 1. Camera Controls (操作性の最適化)

Web3Dでは、ユーザーはBlenderのような複雑な操作を知りません。「見せたいもの」だけを確実に見せる制限が必要です。

### Disable Pan (平行移動の禁止)

- **問題:** 右ドラッグ（平行移動）でモデルを画面外に飛ばしてしまい、「消えた！」と焦るユーザーが多発する。
- **対策:** `enablePan={false}`
- **コード:**

  ```tsx
  <OrbitControls makeDefault enablePan={false} />
  ```

- **Unity訳:** Cameraの動きを制限し、LookAtターゲットを固定する処置です。

---

## 2. Optimization Theory (軽量化の理論)

Webサイトが「重い」と感じる原因と対策のまとめです。

### A. Payload (通信量)

- **敵:** 巨大な `.glb`、4Kテクスチャ。
- **武器:** **Draco圧縮** / **Meshopt圧縮**。
- **Unity比:** Unityの `Mesh Compression: High` よりもさらに強力です。

### B. Rendering (描画負荷)

- **敵:** ドローコール (DrawCalls)、ポリゴン数。
- **武器:** **Instancing** (同じメッシュの使い回し)、**Texture Atlas** (マテリアル統合)。

### C. CPU (処理負荷)

- **敵:** Reactの無駄な再レンダリング。
- **武器:** `useMemo` (計算結果のキャッシュ)。

---

## 3. The "gltfpack" (実務の標準)

Blender 5.0 (Exporter 5.0) から統合が強化された、最強のCLIツールです。

| ツール | 特徴 | 評価 |
| :--- | :--- | :--- |
| **Blender標準 (Draco)** | 高圧縮だが、展開(Decode)が遅い。スマホで一瞬固まる。 | △ (個人制作ならOK) |
| **gltfpack (Meshopt)** | **推奨。** ファイルサイズはDraco並みで、**展開が爆速**。 | ◎ (実務標準) |

### 使い方

Blenderのエクスポート後に、コマンドラインで以下を実行します（またはBlenderの設定でパスを通す）。

```bash
gltfpack -i input.glb -o output.glb -cc
```

- `-cc`: Meshopt圧縮を有効にするオプション。

### R3Fでの対応

Meshoptを使う場合は、ローダーに追加のデコーダーを渡す必要があります。

```tsx
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
// useGLTFが自動対応していない場合は、GLTFLoaderに設定する必要あり
```

---

## 4. Lighthouse Score

Google Chrome標準のパフォーマンス計測ツール。
Web制作の現場では、このスコア（Performance, Accessibility, SEO...）が「納品品質」として扱われることがあります。
Phase 3の後半では、このスコアを「オールグリーン（90点以上）」にすることを目標にします。
