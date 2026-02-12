# Proposal: Auto-Fix Deployment Issues

**Date:** 2026-02-12
**Target:** `src/app/components/layout/ViewerLayout.tsx`, `public/models/React_Logo.glb`

現状のデプロイエラーとUI不具合を、AIが直接修正するための計画です。
承認いただければ、以下の操作を自動で行います。

## 1. Menu Architecture Fix (ViewerLayout.tsx)

メニューが他のUI要素の下敷きにならないよう、DOM構造を変更します。

- **Action:** `<NavigationMenu />` を `pointer-events-none` のコンテナの外側に移動。

## 2. Model Asset Fix (Rename)

コードが参照しているファイル名と、実ファイルの不一致を解消します。

- **Action:** `public/models/React_Logo.glb` を `radio.glb` にリネーム。
- **Result:** これにより、アプリは「Radio」としてロゴを表示できるようになり、クラッシュが解消します。

## 3. Deployment (Git Push)

修正をコミットし、`main` ブランチにプッシュします。
Vercelは自動的にこれを検知し、数分後に修正版が公開されます。

---

**Execution:**
許可をいただければ、即座に実行します。
