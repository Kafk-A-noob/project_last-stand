# Bug Fix: Deployment Issues (UI Sync & Error Styling)

**Date:** 2026-02-12
**Status:** Planning

## 1. 現状の問題 (Current Issues)

### A. UI更新の遅延 (Stale UI)

- **現象:** `Next` ボタンを押しても、モデルのロードが完了するまで画面下のテキスト（名前など）が変わらない。404エラー（モデル不在）の場合は永遠に変わらない。
- **原因:** `currentModel` の更新を `ManualLoader` (3D側) の `useEffect` に依存させているため。「3Dが表示されて初めてデータが確定する」ロジックになっている。
- **重要度:** High (UXとして壊れている)

### B. エラー表示の崩れ (Broken Error UI)

- **現象:** 3Dモデル読み込み失敗時、赤いエラー文字が画面左上に表示され、タイトルロゴと重なって読みづらい。
- **原因:** `ErrorBoundary` の `fallback` UI に配置指定（CSS）がなく、標準フローで左上に表示されているため。また `z-index` が `ViewCanvas` (z-0) 内にあるため、UIレイヤーの下に潜り込んでいる可能性がある。
- **重要度:** Medium (見栄えが悪い)

---

## 2. 解決策 (Solution Strategy)

### A. 楽観的UI更新 (Optimistic UI Update) to `store.ts`

**概念翻訳 (Unity):**
> 武器切り替えボタンを押した瞬間、実際にモデルがロードされるのを待たずに、画面右下の「武器アイコン」と「名称」だけ先に切り替えてしまう処理。

**実装方針:**

- `goToNext` / `goToPrev` アクション内で、リストから次のデータを取得し、**即座に** `currentModel` を更新する。
- 3Dローダー (`ManualLoader`) は、「モデルデータのセット」という役目を終え、「ロード完了通知 (`setIsLoaded(true)`)」のみに専念させる。

### B. エラー表示の絶対配置 (Absolute Positioning)

**概念翻訳 (Unity):**
> エラー用のCanvasを `Screen Space - Overlay` にし、`RectTransform` で `Center` に固定する。

**実装方針:**

- `ViewCanvas.tsx` の `ErrorBoundary` fallback に `absolute top-1/2 left-1/2` 等のクラスを付与し、画面中央に浮かせる。
- 背景色をつけて読みやすくする。

---

## 3. 実装手順 (Implementation Steps)

### Step 1: `src/lib/store.ts` の改修

- `setIsLoaded` アクションを追加。
- `goToNext` / `goToPrev` 内で `currentModel` を更新するロジックに変更。

### Step 2: `src/app/components/canvas/ManualLoader.tsx` の簡素化

- `setModelData` を廃止し、`setIsLoaded(true)` に置き換え。
- モデル内のメタデータ（名前など）を読み取る機能は一旦オミットする（マニフェストファイルを正とするため）。

### Step 3: `src/app/components/ui/InfoPanel.tsx` の条件緩和

- `isLoaded` を待たずに、`currentModel` があれば表示するように変更（テキストは即座に出す）。

### Step 4: `src/app/components/canvas/ViewCanvas.tsx` のスタイル修正

- 赤い文字を画面中央の警告ウィンドウ風にスタイリング。

---

## 4. 学習ポイント (Learning Objectives)

- **Single Source of Truth (信頼できる唯一の情報源):**
  - 今までは「GLTFファイルの中身」と「Manifestファイル」のどっちが正しい情報なのか曖昧でした。
  - 今回の修正で「Manifestファイル (`asset-manifest.ts`)」を正とし、UIはそれを表示する、という形に統一します。
- **Optimistic UI:**
  - ユーザーの操作に対して即座にフィードバック（文字が変わる）を返し、重い処理（3Dロード）は裏で回す、というWebフロントエンドの定石です。
