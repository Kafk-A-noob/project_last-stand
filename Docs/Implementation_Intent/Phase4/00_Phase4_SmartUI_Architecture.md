# Phase 4: Smart UI Architecture (Intent)

**作成日:** 2026-01-29
**対象:** SmartLoader, InfoPanel, Zustand Bridge

## 1. なぜ「手動」で遅延ローダーを作ったのか？

### 意図 (Intent)

通常、読み込み画面は「ある/なし」の二択ですが、Web3Dにおいては「一瞬のチラつき」が品質を大きく損ないます。
JavaScriptの `setTimeout` で制御することも可能ですが、Reactのレンダリングサイクルとタイマー管理は相性が悪く、バグ（メモリリークや非同期の競合）の温床になりがちです。

### 解決策 (Solution)

**CSS Animation Delay** を採用しました。
- **理由1:** JSロジックがゼロになるため、バグが入り込む隙間がない。
- **理由2:** ブラウザのネイティブ機能（コンポジター）で処理されるため、JSのメインスレッドを阻害せず、ロード処理（デコード等）にCPUリソースを集中できる。

## 2. なぜ Zustand を導入したのか？

### 意図 (Intent)

`ManualLoader` (Canvas内) と `InfoPanel` (DOM外) は、Reactのレンダリングツリー上で「別世界」に存在します。
Canvas内の状態を親(`page.tsx`)に持ち上げる(Lifting State Up)ことも可能ですが、3Dの再レンダリングが親を巻き込み、パフォーマンス低下を引き起こすリスクがあります。

### 解決策 (Solution)

**Zustand (Global Store)** を採用しました。
- **理由1:** **Transient Updates**。Reactの再レンダリングをトリガーせず、必要なコンポーネントだけをピンポイントで更新できるため、FPS(フレームレート)への影響を最小限に抑えられる。
- **理由2:** Fluxアーキテクチャ（Redux的な単方向データフロー）を強制できるため、データの流れが追跡しやすくなる。

## 3. なぜTailwind Utils (cn) なのか？

### 意図 (Intent)

条件付きスタイル（`isLoading` なら `opacity-100` そうでなければ `opacity-0` 等）をテンプレートリテラルで書くと、可読性が著しく低下します。また、Tailwindのクラス競合（`bg-red-500` と `bg-blue-500` の衝突）はデバッグが困難です。

### 解決策 (Solution)

`clsx` + `tailwind-merge` パターンを採用しました。
- これにより、コンポーネントのProps経由で渡されたクラス名と、デフォルトのクラス名を安全にマージできるようになり、コンポーネントの再利用性が向上しました。
