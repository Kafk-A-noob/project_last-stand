# 実装計画書 (2026-01-25)

## Phase 1.5: VCS連携 (GitHub Setup)

### 概要
プロジェクトのソースコードをGitHubのリモートリポジトリにプッシュし、バックアップとバージョン管理を確立します。
**GitHub CLI (`gh`) を導入し、ターミナルのみで完結するフローを採用します。**

### 実行対象
- **ターゲット:** プロジェクトルート (`D:\KafkA\Documents\project_last-stand`)
- **目的:** ローカルのGitリポジトリをGitHub等のリモートと同期させる。

### 実行手順 (User Actions)

#### 1. GitHub CLI のインストール
ターミナルからリポジトリを作成・操作するために、公式CLIツールをインストールします。

**実行コマンド:**
```powershell
winget install --id GitHub.cli
```
※インストール後、**ターミナルの再起動**が必要です。

#### 2. GitHub Login
再起動後のターミナルでログイン認証を行います。

**実行コマンド:**
```powershell
gh auth login
```
*   `GitHub.com` → `HTTPS` → `Yes` → `Login with a web browser` の順に選択し、表示されるコードをブラウザに入力して承認してください。

#### 3. リポジトリ作成とプッシュ (Automated)
認証完了後、以下のコマンドで「リポジトリ作成」「リモート登録」「プッシュ」を一括で行います。

**実行コマンド:**
```powershell
# Publicリポジトリの場合
gh repo create project_last-stand --public --source=. --push

# Privateリポジトリの場合
gh repo create project_last-stand --private --source=. --push
```

#### 4. 除外設定の確認 (.gitignore)
`.env` や `node_modules`、`.agent` ディレクトリがアップロードされないことを確認します。

*   **Status:** [ ] Not Started
