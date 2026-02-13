# Tech Report: Testing Standard [Phase 5.1]

**Date:** 2026-02-12
**Target:** Project Developer / Future Maintainers
**Artifact ID:** 04_Testing_Standard

本プロジェクトにおけるテストコードの記述ルールと運用方針を定義する。
他のドキュメント（キャリア戦略や実装意図）とは区別し、純粋な **「開発運用ルール」** として扱う。

---

## 1. 原則 (Philosophy)

1. **振る舞いをテストする (Test Behavior, Not Implementation):**
    - 内部変数の値そのものではなく、「ユーザー（またはコンポーネント利用者）が何をした時に、何が起きるか」を検証する。
2. **単体テストに集中する (Unit Test First):**
    - E2Eテストはコストが高いため、まずはロジック（Store/Hooks）の単体テストで品質を担保する。
3. **Co-location (コロケーション):**
    - テストファイルは実装ファイルの真横に置く。`__tests__` フォルダーには隔離しない。
    - 理由: ファイル移動時の追従性を高め、テストの存在を意識しやすくするため。

---

## 2. 技術スタック (Stack)

- **Runner:** `Vitest` (v2+)
- **Library:** `@testing-library/react` (Hooks/Components共通)
- **Environment:** `jsdom`

---

## 3. ファイル・命名規則 (Conventions)

### 3.1 ファイル配置

```txt
src/lib/
├── store.ts          # 実装
└── store.test.ts     # テスト (実装と同じディレクトリ)
```

### 3.2 記述構成 (Structure)

`describe` - `it` - `expect` の階層を守る。

```typescript
// 対象モジュール/コンポーネント名
describe('useStore (Navigation)', () => {
    
    // 事前準備 (副作用のクリーンアップ)
    beforeEach(() => { ... });

    // テストケース: "これをした時" + "こうなるべき"
    it('should switch to next item when goToNext is called', () => {
        // Arrange (準備)
        ...
        // Act (実行)
        ...
        // Assert (検証)
        expect(...).toBe(...);
    });
});
```

---

## 4. 運用コマンド (Commands)

| コマンド | 説明 |
| :--- | :--- |
| `npm run test` | 全テストを1回実行する (CI兼用) |
| `npx vitest` | ウォッチモードで実行 (開発中用) |

---

## 5. カバレッジ基準 (Coverage)

現状は数値目標（例: 80%）を設けない。
**「コアロジック（今回はナビゲーション）の正常系およびループ処理」** が網羅されていることを必須とする。
