# Adjusting Rotation

「思ってたのと違う」原因は、**回転軸**にあります。
現在は「Z軸（視線軸）」で回しているため、時計の針のようにグルグル回っていると思います。

おそらく期待しているのは以下のどちらかでしょう。

## パターンA: 地球儀回し (Y軸回転)

ロゴがその場でくるくると横回転します。最も一般的な「展示物」の回転です。

```tsx
// Y軸 (縦軸) で回転
meshRef.current.rotation.y += delta * 0.5
```

## パターンB: 3D浮遊回転 (Floating Tumble)

無重力空間のように、斜めにゆっくりと回転します。

```tsx
// X, Y, Z 全てを少しずつ回す
meshRef.current.rotation.x += delta * 0.2
meshRef.current.rotation.y += delta * 0.3
meshRef.current.rotation.z += delta * 0.1
```

## 修正アクション

`app/components/ReactLogo.tsx` を編集し、`useFrame` の中身を書き換えてみてください。
一旦 **パターンA (Y軸回転)** にしてみることをお勧めします。
