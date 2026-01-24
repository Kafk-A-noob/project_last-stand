# 実装計画書 (2026-01-25)

## Phase 1.5: VCS連携 (GitHub Setup)

### 概要
プロジェクトのソースコードをGitHubのリモートリポジトリにプッシュし、バックアップとバージョン管理を確立します。

### 実行対象
- **ターゲット:** プロジェクトルート (`D:\KafkA\Documents\project_last-stand`)
- **目的:** ローカルのGitリポジトリをGitHub等のリモートと同期させる。

### 実行手順 (User Actions)

#### 1. GitHubリポジトリの作成 (Manual)
ブラウザでGitHubにアクセスし、新規リポジトリを作成してください。

*   **Repository Name:** `project_last-stand` (推奨) または `Operation_Last-Stand`
*   **Public/Private:** 任意（就職活動用ならPublic推奨ですが、開発中はPrivateでも可）
*   **Initialize with:** **None** (何もチェックしない。空のリポジトリを作成する)

#### 2. リモートの追加とプッシュ (Terminal)
作成したリポジトリのURL（例: `https://github.com/YourName/project_last-stand.git`）を使用します。

**実行コマンド:**
```powershell
# 1. 全ファイルをステージング
git add .

# 2. コミット (Next.js初期化時のコミットがある場合はスキップされることがあります)
git commit -m "feat: Initialize project with Next.js and R3F scene"

# 3. ブランチ名を main に変更 (最近の標準)
git branch -M main

# 4. リモートを追加 (URLはご自身のリポジトリのものに書き換えてください)
git remote add origin <YOUR_REPO_URL>

# 5. 初回プッシュ
git push -u origin main
```

#### 3. 除外設定の確認 (.gitignore)
`.env` や `node_modules`、`.agent` ディレクトリがアップロードされないことを確認します。

*   **Status:** [ ] Not Started
