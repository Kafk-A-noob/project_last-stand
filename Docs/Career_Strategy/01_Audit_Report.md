# Career Audit Report: Match with ZEN Study (Dwango)

**Date:** 2026-02-12
**Target:** ドワンゴ 教育事業本部 (ZEN Study) フロントエンドエンジニア

## 1. 適合度分析 (Match Analysis)

### ✅ 強み (Strong Match)

1. **技術スタック (Technology):**
    - `React`, `Next.js`, `TypeScript`: 必須要件を完全にカバー。
    - `Tailwind CSS`: 採用実績あり（Panda CSSと同じUtility-first思想）。
2. **ドキュメンテーション能力 (Documentation):**
    - `Docs/` 配下の構造化された記録は、「業務知識や開発知識のドキュメンテーション」能力の物証として極めて強力。
    - **"Why" (設計意図) を残す姿勢** は、チーム開発において最も評価されるポイントの一つ。
3. **自走力 (Self-Starting):**
    - 未経験から「Boot Sequence」等の独自プロトコルを構築し、AIを使いこなして制作を進めるスタイルは、「最新技術を追求」「自発的に行動」する人物像に合致。
4. **UI/UXへのこだわり:**
    - 単なるCRUDアプリではなく、3Dを用いたリッチな体験（"Wow" factor）を作れる点は、教育サービスにおける「飽きさせない学習体験」への応用性を感じさせる。

### ⚠️ ギャップ (Critical Gaps)

求人票にある以下のキーワードに対し、現状のポートフォリオでは証拠が不足しています。

1. **テスト (Testing):**
    - Requirements: `Vitest`, `Jest`, `Testing Library`
    - Current: **None (0%)**
    - **対策:** `src/lib/store.ts` (ロジックの中核) に対する単体テストを `Vitest` で実装すべき。「安定して快適な学習の場を守り続ける」意識の証明になる。
2. **コンポーネント管理:**
    - Requirements: `Storybook`
    - Current: None
    - **対策:** 必須ではないが、`InfoPanel` や `Button` などの独立コンポーネントをカタログ化しておくと加点要素。
3. **Linter/Formatter:**
    - Requirements: `Biome`, `ESLint`, `Prettier`
    - Current: `ESLint` (Next.js default)
    - **対策:** `Biome` への乗り換えは「開発環境改善」のアピールになるが、優先度は中。

---

## 2. 戦略提案 (Strategy)

「3年の実務経験」という壁を、「密度の高い個人開発」と「モダンな開発プラクティスの遵守」で突破します。

### Action Plan (Gap Filling)

1. **[必須] テスト導入:** `Vitest` を導入し、データロジックの堅牢性を保証する。
2. **[推奨] CI/CD拡張:** GitHub Actionsで「Push時にテストとLintを自動実行」するワークフローを組む（FrontendOps体験）。

---

## 3. 併願推奨企業 (Alternative Options)

ドワンゴ（プラットフォーム開発）とは異なる軸で、あなたの「3D/Web」スキルが高く評価される領域：

| カテゴリ | 企業例 | 親和性 |
| :--- | :--- | :--- |
| **Web3D/演出制作** | **BIRDMAN, SHIFTBRAIN, DONGURI** | **特大** <br> WebGLを使った「魅せる」サイト制作。ポートフォリオの方向性と完全に一致。 |
| **Metaverse/VR** | **Cluster, HIKKY, GREE** | **大** <br> Unity/Blenderの背景知識が直接活きる。Web版クライアント開発など。 |
| **EdTech (他社)** | **atama plus, Progate** | **中** <br> ドワンゴ同様、教育×Tech。3D解説教材などの需要。 |

---

## 4. 結論

**「機能する」**。ただし、あと1ピース、「品質への責任（テスト）」が埋まれば、より説得力が増す。
まずは `registry.ts` (manifest) のロジックに対して、テストコードを書くことを推奨する。
