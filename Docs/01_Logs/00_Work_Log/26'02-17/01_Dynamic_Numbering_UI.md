# 作業ログ: Dynamic Numbering UI

**日付:** 2026-02-17
**Status:** Done
**Type:** UI Polish

## 1. 目的

`NavigationMenu` において、モデル名の頭文字（R, P...）ではなく、データ順に基づいた「連番 (00, 01...)」を表示することで、サイバーパンクな一覧性を高める。
これにより、Manifestの `name` プロパティに番号を含める必要がなくなり、データ管理がクリーンになる。

## 2. 実装手順 (Manual Execution)

`src/app/components/ui/NavigationMenu.tsx` を編集します。
`map` 関数の第二引数 `index` を利用して、番号を生成します。

### [Diff] NavigationMenu.tsx

```tsx
// [Change] mapの引数に index を追加
// Before: {ASSET_MANIFEST.map((item) => {
// After:
{ASSET_MANIFEST.map((item, index) => {
  const isLocked = !item.active;

  // ... (省略) ...

  return (
    <button
      // ... (省略) ...
    >
      <div className="text-xl font-bold">
        {/* [Change] Lock時は「?」、それ以外は「00, 01...」を表示 */}
        {isLocked
          ? "?"
          : index.toString().padStart(2, "0")
        }
      </div>

      {/* Nameはそのまま表示（番号なしのきれいな名前） */}
      <div className="text-xs text-center">{item.name}</div>
```

## 3. 解説 (Technical Note)

- **`index`:** 配列の何番目か（0始まり）。
- **`toString()`:** 数値を文字列に変換。
- **`padStart(2, "0")`:** 「2桁になるまで左側を"0"で埋める」というStringメソッド（ES2017）。
  - `1` -> `"01"`
  - `10` -> `"10"`

これにより、Manifestの並び順を変えるだけで、自動的にUI上の番号も更新されるようになります。
