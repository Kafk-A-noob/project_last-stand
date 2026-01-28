# 業務日報: Phase 3 Launch (26'01-28)

**Project:** Last Stand
**Phase:** 3.0 (Portfolio Construction)
**User:** KafkA

---

## 1. 実施内容 (Achievements)

本日は **「Phase 3: ポートフォリオ本制作」** のキックオフを行い、サイトの顔となる **Overlay UI (ViewerLayout)** の実装を完了しました。

- **[x] Strict Training Mode の導入**
  - ファイル丸ごとの生成を廃止し、「スニペット提示 → 解説 → 手動写経」のプロセスへ移行。
  - これにより、コードの構造と意味をより深く理解しながら開発する体制を確立しました。

- **[x] ViewerLayout の構築**
  - `pointer-events-none` を活用した「3Dシーンを邪魔しない操作レイヤー」を実装。
  - フィクション性の高い「Digital Laboratory」テーマのヘッダー・フッターを構築。
  - ハッカー風の演出テキスト (`// TERMINAL_ACCESS...`) を実装。

- **[x] リファクタリング**
  - `page.tsx`: 古い実験コード（色変えボタン等）を削除し、`ViewerLayout` ベースの構成へ刷新。
  - `Scene.tsx` / `ReactLogo.tsx`: 不要になった `Props` (color) を削除し、コンポーネントを疎結合化。

## 2. 技術的学び (Technical Learnings)

### A. Overlay UI Pattern (Unity翻訳)

- **`absolute inset-0 z-10`:** 全画面Canvas (`Screen Space - Overlay`) に相当。
- **`pointer-events-none`:** Canvas Group の `Blocks Raycasts: False` (または Panel の `Raycast Target: False`)。
- **`pointer-events-auto`:** ボタン類に個別に付与することで、そこだけ `Raycast Target: True` にするテクニック。
- **効果:** これにより「背景の3Dモデルを回しながら、手前のボタンも押せる」UIが実現しました。

### B. Next.js Hydration Error

- **事象:** `className` の文字列を途中で改行したことにより、サーバー(SSR)とクライアントで属性値の不一致が発生。
- **教訓:** `className="foo bar..."` は（テンプレートリテラルを使わない限り）1行で書くのが安全。

### C. JSX Syntax

- **コメント:** JSX内では `//` は文字として扱われるため、`{/* ... */}` で囲む必要がある。
- **文字としての記号:** 逆に `//` を文字として出したい場合は、`{"// Text"}` のように文字列として評価させる。

## 3. 次回の予定 (Next Steps)

- **Blender作業:**
  - ポートフォリオに展示する「本番用アセット」の選定と作成。
  - 現在の `ReactLogo` に代わる、あなたの "Last Stand" を象徴するモデルの配置。

---
*End of Report*
