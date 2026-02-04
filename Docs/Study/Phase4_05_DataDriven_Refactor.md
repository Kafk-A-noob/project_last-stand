# 学習記録: データ駆動型アーキテクチャ (Data-Driven Architecture)

**Phase 4.2** で実施したリファクタリングの全容と、その技術的背景についての解説です。

## 1. 概要 (Concept)

### 「データ駆動 (Data-Driven)」とは？

アプリケーションの挙動を、**プログラムコード（ロジック）** ではなく **データ（設定ファイル）** によって制御する設計思想です。

- **Before:** 「ボタンを表示する」という命令を直接コードに書く。 (Hardcoding)
- **After:** 「リストにあるものを全て表示しろ」という命令を書き、リスト（データ）を外から与える。

### 今回の達成事項

| 項目 | 以前の状態 (Hardcoded) | 現在の状態 (Data-Driven) |
| :--- | :--- | :--- |
| **モデル管理** | コード内に直接ファイルパスを記述 | `asset-manifest.ts` (台帳) で一元管理 |
| **初期表示** | `store.ts` にパスを直接記述 | 台帳の1番目を自動的に採用 |
| **メニュー** | `button` タグを個数分コピペ | `.map()` で台帳から全自動生成 |

---

## 2. 実装の構成 (Architecture)

3つのファイルが連携して動く「三層構造」になっています。

```mermaid
graph TD
    Data[asset-manifest.ts <br/> (The One Truth)] -->|Import| Store[store.ts <br/> (State Manager)]
    Data -->|Import| UI[ViewerLayout.tsx <br/> (Presentation)]
    
    Store -->|State| UI
    UI -->|String Path| Store
```

### ① The Registry (台帳)

**File:** `src/config/asset-manifest.ts`
全ての源流です。「何を表示するか」は全てここにあります。

```typescript
export const ASSET_MANIFEST = [
  { id: "1", name: "Logo", path: "/models/logo.glb" },
  { id: "2", name: "Radio", path: "/models/radio.glb" },
];
```

### ② The Brain (脳)

**File:** `src/lib/store.ts`
初期状態を決めるために台帳を参照します。

```typescript
import { ASSET_MANIFEST } from "@/config/asset-manifest";

// 台帳の [0] 番目を初期ターゲットにする
targetPath: ASSET_MANIFEST[0].path, 
```

これにより、台帳の並び順を変えるだけで、サイトを開いた時のモデルも変わります。

### ③ The View (見た目)

**File:** `src/app/components/layout/ViewerLayout.tsx`
台帳の長さや内容に合わせて、自分の姿（ボタンの数やラベル）を変えます。

```tsx
import { ASSET_MANIFEST } from "@/config/asset-manifest";

// 魔法の呪文: .map()
{ASSET_MANIFEST.map((item) => (
  <button onClick={() => setTargetPath(item.path)}>
    [{item.name}]
  </button>
))}
```

---

## 3. なぜプロはこう書くのか？ (Why?)

### A. Separation of Concerns (関心の分離)

「表示の仕方（UIロジック）」と「表示する中身（データ）」は、本来別物です。
これらを分けることで、以下のメリットが生まれます。

- **デザイナー/モデラー:** コードが分からなくても、`manifest.ts` さえ編集できればモデルを追加・削除できる。
- **エンジニア:** コンポーネントの見た目を修正する際、誤ってデータを壊す心配がない。

### B. Scalability (拡張性)

今は2個ですが、これが100個になった時を想像してください。
ハードコードではボタンを100回コピペし、修正のたびに100箇所直す必要があります。
データ駆動なら、UIコードは**1行も修正する必要がありません**。

### C. Open-Closed Principle (開放/閉鎖原則)

SOLID原則の一つ。「拡張に対しては開いており、修正に対しては閉じているべきである」。
今回の変更により、`ViewerLayout.tsx` は**「修正に対して閉じ（いじる必要がなくなり）」**、マニフェストは**「拡張に対して開かれた（いくらでも追記できる）」** 状態になりました。

---

## 4. 今後の展望

この仕組みがあれば、例えば「スマホだけで見れるモデル」「開発中のみ表示するモデル」といったフラグ（`active: boolean` 等）をマニフェストに追加し、`.filter()` で制御することも容易になります。

これが「堅牢なサイト構築」への第一歩です。
