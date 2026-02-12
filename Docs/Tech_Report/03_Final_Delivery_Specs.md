# Tech Report: Final Delivery Specifications [Phase 5]

**Target:** Dwango Frontend Engineer (Performance Oriented)
**Project:** Last-Stand (Web3D Portfolio)
**Artifact ID:** 03_Final_Delivery_Specs

本書は、「Project: Last Stand」を最短でデプロイし、かつ採用担当者に「Webパフォーマンスへの配慮」をアピールするための厳格な要件定義書である。

---

## 1. Blender to R3F Export Strategy (ID-001: Radio)

Webブラウザ（特にモバイル）での快適な動作を保証するための「あえての制約」を設ける。
「High Quality」とはポリゴン数ではなく、「意図された通りに動くこと」である。

### Geometry (形状)

- **Polygon Count:**
  - **目標 (Target):** `10,000 ~ 20,000 tris` (クオリティ重視の主役級プロップとして適切)
  - **下限 (Low):** `5,000 tris` 以下 (背景用。アップで見るとカクつきが目立つかも)
  - **上限 (Limit):** `50,000 tris` (これを超えるとモバイルで重くなる "絶対防衛ライン")
  - **確認方法(Japanese UI):**
    - 3Dビューポート右上の「○が重なったアイコン (オーバーレイ)」をクリック。
    - **「統計 (Statistics)」** にチェックを入れる。
    - 左上に出る **「三角形面 (Triangles)」** の数値を見る。ここが `50,000` 以下なら合格。
- **Topology:**
  - 全て `Triangulate` (三角形化) してからエクスポートすること（予期せぬ変形を防ぐため）。
  - UVは重ならないように展開すること（Lightmap/AO焼き込み用）。

### Material & Texture (質感)

- **PBR Standard:** `Principled BSDF` のみを使用。
- **Texture Packing (重要):**
  - ドローコール削減のため、テクスチャは可能な限りまとめる。
  - **ORM Map:** `Occlusion(R)`, `Roughness(G)`, `Metalness(B)` を1枚の画像にチャンネルパッキングする。
    - これにより、テクスチャ枚数を `BaseColor`, `ORM`, `Normal`, `Emissive` の4枚に抑えられる。
- **Resolution:**
  - **Max:** `2048x2048` (Hero Prop)
  - **Sub:** `1024x1024` (Details)
  - 形式: `png` または `jpg` (WebP/KTX2は今回は導入コスト対効果が薄いため見送り)。

### Format & Compression (形式)

- **File Format:** `.glb` (Binary glTF)
- **Compression:** **Draco圧縮を必須とする。**
  - 理由: ファイルサイズを劇的に（1/10程度に）削減できるため。ロード時間の短縮はUXに直結する。
  - 設定: Blenderのエクスポート設定で `Compression` > `Draco` をON。

---

## 2. Next.js Deployment Requirements (DevOps)

最短かつ堅牢なデプロイフローを定義する。

### Hosting Service

- **Platform:** **Vercel** (Recommended)
  - 理由: Next.jsの開発元であり、設定不要(Zero Config)で最適化される。基本無料。
  - `git push` するだけで自動デプロイされる体験は、開発スピードを最大化する。

### Build Configuration

- **Command:** `npm run build`
- **Output:** `.next` (Default)
- **Environment Variables:**
  - 現状の構成では **不要** (Static Export / Client-side Logic only)。
  - 将来的にAPIキー等が必要になった場合はVercelのダッシュボードで設定。

### Pre-Deployment Check

デプロイ前に自身のPCで以下を必ず実行すること。

```bash
npm run build
npm run start
```

これでエラーが出なければ、Vercelでも動く。

---

## 3. Emergency Work Flow (Tonight's Mission)

「今夜中にURLを発行し、知人に連絡」するための最短ルート。

### Step 0: 準備 (Commit & Approval)

1. `task.md` の承認チェックボックスを `[x]` にする（最重要）。
2. 現状のコードを全てコミットする。

   ```bash
   git add .
   git commit -m "feat: Ready for Phase 5"
   ```

### Step 1: モデル仮置き (Placeholder)

「モデルが出来てからデプロイ」では遅い。**「デプロイしてからモデルを差し替える」** のが正解。

1. `public/models/radio.glb` が無ければ、適当なCubeか、既存の `logo.glb` 等をコピーしてリネームして配置する。
2. これで「サイトとして機能する」状態を作る。

### Step 2: Vercel連携 (Launch)

1. GitHubへプッシュ: `git push origin main`
2. Vercel公式サイトへ行き、`Add New...` > `Project`。
3. GitHubリポジトリ `project_last-stand` を選択。
4. 設定はいじらず `Deploy` ボタンを押す。
5. **完了。** URLが発行される（例: `project-last-stand.vercel.app`）。

### Step 3: モデリング & 差し替え (Iterate)

1. Blenderで `Radio` を作り込む（スペック遵守）。
2. エクスポートして `public/models/radio.glb` を上書き。
3. コミット & プッシュ。
4. **Vercelが勝手に更新してくれる。**

このサイクルこそが、最強の開発フローである。
