# Troubleshooting: Disable React Strict Mode

「外部サンプル(Box.glb)」でもクラッシュする場合、原因はファイルではなく **Reactの動作仕様 (Strict Mode)** にある可能性が非常に高いです。

## 原因: Double Mount

React 18の `Strict Mode` (開発モード) は、バグ発見のために「あえてコンポーネントを2回マウント（作成→破棄→作成）」します。
Three.js/WebGLのコンテキスト生成がこれに追いつけず、GPUメモリの確保・解放が衝突して「Context Lost」を引き起こすケースがあります。

## 修正手順

`next.config.mjs` (または `.js`, `.ts`) を編集し、Strict Modeを無効化します。

### `next.config.mjs` の修正

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // これを false に変更する
  reactStrictMode: false, 
};

export default nextConfig;
```

## サーバー再起動 (必須)

設定ファイルの変更を反映させるため、ターミナルで `Ctrl+C` をしてサーバーを止め、再度 `npm run dev` してください。
