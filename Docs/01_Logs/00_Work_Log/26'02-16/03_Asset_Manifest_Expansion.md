# 作業ログ: Asset Manifest Expansion

**日付:** 2026-02-16
**Status:** Done
**Type:** Data Entry / Refinement

## 1. 現状確認と目的

`src/config/asset-manifest.ts` を確認したところ、既に以下のモデル定義が存在しますが、いくつかの情報が不足しています。

- **既存エントリー:** Piano, Coffee, Acoustic Guitar, Mug, Camera, Game Boy, Lantern, Family Photo
- **不足情報:**
  1. **`techSpecs` (File Size):** 先ほど実装した SmartLoader 用の手動サイズ定義がありません。
  2. **`Family Photo` の Narrative:** `quote`, `description` が空欄です。
  3. **`techSpecs` (Others):** ポリゴン数なども未定義（今回は任意）。

本作業では、これらの不足情報を埋め、将来的なモデル実装に備えます。

## 2. 実装手順 (Manual Execution)

`src/config/asset-manifest.ts` を編集し、以下の変更を適用してください。

### A. TechSpecs の追加 (All Items)

全てのアイテムに `techSpecs: { fileSize: "TBD" }` (または推定値) を追加してください。
これにより、将来 `active: true` にした際、SmartLoaderが「TBD」と表示するようになり、"0 / 0 MB" 問題を回避できます。

### B. Family Photo の Narrative 追加

以下はサンプル案です。お好みのテキストに変更しても構いません。

```typescript
    {
    id: "item-009-Family_Photo",
    active: false,
    name: "Family Photo",
    path: "/models/family_photo.glb",
    // [Edit]
    quote: "記憶は薄れるけれど、記録は色褪せない。",
    description: "笑顔のままで時が止まった、唯一の家族写真。",
    contributor: "ひるねこ",
    // [Add]
    techSpecs: {
      fileSize: "TBD",
    },
  },
```

### C. ファイルサイズの仮入力 (Optional)

もし他のモデルのおおよそのサイズ（ターゲット）が決まっていれば、`"10 MB"` などのように記述しておくと、モデリング時の目標値になります（Budgeting）。
未定の場合は `"TBD"` (To Be Determined) でOKです。

## 3. 次のステップ

この編集が完了したら、タスクリストの「Asset Manifest Expansion」を完了とします。
モデルファイル (`.glb`) が完成次第、`active: true` に変更し、パスと正確なファイルサイズを更新する運用となります。
