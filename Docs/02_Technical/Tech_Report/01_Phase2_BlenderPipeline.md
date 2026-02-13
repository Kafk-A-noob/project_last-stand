# Phase 2 技術レポート: Blender to Web パイプライン

## 1. 成果物 (Outcome)

- **React Logo Asset:** Blenderで作成した「Atom形状」のロゴを表示。
- **Interaction:** マウス操作による視点移動 (`OrbitControls`)。
- **Behavior:** カメラ追従 (`Billboard`) + 浮遊回転アニメーション。

## 2. 技術的課題と解決 (Troubleshooting Log)

今回の実装で直面した2つの大きな「落とし穴」は、Web3D開発における非常に重要なケーススタディです。

### A. WebGL Context Lost (React Strict Mode問題)

- **現象:** ページを開くと「Context Lost」エラーでクラッシュする。
- **原因:** React 18の `Strict Mode` (開発用機能) が、コンポーネントをわざと2回マウントする。これによりThree.jsの `WebGLRenderer` が短時間に多重生成され、GPUリソースが競合・枯渇した。
- **解決:** `next.config.ts` で `reactStrictMode: false` に設定。
- **教訓:** **R3F開発では Strict Mode をOFFにするのが定石。**

### B. GLB Compression (Draco対応の追加)

- **状況:** Blender側で圧縮設定が見つからなかった（未設定）。
- **対応:** 将来的に圧縮ファイル(`Draco`)を扱う可能性を考慮し、コード側で `useGLTF(path, true)` を設定。
- **効果:** これにより、Blender側で圧縮をONにしてもOFFにしても、どちらでも読み込める堅牢なコードになった。

## 3. 使用した重要なコンポーネント

### `@react-three/drei`

R3Fを補完する「便利なユーティリティ集」。基本的にこれを使って楽をします。

| コンポーネント | 機能 | 今回の用途 |
| :--- | :--- | :--- |
| **useGLTF** | glTFローダー | 外部ファイル (.glb) の非同期読み込みとキャッシュ。 |
| **Clone** | 複製インスタンス | 読み込んだ `scene` データを安全に複製して表示。単純な `<primitive>` だとキャッシュ参照でバグることがあるため、こちらが推奨される。 |
| **Billboard** | ビルボード | 中身を常に「カメラの方」に向ける。UIやアイコン的表現に必須。 |
| **Center** | 自動センタリング | モデルのバウンディングボックスを計算し、強制的に原点(0,0,0)に配置する。Blenderでの原点ズレ事故を防ぐ保険。 |

## 4. Blender Export Checklist (保存版)

今後アセットを追加する際は、以下の設定を確認してください。

1. **Format:** glTF Binary (`.glb`)
2. **Include:** `Limit to Selected Objects` にチェック (ゴミデータ混入防止)
3. **Mesh:** `Apply Modifiers` にチェック (ミラーなどを確定)
4. **Compression:**
    - 基本は **OFF** でOK。
    - **ON** にする場合、コード側で `useGLTF(path, true)` とする。

---
**Next Step:**
このパイプラインを使えば、展示台、キャラクター、エフェクトなど、好きなものをBlenderからWeb空間に「転送」できます。
Phase 3では、これらを組み合わせて「ポートフォリオ空間」全体を構築します。
