# Phase 4: Smart UI Component Implementation

Web3DポートフォリオのUXを向上させる「スマートロード機能」と「情報パネル」の実装計画です。

## Goal Description

「読み込み中」の体験を洗練させ、かつモデルの詳細情報を自動的に表示する仕組みを構築します。
単純な実装ではなく、実務レベルの「遅延表示（Debounce）」と「自動データ連携（Automation）」を採用します。

## User Review Required
>
> [!NOTE]
> 自動化のため、Blender側での作業（Custom Propertiesの設定）が一部発生します。

## Proposed Changes

### UI Components (Shared)

#### [NEW] [SmartLoader.tsx](file:///c:/Users/25R1116/Documents/Project_Last-Stand/project_last-stand/app/components/SmartLoader.tsx)

- `@react-three/drei` の `useProgress` を使用。
- CSS Animation Delay による「0.5秒未満の非表示」ロジックを実装。
- 3D Canvas内 (`<Html>`) または 2D Overlay (`OverlayUI`) のどちらに配置するかは、パフォーマンスと見た目を考慮して決定（今回はOverlay側推奨）。

#### [NEW] [InfoPanel.tsx](file:///c:/Users/25R1116/Documents/Project_Last-Stand/project_last-stand/app/components/InfoPanel.tsx)

- モデルのメタデータを表示するパネル。
- 親コンポーネントから `userData` を受け取る設計。

### 3D Scene Integration

#### [MODIFY] [Scene.tsx](file:///c:/Users/25R1116/Documents/Project_Last-Stand/project_last-stand/app/components/Scene.tsx)

- `<Suspense fallback={<SmartLoader />}>` でローダーを囲む。

#### [MODIFY] [ManualLoader.tsx](file:///c:/Users/25R1116/Documents/Project_Last-Stand/project_last-stand/app/components/ManualLoader.tsx)

- ロード完了時に `userData` を取得し、State経由で `InfoPanel` に渡す仕組みを追加。

## Verification Plan

### Automated Tests

- なし（Visual Regressionのみ）

### Manual Verification

1. **Network Throttling:** ブラウザの開発者ツールで通信速度を "Slow 3G" にし、ロード画面が表示されるか確認。
2. **Fast Load:** 通常速度でリロードし、ロード画面が一瞬で消える（チラつかない）か確認。
3. **Data Check:** `InfoPanel` にBlenderで設定した文字列が表示されるか確認。

## Results (Execution Log)

- [x] **SmartLoader:** `useProgress()` と CSS `animation-delay` による遅延表示を実装完了。
- [x] **Tailwind Utils:** `lib/utils.ts` (`cn`) を導入し、クラス管理を最適化。
- [x] **State Bridge:** `lib/store.ts` (Zustand) を作成し、3D→2Dのデータ連携パイプを確立。
- [x] **InfoPanel:** コンポーネントを作成し `ViewerLayout` に配置完了。
- [ ] **Next Step:** Blender側でのデータ入力（Injection）を実施予定。
