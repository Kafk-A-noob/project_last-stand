# Work Log: UI Layout Stabilization (Hotfix)

**Date:** 2026-02-14
**Target:** ViewerLayout.tsx, InfoPanel.tsx
**Goal:** モバイルでの視認性向上と、モデル切り替え時のレイアウトシフト（ガタつき）を防止する。

## 1. 修正の背景

- **問題:** `InfoPanel` の高さが変わるとヘッダー全体が動き、UXを損なう。また、ロード中にパネルが消えるとフリッカー（チラつき）が発生する。
- **解決策:** `InfoPanel` を絶対配置（Absolute）にしてヘッダーから独立させる。また、ロード中もパネルを表示し続ける。

## 2. 実装手順 (Manual Coding Guide)

以下の手順でコードを修正してください。

### Step 1: フリッカー防止 (`src/app/components/ui/InfoPanel.tsx`)

ロード中もパネルを消さないように条件分岐を変更します。

`src/app/components/ui/InfoPanel.tsx`

**変更前:**

```tsx
  if (!isLoaded || !currentModel) return null; // データが無ければ何も表示しない
```

**変更後:**

```tsx
  // [Fix] isLoadedに関わらず、データさえあれば表示し続ける (Optimistic UI)
  if (!currentModel) return null;
```

---

### Step 2: 絶対配置化 (`src/app/components/layout/ViewerLayout.tsx`)

`InfoPanel` を `<header>` タグの外に出し、絶対配置にします。

`src/app/components/layout/ViewerLayout.tsx`

**変更手順:**

1. **`<header>` 内の `<InfoPanel />` を削除** します。

    ```tsx
    <header ...>
      <div>...</div>
      {/* <InfoPanel />  <-- これを削除 */}
    </header>
    ```

2. **`<header>` の直後（閉じタグの下）に以下を追加（移動）** します。
    ※ `</header>` と `{/* --- FOOTER --- */}` の間です。

    ```tsx
    {/* --- INFO PANEL LAYER (Absolute) --- */}
    {/* z-20: Header(z-10)より手前。pointer-events-autoでクリック可能 */}
    <div className="absolute top-20 right-6 z-20 md:top-24 md:right-12 pointer-events-auto">
      <InfoPanel />
    </div>
    ```

## 3. 確認事項

- [ ] モデル切り替え時、左上のタイトルや `// TERMINAL_ACCESS...` が**1ピクセルも動かないこと**。
- [ ] モデル切り替え時、右上のパネルが「一瞬消えてパッと出る」のではなく、**「中身だけが書き換わる」** こと。
- [ ] モバイル画面で、パネルが右上に配置されモデルの中心を隠しすぎていないこと。
