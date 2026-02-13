# Phase 4.5: Navigator Logic Implementation

**実施日:** 2026-01-30 (訓練校セッション)
**対象:** Navigator System (Dynamic Loading, State Management)

## Goal Description

Canvas内のモデル動的切り替えシステム（Navigator）を構築する。
アセットがまだ存在しない状態でも、プログラムとして「切り替え要求」が正しく発行され、「ロード試行」が行われることを確認する。

## Proposed Changes

### Core Logic

#### [MODIFY] [src/lib/store.ts](file:///c:/Users/25R1116/Documents/Project_Last-Stand/project_last-stand/src/lib/store.ts)

- `ArchiveItem` 型の拡張（UI表示用データ）。
- `AppState` に `targetPath` （ローダー制御用）を追加。

### Components

#### [MODIFY] [ManualLoader.tsx](file:///c:/Users/25R1116/Documents/Project_Last-Stand/project_last-stand/src/app/components/canvas/ManualLoader.tsx)

- `useLoader` の第一引数を固定文字列から `targetPath` (State) に変更。
- これにより、State変更時に自動的に再マウント・再ロードが走るようになる。

#### [MODIFY] [ViewerLayout.tsx](file:///c:/Users/25R1116/Documents/Project_Last-Stand/project_last-stand/src/app/components/layout/ViewerLayout.tsx)

- 'NEXT' ボタンに `setTargetPath("/models/radio.glb")` を接続。

## Verification Results (Execution Log)

- [x] **State Update:** ボタンクリック時に `targetPath` が更新される。
- [x] **Dynamic Fetch:** ブラウザが `/models/radio.glb` を探しに行く（404エラー発生）。
- [x] **Error Boundary:** 404エラーをReactがキャッチし、アプリ全体がクラッシュせずエラー画面を表示する。

> [!NOTE]
> エラー画面が出ることは「正常」である。アセットが無い状態でロジックが正しく動いている証明。
> 次回、アセット (`radio.glb`) を配置すれば、エラー画面の代わりにモデルが表示される。
