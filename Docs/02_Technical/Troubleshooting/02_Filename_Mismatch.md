# Troubleshooting: Context Lost (ファイル名不一致)

「Context Lost」や読み込みエラーの重大な原因を発見しました。
ファイル名の **大文字・小文字・アンダースコア** がコードと実ファイルで一致していません。

## 診断結果

- **実際のファイル:** `public/models/React_Logo.glb` (Step 723で確認)
- **コードの指定:** `/models/react_logo.glb`

Windowsはファイル名の大文字小文字を区別しませんが、Webサーバー(Next.js)やブラウザ、そしてローダーライブラリはこれを厳密に区別し、**404エラー**（ファイルが見つからない）を引き起こす可能性があります。
GLTFローダーが404を受け取ると、HTMLのエラーページをボクセルデータとしてパースしようとしてクラッシュすることがあります。

## 修正アクション

`app/components/ReactLogo.tsx` のパスを、実際のファイル名に完全に一致させます。

```tsx
// 修正前
const { scene } = useGLTF('/models/react_logo.glb')

// 修正後 (ファイル名を確認してください)
const { scene } = useGLTF('/models/React_Logo.glb')
```

※もしご自身で保存したファイル名が `react_logo.glb` (小文字) ならば、コードは合っていますが、ディレクトリ確認の結果は `React_Logo.glb` でした。
エクスプローラーで実際のファイル名を確認し、**コードの方を**合わせてください。
