# Git Branching Rules & Workflow

開発チーム（ソロ含む）で遵守すべきブランチ命名規則とワークフローの定義。

## 1. Branch Naming Convention (命名規則)

すべてのブランチ名は、作業の種類を表す **Prefix(接頭辞)** から始めること。

| Prefix          | Description (意味)                          | Usage Example (使用例)                         |
| :-------------- | :------------------------------------------ | :--------------------------------------------- |
| **`feature/`**  | 新機能の開発                                | `feature/add-piano-model`, `feature/user-auth` |
| **`fix/`**      | バグ修正                                    | `fix/navigation-bug`, `fix/ui-overflow`        |
| **`refactor/`** | リファクタリング (機能を変えないコード修正) | `refactor/store-logic`, `refactor/clean-code`  |
| **`docs/`**     | ドキュメントのみの変更                      | `docs/update-readme`                           |
| **`chore/`**    | 雑務 (ビルド設定、依存関係更新など)         | `chore/update-dependencies`                    |

### 命名のコツ

- **ケバブケース (kebab-case)** を使用する (単語の間はハイフン `-` で繋ぐ)。
- 動詞+名詞の形が望ましい (例: `add-piano` vs `piano-addition`)。

## 2. GitHub Flow (ワークフロー)

`main` ブランチは常に保護されており、直接のPushは禁止されている。

1. **Create Branch**: `main` から最新を取得し、新しいブランチを切る。

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Commit & Push**: 作業を行い、こまめにコミットしてリモートへプッシュする。

   ```bash
   git add .
   git commit -m "feat: Add new model data"
   git push origin feature/your-feature-name
   ```

3. **Pull Request (PR)**: GitHub上でPRを作成し、CI(テスト)の通過を確認する。

4. **Merge**: 管理者権限でマージする (ソロ開発時はSelf-ApproveまたはAdmin Bypassを使用)。

5. **Cleanup**: 作業が終わったブランチは削除する。
