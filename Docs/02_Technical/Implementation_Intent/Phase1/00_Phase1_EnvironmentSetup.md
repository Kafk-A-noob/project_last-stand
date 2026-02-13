# 00_Phase1_EnvironmentSetup

## 実施内容
Next.js (App Router) プロジェクトの初期化と、React Three Fiber (R3F) の導入。
および、Unityにおける「Empty Scene」に相当する初期構成 (`page.tsx` + `Scene.tsx`) の構築。

## 実装・設計の意図 (Implementation Intent)

### 1. Next.js + App Router の採用
- **Unityでの翻訳:** ゲームエンジン本体 (Unity Editor) の選定。
- **理由:** 
  現在のWeb開発標準であり、Vercelへのデプロイ（Web公開）が最も容易であるため。
  また、App Routerはファイルシステムベースのルーティングを提供し、ディレクトリ構造がそのままURLになるため、UnityのAssetsフォルダ管理と思考モデルを一致させやすい。

### 2. Client Component (`use client`) の分離
- **コード:** `page.tsx` (Server) から `Scene.tsx` (Client) を動的インポート。
- **Unityでの翻訳:** サーバーサイド処理（PHP等）とクライアントサイド描画（WebGL）の分離。
- **理由:** 
  Unity (WebGL) はブラウザ上でしか動作しません。一方、Next.jsはデフォルトでサーバーサイドレンダリング(SSR)を行おうとします。
  `ssr: false` で読み込むことで、「サーバーで3Dを描画しようとしてエラーになる」事故を防いでいます。

### 3. Canvasコンポーネントの独立 (`Scene.tsx`)
- **Unityでの翻訳:** `.unity` ファイル（シーン）の作成。
- **理由:** 
  HTML要素（UI）と、WebGLキャンバス（3D空間）を混在させるとコードが肥大化します。
  `Scene.tsx` を独立させることで、このファイル内は「純粋な3D空間」として扱えるようになり、UnityのHierarchyウィンドウと同じ感覚でコンポーネントを配置できます。

### 4. `<OrbitControls />` の導入
- **Unityでの翻訳:** Editor上のSceneビュー操作、またはFPSController。
- **理由:** 
  2DのWeb開発と異なり、3Dでは「視点移動」ができないとデバッグが不可能です。
  開発初期段階からこれを導入することで、作成したモデルを全角度から検証できる環境を担保しました。
