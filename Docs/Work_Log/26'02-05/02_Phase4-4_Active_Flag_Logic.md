# Phase 4.4: Active Flag Logic

`asset-manifest.ts` に追加された `active: boolean` フラグを使用して、未実装のモデルを選択できないようにUIを制御します。
これにより、404エラーを防ぎ、「Coming Soon」感を演出します。

## 修正対象ファイル

- **Path:** `src/app/components/layout/ViewerLayout.tsx`

## 実装内容

`.map()` ループ内のボタン生成ロジックを変更します。

### 変更前 (Before)
```tsx
{ASSET_MANIFEST.map((item) => (
  <button
    key={item.id}
    onClick={() => setTargetPath(item.path)}
    className={cn(
      // ... (スタイル定義)
    )}
  >
    [ {item.name} ]
  </button>
))}
```

### 変更後 (After)

1.  `active` フラグをチェックするロジックを追加。
2.  `active` が `false` の場合：
    - クリックイベントを無効化（または別のアクションに変更）。
    - スタイルを変更（グレーアウト、ポインターイベント無効化）。

```tsx
{ASSET_MANIFEST.map((item) => { // () ではなく {} ブロックにする
  const isLocked = !item.active; // ロック状態判定

  return (
    <button
      key={item.id}
      disabled={isLocked} // disabled属性を付与
      onClick={() => {
        if (!isLocked) {
          setTargetPath(item.path);
        }
      }}
      className={cn(
        "px-6 py-2 text-xs border rounded transition-all",
        // Active Style
        !isLocked && "bg-white/5 text-cyan-200 border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 active:scale-95",
        // Locked Style
        isLocked && "bg-black/20 text-gray-600 border-gray-800 cursor-not-allowed opacity-50"
      )}
    >
      [ {item.name} {isLocked && <span className="text-[10px] ml-1">OFFLINE</span>} ]
    </button>
  );
})}
```

### ポイント
- `disabled={isLocked}`: HTML標準の無効化属性。
- `isLocked && ...`: 論理積で条件付きレンダリングを行い、"OFFLINE" などのバッジを表示する。
- スタイリング: グレー (`text-gray-600`) や `cursor-not-allowed` で視覚的に「押せない」ことを伝える。
