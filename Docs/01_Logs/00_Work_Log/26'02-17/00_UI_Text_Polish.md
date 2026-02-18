# 作業ログ: UI Text Polish

**日付:** 2026-02-17
**Status:** Done
**Type:** Refactoring / Best Practice

## 1. 課題 (The Problem)

`asset-manifest.ts` にて、モデル管理のために `name` に番号（`00_`, `01_`）を含めた結果、UI（InfoPanelやメニュー）にもそのまま表示されてしまっている。
これを解決するために「文字列操作で番号を消す処理」をコードに追加しようと考えているが、それが最善手か悩んでいる。

## 2. 解決策: Data Separation (Separation of Concerns)

**「コードで頑張る」のではなく、「データを正しく定義する」** のが最善手（Best Practice）です。

Unityの概念で例えると：

- **Project View (File Name):** `00_Radio.fbx` (管理用。番号付きでOK)
- **Hierarchy / Inspector (Display Name):** `Radio` (表示用。番号なし)

この2つは本来「別物」です。Manifestでもこれらを明確に分けます。

### 変更案

`asset-manifest.ts` の `name` プロパティを **「画面に出したい文字そのもの」** に書き換えます。
ファイルパス (`path`) や ID (`id`) に番号が残っていても、UIには一切影響しません。

## 3. 実装手順 (Manual Execution)

`src/config/asset-manifest.ts` を開き、`name` プロパティだけを修正してください。

### Before

```typescript
  {
    id: "item-001-radio",
    name: "01_Radio",         // <--- ここがUIに直結している
    path: "/models/01_radio.glb",
    // ...
  },
```

### After (Proposed)

```typescript
  {
    id: "item-001-radio",       // IDで管理順序を維持
    name: "Radio",              // UIにはきれいな名前を表示
    path: "/models/01_radio.glb", // ファイル名は管理しやすいままでOK
    // ...
  },
```

### 作業リスト

以下の `name` を修正してください。

- `00_React_Logo` -> `React Logo`
- `01_Radio` -> `Radio`
- `02_Piano` -> `Piano`
- `03_Can_Coffee` -> `Can Coffee` (アンダースコアもスペースに直すとより良い)
- `04_Acoustic_Guitar` -> `Acoustic Guitar`
- `05_Favorite_Mug` -> `Favorite Mug`
- `06_Camera` -> `Camera`
- `07_Game_Boy` -> `Game Boy`
- `08_Lantern` -> `Lantern`
- `09_Family_Photo` -> `Family Photo`

## 4. なぜコードで解決しないのか？ (Why not regex?)

「プログラマ三大美徳（怠慢）」に基づき、**「書かなくていいコードは書かない」** のが正義だからです。
もし `name: "01_Radio"` のままコード側で `substring` で加工しようとすると：

1.  **バグの温床:** `10_Item` (2桁) になったら？ `Item_Name` (番号なし) が来たら？
2.  **計算コスト:** 毎フレーム（ではないが）無駄な文字列処理が走る。
3.  **可読性:** UIコンポーネントが汚れる。

データ側（Manifest）を直す方が、シンプルで堅牢（Robust）です。
