# Phase 3 Design: Advanced UI Components Strategy

**作成日:** 2026-01-29
**概要:** Smart Loading画面とStatus Windowの設計推移。

---

## 2026-01-29 13:00: Initial Draft (草案)

ユーザーの要望:
- 「一瞬で読み終わる軽量モデル」の時はロード画面を出したくない（チラつき防止）。
- 「重いモデル」の時だけ、ロード画面（数字やゲージ）を出したい。
- モデル情報の表示ウィンドウを作りたい。

### 1. スマート・ローディング画面 (Smart Loading)

**提案:** "Debounced Fallback" (表示遅延)
Reactの `<Suspense>` は即座にロード画面を出す仕様だが、CSSで遅延させることで解決する。
- **実装:** CSS `animation-delay: 500ms;`
- **挙動:** 0.5秒以内にロード完了すれば、ユーザーには何も表示されない。

### 2. ステータスウィンドウ (Status Window)

**提案:** "Info Panel Component"
コンポーネント `InfoPanel.tsx` を作成し、手動でデータを渡す。

```typescript
type ModelInfo = {
  name: string;        // 例: "Anti-Gravity Shoes"
  fileSize: string;    // 例: "14.5 MB"
  vertices: number;    // 例: 12,400
  description: string; // 例: "反重力装置を内蔵したスニーカー..."
};
```

---

## 2026-01-29 13:30: Feasibility Update (自動化の検討)

**ユーザーからの追加要件:**
- モデルデータ（頂点数、サイズ、名前）をプログラムから自動取得したい。
- ロード画面で「X MB / Y MB」のリアルタイム表示をしたい。
- 「手書き」運用は実用的ではないため、自動化が不可なら実装を見送る可能性がある。

### 1. ロード画面：データ容量の取得

**判定:** ✅ 実現可能
`@react-three/drei` の `useProgress` フックを使用する。

```tsx
const { loaded, total } = useProgress();
// loaded: 読み込み済みバイト
// total: 全体バイト
```

これと前述の「表示遅延」を組み合わせることで、「重いモデルの時だけ、詳細な進捗バーが出る」挙動を実現する。

### 2. ステータスウィンドウ：メタデータの自動化

**判定:** ✅ 実現可能 (Blender連携)
フロントエンドでのJSON管理を廃止し、3Dモデルファイル自体にデータを持たせる。

- **メタデータ (名前・説明):** Blenderの **Custom Properties** に入力。
  - R3F側からは `gltf.scene.userData` でアクセス可能。
- **統計データ (頂点数):** ロード完了時にScriptでメッシュを走査 (`traverse`) して計算可能。
- **ファイルサイズ:** `useProgress` の `total` 値を流用可能。

### 3. セキュリティ (XSS)

**判定:** ✅ 安全
Reactの標準エスケープ機能により、Blenderのプロパティに悪意あるスクリプトが含まれていても無害化される。

---

## 結論と次のアクション

「Blenderセントラル管理」方式を採用し、以下の順で実装を進める。

1. `SmartLoader` コンポーネントの実装 (useProgress + CSS Delay)。
2. Blender側での Custom Properties 設定実験。
3. `InfoPanel` コンポーネントの実装とデータ連携。
