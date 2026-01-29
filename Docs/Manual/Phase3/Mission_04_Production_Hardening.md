# Mission 04: Production Hardening (製品化硬化処理)

**Target:** `src/app/layout.tsx`, `.gitignore`, `package.json`

このミッションでは、アプリの強度と品質を高めるための3つのタスクを実行します。

---

## Step 1: Metadata の強化 (SEO)

`src/app/layout.tsx` を開き、`metadata` オブジェクトを編集して、あなたのポートフォリオとしての「名刺」を作成してください。

**Task:**

1. `title` を `"Project: Last Stand | The Digital Ark"` に変更。
2. `description` を `"Web3D Portfolio featuring React Three Fiber and Next.js."` 等に変更。

---

## Step 2: リポジトリの保護 (.gitignore)

将来的に巨大な `.glb` ファイルが作られることに備え、Gitの監視対象から外します。

**Task:**

1. プロジェクトルートの `.gitignore` を開く。
2. 末尾に以下を追記する。

```gitignore
# 3D Assets (Secure massive files)
*.glb
*.gltf
*.draco
public/models/*
```

※ これにより、作成したモデルはGitHubに上がりません。バックアップは別途Google Drive等で行うか、後にGit LFSを導入します。

---

## Step 3: 安全装置の導入 (Error Boundary)

3Dシーンがクラッシュしてもサイト全体を巻き込まないようにします。

**Task:**

1. ターミナルでライブラリをインストール:
    `npm install react-error-boundary`
2. `src/app/page.tsx` を編集し、`ErrorBoundary` で `<Scene />` を囲む。

```tsx
import { ErrorBoundary } from "react-error-boundary";

// ...

<ViewerLayout>
  <ErrorBoundary fallback={<div className="text-red-500 p-12">System Failure: Visual Module Crashed.</div>}>
    <Scene />
  </ErrorBoundary>
</ViewerLayout>
```

---

**完了条件:**

- ブラウザのタブ名が変更後のタイトルになっている。
- `npm run dev` でエラーが出ない。
