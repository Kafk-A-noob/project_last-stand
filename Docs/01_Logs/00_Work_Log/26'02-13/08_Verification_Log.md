# Verification Log & Final Solution Plan

**Date:** 2026-02-13
**Status:** Analyzing Root Cause

## 1. 検証履歴 (Verification History)

ユーザーからの「Context Lost (クラッシュ)」報告に対し、以下の修正を提案しましたが、いずれも解消しませんでした。

| Plan           | 施策内容             | 結果         | 判明した事実                                     |
| :------------- | :------------------- | :----------- | :----------------------------------------------- |
| **Plan 17**    | `gltf.scene.clone()` | × クラッシュ | インスタンスの共有/競合が原因ではない。          |
| **Plan 17 v2** | `useGLTF` (Rewrite)  | × クラッシュ | ローダーの実装方法（手動vs自動）が原因ではない。 |
| **Plan 18**    | HTML排除 (Isolation) | × クラッシュ | `<Html>` コンポーネントのDOM競合が原因ではない。 |

## 2. 結論 (Conclusion)

**「GLTFLoader (または DracoLoader) が 404 エラーを受け取った瞬間、WebGLコンテキストを破壊する致命的な挙動をしている」** と断定できます。
これはアプリケーションコード（Reactコンポーネント）の問題ではなく、Loaderライブラリ内部、あるいはブラウザ/GPUドライバとの相性問題である可能性が高いです。これ以上コンポーネントの中身をいじっても直りません。

## 3. 最終解決案 (Plan 20: LoadGuard)

「エラーが起きるとクラッシュする」なら、**「エラーを絶対に起こさせない（Loaderに404を渡さない）」** のが唯一の解決策です。
`ManualLoader` の中で、`useGLTF` を呼ぶ前に、**自前で `fetch` してファイルの存在確認** を行います。
もしファイルがなければ、`useGLTF` を呼ばずに、安全にエラー画面を表示します。

### 修正方針

`ManualLoader.tsx` を修正し、`LoadGuard` パターンを実装します。

```tsx
// 概念コード
const [exists, setExists] = useState(null);

useEffect(() => {
  fetch(targetPath, { method: "HEAD" })
    .then((res) => {
      if (res.ok) setExists(true);
      else throw new Error("404 Not Found");
    })
    .catch(() => setExists(false));
}, [targetPath]);

if (exists === false) throw new Error("Model Not Found (Guard)"); // ErrorBoundaryでキャッチ
if (exists === null) return null; // チェック中

// ここまで来たら安全にロード
return <ModelLoader path={targetPath} />;
```

この方法なら、GLTFLoader は「存在するファイル」しか読みに行かないため、クラッシュ回避が可能です。
これが「望まない形の変更」に見えるかもしれませんが、クラッシュを防ぐための **防壁 (Guard)** として不可欠な設計です。
