# Issue: Zustand Store Type Mismatch

**発生日:** 2026-01-29
**関連コンポーネント:** `lib/store.ts`, `ManualLoader.tsx`

## 現象 (Symptom)

`ManualLoader.tsx` から `useStore` を呼び出した際、以下のTypeScriptエラーが発生し、コンパイルできない。

```text
Type '{ ... }' is not assignable to type 'ModelData'.
Property 'modelData' does not exist on type 'AppState'.
```

## 原因 (Root Cause)

定義と実装で変数名が不一致だった。ドキュメント（AI生成）のミスによるもの。

- **Interface:** `modelData: ModelData | null`
- **Implementation:** `currentModel: null`

AI（Antigravity）が学習資料を作成する際、Storeの設計（`currentModel`）と型定義（`modelData`）で異なる名称を使用してしまい、実装時に食い違いが発生した。

## 解決策 (Fix)

`lib/store.ts` のInterface定義を実装側に合わせて修正。

```typescript
interface AppState {
  // ...
  currentModel: ModelData | null; // modelData -> currentModel
  // ...
}
```

## 教訓 (Lesson)

- **命名の一貫性:** State管理において、変数名は「それが何であるか（ModelData）」よりも「現在の状態（CurrentModel）」を表す方が文脈的に正しい場合が多いが、定義と実装はずらしてはいけない。
- **AIコードの盲信禁止:** AIが生成したスニペット同士でも整合性が取れていない場合があるため、型エラーが出たらまずは「定義(`interface`)」を疑うこと。
