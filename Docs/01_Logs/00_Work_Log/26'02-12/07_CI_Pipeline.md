# Feature: CI/CD Pipeline (GitHub Actions)

**Date:** 2026-02-12
**Phase:** 5.1 (Quality Assurance)

## Goal Description

GitHubにコードがプッシュされるたびに、自動で「Lint（静的解析）」と「Test（ユニットテスト）」を実行するワークフローを構築します。

## Proposed Changes

### Workflow Definition

#### [NEW] .github/workflows/ci.yml

- **Trigger:** `main` ブランチへの push および pull_request。
- **Environment:** `ubuntu-latest`
- **Steps:**
  1. `checkout`: コードチェックアウト
  2. `setup-node`: Node.js v20 (Cache有効)
  3. `npm ci`: 依存関係インストール
  4. `npm run lint`: Lint実行
  5. `npm run test`: Test実行

## Verification Plan

1. GitHub Actions タブで緑色（Success）になることを確認。

---

## Step 1: CI/CD 構築講義 (Automated Butler)

これから作成する `.github/workflows/ci.yml` は、GitHubという巨大なサーバー上で働く **「執事への指示書」** です。
Unityで言えば、ビルドサーバー（Unity Cloud Build）の設定ファイルにあたります。

### 1-1. トリガーの設定 (When to run)

まず、「いつ」執事に働いてもらうかを定義します。

**概念翻訳 (Unity/リアルタイム3Dコンテンツ):**

- **`OnTriggerEnter`** のようなものです。「Player (`main` ブランチ) が `Push` ゾーンに入ったら発動せよ」という命令です。

**Snippet 1: Trigger**

```yaml
name: CI

# トリガー: 「いつ」動くか
on:
  push:
    branches: [ "main" ]  # mainにプッシュされた時
  pull_request:
    branches: [ "main" ]  # mainへのPRが作られた時
```

### 1-2. ジョブと環境 (Where to run)

次に、「どこで」働くかを定義します。

**概念翻訳 (Game Dev):**

- **Sene/Level:** `ubuntu-latest` という「真っさらな空のシーン」を用意するイメージです。
- **Agent:** そこにPC（Runner）を1台配置します。

**構造の解剖 (Anatomy):**

- `jobs`: タスクの塊。並列実行も可能ですが、今回は `build` という1つのジョブだけ作ります。
- `runs-on`: OSの指名。Linux (`ubuntu`) が最も起動が速く、課金コストも安いです。

**Snippet 2: Job Environment**

```yaml
jobs:
  build:
    name: Lint & Test
    runs-on: ubuntu-latest  # Linux環境(仮想マシン)を起動
    
    steps:
      # ここから下に「やることリスト」を書く
```

### 1-3. セットアップ (Preparation)

空のPCに、開発環境を構築します。

**概念翻訳 (Unity):**

- **Clone Project:** GitHubからプロジェクトをダウンロード (`checkout`).
- **Install Unity Hub:** Node.js をインストール (`setup-node`).
- **Resolve Packages:** `npm install` (`npm ci`) でライブラリを入れる。

**Security Note:**

- `npm ci` (Clean Install) を使います。`npm install` と違い、`package-lock.json` を厳密に守るため、予期せぬバージョンアップによるバグ（サプライチェーン攻撃のリスク）を防げます。

**Snippet 3: Setup Steps**

```yaml
    steps:
      # 1. ソースコードを持ってくる (git clone相当)
      - uses: actions/checkout@v4

      # 2. Node.js環境を作る
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'  # 重要: 2回目以降を高速化

      # 3. 依存ライブラリを入れる (厳密モード)
      - name: Install Dependencies
        run: npm ci
```

### 1-4. 実行 (Action)

環境が整ったら、実際の検査を行います。

**概念翻訳 (Unity):**

- **Compiler Error Check:** `npm run lint` (文法チェック)
- **Play Mode Test:** `npm run test` (動作テスト)

**Snippet 4: Execution**

```yaml
      # 4. 文法チェック (Compiler Check)
      - name: Run Lint
        run: npm run lint

      # 5. テスト実行 (Unit Test)
      - name: Run Test
        run: npm run test
```

### 1-5. 統合 (Your Turn)

上記の解説を元に、`.github/workflows/ci.yml` を完成させてください。
コピペではなく、**「トリガー」「環境」「セットアップ」「実行」** という4つのブロックを意識して記述することをお勧めします。
