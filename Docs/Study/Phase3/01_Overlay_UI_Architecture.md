# Phase 3 Study: Overlay UI Architecture (Strict Training)

本ドキュメントは、**Web3DにおけるUI実装の基礎理論**（Overlay, Events, Responsive）を、Unityエンジニア向けに統合・再編集したものです。

## 1. Overlay Architecture (重ね合わせの理論)

Webにおける「3Dの上にUIを乗せる」技術は、Unity uGUIとほぼ同じ考え方で成り立っています。

| Web (CSS) | Unity (uGUI / Canvas) | 役割 |
| :--- | :--- | :--- |
| `absolute inset-0` | RectTransform (Anchor: Stretch All) | 親要素に対して全画面に張り付く |
| `z-index: 0` | Sort Order: 0 | 背景 (3D Viewport) |
| `z-index: 10` | Sort Order: 10 | 前景 (Overlay UI) |

### 構造図

```mermaid
graph TD
    Root[Page Root (relative)]
    L1[Layer 1: 3D Scene] -->|absolute z-0| Root
    L2[Layer 2: UI Overlay] -->|absolute z-10| Root
    
    style L1 fill:#333,stroke:#fff
    style L2 fill:#00f,stroke:#fff,stroke-dasharray: 5 5
```

---

## 2. Input Penetration (当たり判定の制御)

UIの「透明な部分」がマウス入力を吸ってしまい、後ろの3Dが操作できなくなる問題を `pointer-events` で解決します。

### `pointer-events-none`

- **Unity訳:** `CanvasGroup.blocksRaycasts = false` または Imageの `Raycast Target` オフ。
- **機能:** これが付いた要素は、マウスクリックなどのイベントを一切受け付けず、**物理的に存在しないもの（空気）** として扱われます。
- **結果:** クリックは後ろの 3D Scene (`OrbitControls`) に到達します。

### `pointer-events-auto`

- **Unity訳:** Buttonの `Raycast Target` オン。
- **機能:** 親が `none` でも、この子要素だけはイベントを受け付けるように復活させます。
- **結果:** 「画面全体はスルー(3D操作)するが、ボタンの上だけはクリックできる」という挙動になります。

---

## 3. Responsive Design (レスポンシブ対応)

Webでは「スマホとPC」で画面サイズが激変するため、Unityの `Canvas Scaler` よりも柔軟な対応が求められます。

### モバイルファースト (Mobile First)

Tailwind CSSは「まずスマホ（最小）のデザインを書き、PC（大きい画面）の場合を上書きする」というルールです。

| クラス名 | 適用される条件 | Unity訳 |
| :--- | :--- | :--- |
| `p-4` | 全サイズ（デフォルト） | スマホ用の設定 (Base) |
| `md:p-8` | 画面幅が 768px 以上 | PC/タブレット用の Override |

```tsx
// 例: スマホでは縦並び(flex-col)、PCでは横並び(flex-row)
<div className="flex flex-col md:flex-row ...">
  {/* ... */}
</div>
```

---

## 4. Web特有のトラブルシューティング

### A. Hydration Error (改行の罠)

SSR（サーバー側）と CSR（クライアント側）でHTMLが一致しないエラー。
よくある原因の一つが **「className文字列内の意図しない改行」** です。

```tsx
// ❌ Bad (改行コード \n が入る)
className="text-2xl
  font-bold"

// ⭕ Good (1行で書く)
className="text-2xl font-bold"
```

### B. JSXにおけるコメント

JSX (`return ( ... )`) の中は、特殊な空間です。

- **`// Comment`:** そのまま書くと「// Comment」という **文字** として画面に出てしまいます。
- **`{/* Comment */}`:** 波括弧で「コード書くよ」と宣言してからコメントアウトするのが正解。
- **`{"// Text"}`:** 逆に文字として「//」を出したい場合は、文字列として明示的にクォートする必要があります。
