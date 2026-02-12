# Implementation Intent: Vitest Integration

**Date:** 2026-02-12
**Phase:** 5.1 (Quality Assurance)
**Feature:** Unit Testing

## 1. 目的 (Objective)

- **採用要件のクリア:** Dwango (ZEN Study) の求人要件にある「テストコード経験」を満たす。
- **品質保証:** `store.ts` のナビゲーションロジック（次へ/前へ）が、非表示アイテムをスキップして正しくループすることを機械的に保証する。

## 2. 技術選定 (Tech Stack)

- **Vitest:**
  - Viteベースで動作するため、Next.js (WebPack/Turbo) とは異なるが、設定が簡素で高速。
  - Jest互換のAPIを持つため、学習コストが低い。
- **React Testing Library:**
  - コンポーネントテスト用だが、今回はフック (`useStore`) のテストにも応用する。

## 3. テスト戦略

- **対象:** `src/lib/store.ts` (Logic)
- **ケース:**
  1. 初期状態チェック
  2. `goToNext` (通常遷移)
  3. `goToNext` (ループ遷移)
  4. `active: false` のスキップ確認
