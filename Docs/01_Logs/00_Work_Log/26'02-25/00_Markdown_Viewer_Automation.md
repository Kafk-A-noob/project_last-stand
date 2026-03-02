# Implementation Plan: Markdown Viewer Automation (学習ドキュメント自動化)

**Date**: 2026-02-25
**Status**: [ ] Pending

## 概要 (Overview)

`Docs/` 配下にある学習用ドキュメント（Markdown）を、Next.jsのサーバー機能を用いて自動的にスキャンし、Webページとしてレンダリングする専用のビューアを構築します。
メインのWeb3Dポートフォリオ（メインコンテンツ）とは完全に分離し、影響を与えないクリーンな設計を目指します。

---

## 達成する要件 (Requirements)

1. **完全自動のスキャン**: `Docs/` 内に新しい `.md` ファイルを追加・編集するだけで、Web画面に即座に反映される。
2. **完全なる分離**: メインの3Dキャンバスやグローバルなスタイリングと混ざらないよう、専用のルーティング（例: `/study`）とレイアウトを使用する。
3. **安全な表示**: MarkdownテキストをReact要素に安全に変換する。

---

## 技術スタックと選定理由 (Technical Stack & Reasoning)

- **Next.js Server Components (App Router)**:
  - 理由: サーバー側でNode.jsのファイルシステムAPI (`fs`) を使って `.md` ファイルを直接読み込めるため、APIルートや外部データベースが不要です。ビルド時やサーバー実行時にすべて完結するため非常に高速です。
- **`react-markdown` & `remark-gfm`**:
  - 理由: Markdown文字列をReactコンポーネントに変換するデファクトスタンダード。表（テーブル）などをサポートするGFM（GitHub Flavored Markdown）プラグインも併用します。
- **`@tailwindcss/typography` (Tailwindプラグイン)**:
  - 理由: 変換された素のHTMLタグ（`h1` や `p` など）に対して、自動的に美しいスタイルを当てる公式プラグイン（`prose` クラス）。自分でCSSを書かずに、GitHubのような見やすいドキュメント画面が完成します。

---

## 実装手順 (Implementation Steps)

あとで実装する際の手順書です。

### Step 1: 依存パッケージのインストール

まずはMarkdownを読み込み、綺麗に表示するためのライブラリを入れます。

```bash
# Markdownパーサー
npm install react-markdown remark-gfm

# Tailwindの公式タイポグラフィプラグイン（デザイン調整用）
npm install -D @tailwindcss/typography
```

**設定の追加 (`tailwind.config.ts`)**:

```typescript
import type { Config } from "tailwindcss";

export default {
  // ...既存の設定
  plugins: [
    require("@tailwindcss/typography"), // 追加
  ],
} satisfies Config;
```

### Step 2: ドキュメントパーサーの作成 (The System)

`fs` モジュールを使って `Docs/` からファイルを読み込む専用の関数を作ります。
配置場所: `src/lib/docsParser.ts`

- フォルダを再帰的に走査し、すべての `.md` ファイルのパスと内容を取得する関数 (`getAllDocs`) を作ります。
- データの構造体としては `{ slug: string[], title: string, content: string }` を返します。

### Step 3: 分離されたルーティングの作成 (Isolation)

メインページ（`/`）とは独立した空間を作ります。

```text
src/app/
  study/
    layout.tsx      <-- study専用のレイアウト（メインのヘッダー等を呼ばない）
    page.tsx        <-- 目次（インデックスページ）
    [...slug]/
      page.tsx      <-- 個別のMarkdownファイルを表示する動的ルート
```

このディレクトリにより、「ポートフォリオ（黒背景/サイバーパンク）」と「学習ノート（白背景や見やすいテーマ）」を完全に分離できます。

### Step 4: Markdownビューアコンポーネントの実装 (The Viewer)

Markdown文字列を受け取って画面に表示するコンポーネントを作ります。

```tsx
// src/app/study/[...slug]/page.tsx のメイン部分のイメージ
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function DocPage({ params }) {
  // サーバー側でファイルを読み込む
  const doc = await getDocBySlug(params.slug);

  return (
    // 'prose' と 'prose-invert' (ダークモード用) がタイポグラフィの魔法のクラス
    <article className="prose prose-invert max-w-none p-8">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
    </article>
  );
}
```

---

## 注意点 (Pitfalls to Avoid)

1. **メインUIとの干渉**:
   - 現在の `src/app/layout.tsx` がグローバルで `bg-black` 等の属性を持っている場合、`/study` ページにも影響を及ぼします。
   - 解決策として、Next.jsの **Route Groups機能**（`(portfolio)` と `(study)` などかっこでフォルダを囲む）を使い、完全別々に `layout.tsx` を定義する「レイアウト完全分離」を行うのが最善です。
2. **セキュリティの考慮 (XSS)**:
   - 自分だけが書くMarkdownなので基本的に安全ですが、`react-markdown` はデフォルトで安全に処理されます。
3. **デプロイ時**:
   - Vercelなどの本番環境にデプロイする際、`Docs/` フォルダがビルド対象に含まれるようにする必要があります。

---

この手順書は将来の自動化のために残しておきます。
「実装を始める」と言っていただければ、いつでもフルサポートで解説・対応を開始します。
