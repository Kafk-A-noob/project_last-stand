# 実装計画: Phase 3 UI構築開始 (Strict Training)

## Goal Description

「Virtual Showroom」の基盤となるUIレイアウトを構築する。
本日は「全画面3Dキャンバス」の上に、「モダンなオーバーレイUI」を配置する構造を作成する。
**Strict Training Mode** により、コードは断片的に提示し、ユーザーが手動で入力・理解することを目的とする。

## User Review Required
>
> [!IMPORTANT]
> **Strict Training Mode Active**
> コピペ禁止。提示されたコードを一行ずつ確認し、手動で入力すること。

## Proposed Changes

### 1. UI Layout Architecture (Concept)

Unityでいう「Canvas (Render Mode: Screen Space - Overlay)」に相当するレイヤーを作成する。

- `Canvas` (3D Scene) : 背景レイヤー (World Space)
- `HTML/CSS` (Overlay) : 手前のUIレイヤー (Screen Space)

### Components

#### [NEW] `components/OverlayUI.tsx`

- Tailwind CSS を使用し、絶対配置 (`absolute`) で画面の四隅にUIを配置するコンテナ。

## Verification Plan

- ブラウザ画面において、3Dモデル（React Logo）の手前に文字やボタンが表示されていること。
- ボタンを押しても3D側のOrbitControlsが反応しない（イベントが吸われる）ことを確認、または意図的に透過させるか制御する。
