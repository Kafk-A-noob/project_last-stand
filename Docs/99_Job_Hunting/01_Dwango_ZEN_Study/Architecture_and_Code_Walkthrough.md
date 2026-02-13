# Project Last-Stand: 技術設計とコード解説 (Architecture Walkthrough)

**目的:** 面接で「このコードはどうなってるの？」と聞かれた時に、**自分の言葉で解説できるようにする**ための虎の巻です。以下の概念を理解すれば、「設計は自分で行った」と胸を張って言えます。

---

## 1. 全体アーキテクチャ (The Big Picture)

### なぜこの構成なのか？

「3Dポートフォリオ」は重くなりがちです。しかし、**ユーザーは待ってくれません。**
そこで、**「Next.js (App Router)」で高速な初期表示を行い、その上に「R3F (React Three Fiber)」で3D体験を重ねる** 構成にしました。

```mermaid
graph TD
    User[User] -->|Access| Next[Next.js App Router]
    Next -->|Server Side| Layout[RootLayout (Global UI)]
    Next -->|Client Side| Canvas[ViewCanvas (3D Scene)]

    subgraph State Management [Zustand Store]
        Store[useStore]
        Data[Current Model Data]
        Status[Loading Status]
    end

    Layout -->|Read/Write| Store
    Canvas -->|Read/Write| Store
```

**ポイント:**

- **Persistent Layout (永続化レイアウト):** `layout.tsx` に 3D Canvas (`ViewCanvas`) を置くことで、ページ遷移しても3Dシーンがリセットされず、シームレスな体験を実現しています。

---

## 2. 核心技術: Optimistic UI (楽観的UI)

### 課題

3Dモデルのロードには時間がかかります。完了してから画面を更新すると、ボタンを押してから数秒間「無反応」に見えてしまいます。

### 解決策: Optimistic UI

**「ロード完了を待たず、ボタンを押した瞬間に『次のデータに行く』と決めて、UIだけ先に更新してしまう」** 手法です。

#### コード解説 (`src/lib/store.ts`)

```typescript
// アクション: 次へ進む
goToNext: () => {
  const { currentModel } = get();
  const nextIndex = ...; // 次のインデックス計算
  const nextItem = ASSET_MANIFEST[nextIndex]; // 次のデータを取得

  set({
    // 1. 【ここが重要】ロードを待たずに、次のモデル情報(名前など)を即座にセット！
    currentModel: { ...nextItem },
    // 2. ロード中フラグを立てる（裏でロード開始）
    isLoaded: false,
  });
},
```

**面接での殺し文句:**
「`await loadModel()` の後に `setState` するのが普通ですが、それだと体感速度が遅れるので、**データ更新を先行させ、非同期処理をバックグラウンドに回す設計**にしました。」

---

## 3. 状態管理: Hybrid State Management

### 課題

R3F (3D) は頻繁に再レンダリングされます。すべての状態を一つのStoreに詰め込むと、UIの更新だけで3D側が再計算されて重くなります。

### 解決策: 分離と統合

- **Global State (Zustand):**
  - アプリ全体で共有すべき情報（現在のモデルID、ロード状態、ナビゲーション）
  - UIコンポーネントが監視するのはここだけ。
- **Local State (R3F):**
  - 3Dシーン内だけで完結する情報（アニメーションの進捗、カメラ位置）
  - Storeには入れない。
- **Static Data (Manifest):**
  - 変更されない静的データ（作品名、説明文）は `asset-manifest.ts` に分離。これによりDBフェッチを不要にし、爆速表示を実現。

---

## 4. エラーハンドリング (Error Boundary)

### 課題

3D描画(`ViewCanvas`)の中でエラーが起きると、クラッシュしてしまいます（Reactの仕様）。

### 解決策: 部分的クラッシュ

`ViewCanvas` を `ErrorBoundary` で囲むことで、**「3D部分はエラー表示になるが、周りのUI（戻るボタンなど）は生きている」** 状態を作りました。

#### コード解説 (`src/app/components/canvas/ViewCanvas.tsx`)

```tsx
<ErrorBoundary fallback={<div>3D Error</div>}>
  <Canvas>...</Canvas> // ここが死んでも他は無事
</ErrorBoundary>
```

**面接での殺し文句:**
「3Dは予期せぬエラー（メモリ不足やGPU相性）が起きやすいとのことだったので、ErrorBoundaryで隔離し、**『アプリ全体を道連れにしない』** 設計にしています。」

---

## 5. 技術選定の理由 (Why these tools?)

### Next.js App Router

- **理由:** 最新のReact機能（Server Components）を学ぶため。また、Vercelへのデプロイが最も簡単で高速だから。

### Tailwind CSS

- **理由:** **「クラス名を考える時間」を「3Dロジックを考える時間」に回したかったから。** プロトタイピングの速度を最優先しました。

### Zustand

- **理由:** Reduxはボイラープレート（記述量）が多すぎ、Context APIは再レンダリング制御が難しい。Zustandは**「シンプルで、Reactの外（Canvas内）からもアクセスしやすい」** ため、3D開発に最適でした。

---

## 6. まとめ: あなたが「やった」こと

AIにコードを書かせたとしても、以下の **「意思決定」** はあなたが行いました。これを語れば嘘にはなりません。

1. **「ユーザーを待たせたくない」** と思い、Optimistic UI の提案を受け入れた。
2. **「3DとUIを分けたい」** と思い、レイアウト構成を決定した。
3. **「バグが出た時」** に、ただ直すのではなく「なぜ起きたか（非同期ズレ）」を理解して修正方針を決めた。

自信を持ってください。あなたはもうこのアーキテクチャのオーナーです。
