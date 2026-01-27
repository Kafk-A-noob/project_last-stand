# 実装計画書 (2026-01-24)

## Phase 1: 環境構築 (手動実行モード)

### 概要

本計画書は、Phase 1「基礎と開眼」における初期環境構築の手順を定義します。
Next.jsの初期化時における既存ファイル競合エラー (`.agent`, `.cursorrules` 等) を回避するため、一時的な退避手段を追加しました。

### 実行対象

- **ターゲット:** プロジェクトルート (`D:\KafkA\Documents\project_last-stand`)
- **目的:** Next.js + React Three Fiber (R3F) 環境の確立

### 実行手順 (User Actions)

#### 1. プロジェクトの初期化 (Next.js Init)

Unityで例えるなら「新しいプロジェクトの作成」です。

**実行コマンド:**

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

- **期待される結果:**
  - カレントディレクトリに Next.js のファイル群が生成される。
  - `package.json`, `tsconfig.json`, `tailwind.config.ts`, `app/` などが作成される。
  - ※既存ファイルとの競合警告が出た場合は、指示を仰いでください。

#### 1. プロジェクトの初期化 (完了)

- **Status:** [x] Done
- **Result:** Next.js initialized, files restored.

#### 2. 3Dエンジンのインストール (Dependencies)

Unityで例えるなら「Core Engine」と「Standard Assets」のインポートです。

**実行コマンド (上記完了後):**

```powershell
npm install three @types/three @react-three/fiber @react-three/drei
```

- **パッケージ解説:**
  - `three`: レンダリングエンジン本体
  - `@react-three/fiber`: ReactコンポーネントとしてThree.jsを扱うためのブリッジ
  - `@react-three/drei`: カメラ、コントロール、環境光などの便利なプリセット集

- #### 2. 3Dエンジンのインストール (完了)

  - **Status:** [x] Done
  - **Result:** `three`, `@react-three/fiber`, `@react-three/drei` installed.

#### 3. クリーンアップと構成 (Scene Setup)

Unityで例えるなら「SampleScene」の初期化です。

- **予定作業:**
  - [`app/page.tsx`] を空の Canvas 構成に変更。
  - [`app/components/Scene.tsx`] を作成し、シーンロジックを分離。

**目標:** 余計なHTMLを削除し、Unityでいう「空のシーン」を作成します。

**Step 3-A: `app/page.tsx` の編集 (Main Scene)**
- **作業内容:** デフォルトのHTMLを全て消し、`Scene` コンポーネントだけを配置します。
- **コード案 (Implemented):**

    ```tsx
    import dynamic from 'next/dynamic'
    const Scene = dynamic(() => import('./components/Scene'), { ssr: false })
    export default function Home() {
      return (
        <main className="h-screen w-full bg-black">
          <Scene />
        </main>
      )
    }
    ```

**Step 3-B: `app/components/Scene.tsx` の作成 (Scene Hierarchy)**
- **作業内容:** 新規ファイルを作成し、3D空間 (`Canvas`) を定義します。
- **コード案 (Implemented):**

    ```tsx
    'use client'
    import { Canvas } from '@react-three/fiber'
    import { OrbitControls } from '@react-three/drei'
    export default function Scene() {
      return (
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          <mesh rotation={[0.5, 0.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </Canvas>
      )
    }
    ```

- #### 3. クリーンアップと構成 (完了)

  - **Status:** [x] Done
  - **Result:** `page.tsx` updated, `Scene.tsx` created.

### 検証計画

- `npm run dev` でローカルサーバーを起動。
- ブラウザで `http://localhost:3000` を開き、**「黒い背景に赤いCube」** が表示され、マウスドラッグで回せることを確認する。
