# Implementation Intent: Phase 4.4 Active Flag Logic

**Phase:** Phase 4.4 (UI Refinement)
**Date:** 2026-02-06
**Target:** `src/app/components/layout/ViewerLayout.tsx`

## 1. 設計意図 (Design Intent)

### なぜこの変更を行ったか？

アプリの堅牢性とユーザー体験(UX)を向上させるため。
以前の状態では、`asset-manifest.ts` に未実装のアイテム（`active: false`）があっても、ボタンが表示され、クリックすると「404 (Not Found)」エラー、または無限ロードが発生する状態であった。

これは「期待値の不一致」を招くバグに近い挙動であるため、明示的に「未実装である」ことをUIで表現し、操作を無効化する必要があった。

### 採用した解決策: "Inactive Lock Pattern"

- **サーバーサイド/ビルドタイムでの除外ではなく、クライアントサイドでの表示制御を採用。**
- 理由:
  - 完全に非表示にすると「何が実装予定なのか」がわからない。
  - 「ボタンはあるが押せない（Coming Soon）」状態の方が、開発の進捗感やポートフォリオとしてのスケール感を伝えられるため。

## 2. 実装詳細 (Technical Details)

### Logic

```typescript
{ASSET_MANIFEST.map((item) => {
  const isLocked = !item.active; // Boolean反転で直感的に扱える変数名に
  return (
    <button disabled={isLocked} ... /> // HTML標準属性を使用
  )
})}
```

### Styling (Tailwind CSS)

- **Active:** `hover:bg-cyan-500/20` (サイバーパンク的な発光感)
- **Locked:** `cursor-not-allowed opacity-50` (物理的に押せない感の演出)
- **Badge:** `{isLocked && <span>OFFLINE</span>}` による明示的なステータス表示。

## 3. デバッグ戦略 (Debug Strategy)

- **Verify:** `asset-manifest.ts` の `active: true` を `false` に書き換えて、即座にボタンがロックされるか確認済み。
- **Safety:** 万が一ロックをすり抜けても `setTargetPath` が呼ばれないよう、onClick内部でも `if (!isLocked)` ガードを入れている。
