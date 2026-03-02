# 実装意図 (Implementation Intent) - Phase 1.5: React Hooks

**対象フェーズ:** Phase 1.5 (React Hooks Training)
**実施日:** 2026-01-25
**関連ファイル:** `app/components/Counter.tsx`, `app/page.tsx`, `app/components/Scene.tsx`

## 1. 目的と背景

Unity (リアルタイム3Dコンテンツ) での制作経験はあるが、Web開発は未経験であるエンジニアに向けて、Reactの核心である **「State (状態)」** と **「Props (データ伝達)」** を直感的に理解してもらうことを目的としました。
当初はUnity C# (Inspector, Start/Update) での比喩を試みましたが、**「Vanilla JS (素のJavaScript / DOM操作)」** との対比の方が理解の助けになると判断し、方針を転換しました。

## 2. 実装の核心 (Core Concepts)

### A. State管理 (`useState`)

Web開発における最大の問題は **「データが変わったのに、画面が変わっていない」** という不整合です。
Vanilla JSでは、変数を変えた後に必ず「画面書き換え処理」を手動で書く必要がありました。

| アプローチ | コード例 (概念) | メリット / デメリット |
| :--- | :--- | :--- |
| **Vanilla JS** | `count++; document.querySelector('#ui').innerText = count;` | **手動同期**。書き忘れによるバグが多発する。 |
| **React** | `setCount(count + 1)` | **自動同期**。データさえ変えれば、UIは勝手に追従する (Declarative UI)。 |

**採用理由:**
ポートフォリオのような複雑な3Dイタラクションを含むサイトでは、状態管理の手動同期は破綻するため、ReactのState管理が必須となります。

### B. コンポーネント間のデータ伝達 (`Props`)

3Dシーン (`Scene.tsx`) と 2D UI (`Counter.tsx`) をどう連動させるか？
Reactでは **「親から子へ、データをバケツリレーする」** という厳格なルール (単方向データフロー) があります。

- **NG:** 子が勝手に親の変数を触る (Global変数など)
- **OK:** 親がデータを `props` (引数) として子に渡す

### C. Stateのリフティング (重要)

当初、`Counter` コンポーネント内に `count` を持たせていましたが、これでは `Scene` コンポーネントが `count` を知ることができませんでした（兄弟間でのデータ共有はできない）。

**解決策:**
変数を **「共通の親 (`page.tsx`)」** に移動し、そこから両方の子に配る形に修正しました。これを **「Stateのリフティング」** と呼びます。

```mermaid
graph TD
    Page[page.tsx (親)<br>State: count, setCount]
    Counter[Counter.tsx (2D UI)]
    Scene[Scene.tsx (3D Scene)]

    Page -->|props: count, setCount| Counter
    Page -->|props: color| Scene
    Counter -.->|onClick| Page
```

## 3. セキュリティへの配慮

今回の実装で `useClient` ディレクティブを使用しましたが、これはクライアントサイド（ブラウザ）で動くことを意味します。

- **リスク:** ブラウザ上のメモリにある `count` 変数は、ユーザーが開発者ツールを使って自由に書き換え可能です。
- **教訓:** 「所持金」や「ゲームのスコア判定」など、書き換えられると困るロジックは、決してクライアントサイドだけで完結させてはいけません（今回は学習用なのでOK）。

## 4. 学習用メモ (復習用)

PCの前にいない時でも、以下の構文を思い出せるようにしておきましょう。

1. **変数の宣言:** `const [値, セット関数] = useState(初期値)`
2. **値の更新:** `セット関数(新しい値)`
3. **子の定義:** `function Child({ 受け取る名前 }: { 受け取る名前: 型 }) { ... }`
4. **親からの渡し:** `<Child 受け取る名前={渡す値} />`

## 5. 今後の展望

StateとPropsが理解できたことで、次は **「非同期処理 (データのロード)」** や **「より複雑な3Dインタラクション」** に進む準備が整いました。
Phase 2では、Blenderで作ったモデルを読み込み、このPropsの仕組みを使って色やアニメーションを制御します。
