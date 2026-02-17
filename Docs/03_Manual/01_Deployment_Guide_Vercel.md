# Manual: Vercel Deployment Guide

**日付:** 2026-02-17
**Status:** Ready to Use
**Version:** 1.0

## 1. 目的

現在、開発環境（学校PC）からはVercelへの直接デプロイやGitHub認証が制限されている可能性があります。
そのため、**「自宅PC環境」** から安全にデプロイ作業を行うための手順をまとめます。

## 2. 前提条件

- **自宅PC:** GitHubアカウント、Vercelアカウントにログイン可能であること。
- **リポジトリ:** 最新のコミットがGitHub (`origin/main`) にプッシュされていること。

## 3. 手順 (Step-by-Step)

### Step 1: GitHub Push (学校PC)

まず、最新の変更をGitHubに送信します。

```bash
# クリーンアップ
git add .
git commit -m "feat: UI Polish (SmartLoader & Dynamic Numbering)"

# 生存確認
git push origin main
```

ブラウザでGitHubリポジトリを開き、`Last commit` が「たった今 (just now)」になっていることを確認してください。

### Step 2: Vercel Project Connect (自宅PC)

1. [Vercel Dashboard](https://vercel.com/dashboard) にログインします。
2. **"Add New..."** -> **"Project"** をクリック。
3. GitHubリポジトリ一覧から `Project Last-Stand` (または該当リポジトリ) の **[Import]** をクリック。

### Step 3: Build Settings

VercelはNext.jsを自動検知するため、基本的に設定不要です。

- **Framework Preset:** `Next.js`
- **Root Directory:** `./` (そのままでOK)
- **Environment Variables:**
  - 現在は不要ですが、もしGoogle Analytics IDなどがあればここで設定します。

**[Deploy]** ボタンをクリックします。

### Step 4: Verification (実機確認)

デプロイ成功後、発行されたURL (例: `https://project-last-stand.vercel.app`) に **スマホ** でアクセスしてください。

**チェック項目:**

1. **iPhone Safari:** アドレスバーがあってもフッターが隠れていないか (`dvh` 確認)。
2. **SmartLoader:** ロード中に「MB」や「%」が正しく表示されるか。
3. **Radio:** 回転やタップ反応は正常か。

## 4. トラブルシューティング

- **Buildが失敗する場合:**
  - "Logs" タブを確認してください。
  - よくある原因: ESLintエラー (`Unused variable` 等)。
  - 対策: ローカルで `npm run build` を試してエラーを潰してから再プッシュ。

- **画面が真っ白:**
  - ブラウザのコンソール (F12) を確認。
  - `404 Not Found` が多い場合、`asset-manifest.ts` のパスが間違っている可能性があります。
