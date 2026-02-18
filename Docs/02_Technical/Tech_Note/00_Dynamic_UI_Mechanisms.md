# Tech Note: Dynamic UI Mechanisms

**日付:** 2026-02-17
**Tags:** Next.js, R3F, UI/UX, Data-Driven

## 1. 概要 (Overview)

Project Last Stand において実装された、**「データ駆動型UI (Data-Driven UI)」** の核心となるメカニズムについて解説する。
特に、以下の2点に焦点を当てる。

1. **SmartLoader:** マニフェスト情報を活用した、サーバーレス環境でも正確なローディング表示。
2. **Dynamic Numbering:** データ管理とUI表示の分離（Separation of Concerns）による、メンテナンス性の高い自動採番システム。

## 2. SmartLoader Mechanism

### 課題 (Problem)

Vercel等のサーバーレス環境や、特定のCDN経由では、GLBファイルの `Content-Length` ヘッダーが正しく取得できず、Unityのような「プログレスバー (0/0 MB)」が表示できない（`Total`が0または不正確になる）問題があった。

### 解決策 (Solution)

`asset-manifest.ts` に **手動のファイルサイズ定義 (`techSpecs.fileSize`)** を持たせ、ローダー側でそれを強制的に使用するフォールバックロジックを実装した。

```typescript
// src/app/components/ui/SmartLoader.tsx

const currentModel = useStore((state) => state.currentModel);
const manualSize = currentModel?.techSpecs?.fileSize; // "0.98 MB"

// 手動定義があるならそれを分母として表示
const displayTotal = manualSize ? manualSize : total > 0 ? toMB(total) : null;
```

これにより、HTTPヘッダーに依存せず、**常に「設計通りのサイズ」をユーザーに提示** できるようになった。また、`TBD` としておけば、未完成モデルでもUXを損なわない。

## 3. Dynamic Numbering Mechanism

### 課題 (Problem)

モデルファイルには管理用として `01_Radio.glb` のように番号を振りたいが、UI（メニュー等）にそのまま「01_Radio」と表示されるのは美しくない。
かといって、UIコード内で `string.replace("01_", "")` のような文字列操作を行うのは、バグの温床となり保守性が低い。

### 解決策 (Solution: Data Separation)

**「データ管理名 (Path/ID)」と「表示名 (Name)」の責務を分離した。**

1. **Manifest:** `name` プロパティには、**番号を含まない純粋な名前**（例: "Radio"）のみを登録する。
2. **UI (NavigationMenu):** 配列のインデックス (`index`) を利用して、**UI描画時に動的に番号を付与** する。

```typescript
// src/app/components/ui/NavigationMenu.tsx

{ASSET_MANIFEST.map((item, index) => {
  // index: 0, 1, 2...

  // ゼロ埋め (Zero Padding) して表示: "00", "01", "02"...
  const numberLabel = index.toString().padStart(2, "0");

  return (
    <div>
      <span>{numberLabel}</span> {/* "01" */}
      <span>{item.name}</span>   {/* "Radio" */}
    </div>
  )
})}
```

### メリット (Benefits)

- **データがきれい:** Manifestの `name` が汚れない。
- **変更に強い:** 並び順を変えるだけで、UI上の番号も自動で降り直される（リネーム不要）。
- **デザインの自由:** UI側で「番号なし」「ローマ数字」などに変更したくなっても、データ側を一切触る必要がない。

## 4. 結論 (Conclusion)

これらの実装により、**「データは堅牢に（Manageable）、表示は柔軟に（Flexible）」** というフロントエンドエンジニアリングの原則（Separation of Concerns）を順守したアーキテクチャが完成した。
今後のモデル追加時も、コード修正なしで `asset-manifest.ts` への追記のみで高品質なUIが維持される。
