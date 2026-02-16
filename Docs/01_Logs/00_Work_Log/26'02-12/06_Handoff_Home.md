# Session Handoff: Deploy & Debugging (26'02-12)

**Status:** Code Complete (Fixes Pushed) / Deployment Blocked (Auth Error)
**Target:** Home Terminal / Vercel Dashboard

## 🛑 Current Blocker (School Terminal)

GitHub上で **"All checks have failed (Vercel)"** というエラーが出ています。
これは「コミットした人 (`25r1116`)」と「Vercelのプロジェクト所有者 (`kafk-a-noob`)」が一致しないため、Vercelのセキュリティが自動デプロイを拒否した状態です。
（学校のPCの設定が、個人のGitHubアカウントと完全に紐付いていないため発生しました）

## ⚠️ Solution at School (Try this FIRST)

**「新しいコミットが見えていない」問題を解決する方法** です。
もし学校のPCからブラウザで **[Vercel Dashboard](https://vercel.com)** にログインできれば、以下の手順で強制的に同期させられます。

1. ブラウザで Vercel にログイン。
2. `project-last-stand` > **Settings** > **Git** を開く。
3. **Connected Git Repository** の **[Disconnect]** ボタンを押す。
4. すぐに同じ場所に現れる **[Connect]** ボタンを押し、`project-last-stand` を選び直す。
5. **これを行うと、Vercelが最新の `main` ブランチ（修正済みコード）を読み込み直し、自動的に正しいデプロイが開始されます。**

（ログインできない場合は、家に帰ってから同じ操作をしてください）

## 🏠 Next Actions (Home Terminal)

家のPC（オーナー権限がある環境）であれば、以下の手順で**100%解決**します。

### 1. コードの同期

家のPCで最新の修正を受け取ります。

```bash
git pull origin main
```

※ これで `ViewerLayout.tsx` の修正や `asset-manifest.ts` の変更が降りてきます。

### 2. Vercelの強制デプロイ (Dashboard)

コードは正しいので、Vercelに「これは私が許可した変更だ」と伝えます。

1. ブラウザで [Vercel Dashboard](https://vercel.com/dashboard) を開く。
2. `project-last-stand` を開く。
3. **Deployments** タブを見る。
4. 一番上のコミット（`fix: Force add React_Logo.glb...`）が `Failed` ではなく `Skipped` や `Blocked` になっているはず。
5. 右側の **[...]** メニューから **[Redeploy]** をクリック。
6. **"Redeploy"** ボタンを押す。

### 3. Verification

デプロイが完了したらURLを確認。

- [x] メニューが開閉できるか？
- [x] Radio（仮置きのReactロゴ）が表示されるか？

---

## 📚 Today's Learning (Learning Materials)

### 1. Vercel & Git Branch

- Vercelはデフォルトで `main` を見に行くが、古い設定が `master` に残ることがある。
- **解決策:** Vercel側でプロジェクトを削除→再インポートするのが一番確実。

### 2. .gitignore & Assets

- `*.glb` が `.gitignore` に入っていると、ローカルで動いてもデプロイ先で「ファイルがない (404)」になる。
- **解決策:** `git add -f (ファイル名)` で強制的にGit管理下に追加する。

### 3. CSS Pointer Events

- `pointer-events-none` の子要素に `pointer-events-auto` をつけても、複雑な構成だと効かないことがある。
- **解決策:** UIレイヤー構造を見直し、操作が必要な要素（メニュー等）を `pointer-events-none` のコンテナの外に出す（物理的解決）。
