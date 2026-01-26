# Unity(VRC)アバター制作者のためのR3F翻訳ガイド

貴官は「C#ゴリゴリのエンジニア」ではなく「アバター改変・ギミック作成者」であるという前提に基づき、**VRChat Editorの操作** に例えて解説し直します。

## 1. Asset Loading: 「Projectに入れてドラッグ」 vs 「Boothから取り寄せ」

### Unity (VRChat) の感覚

1. Boothで買った衣装(UnityPackage)をインポートする。
2. Projectウィンドウにファイルとして存在する。
3. Hierarchyにドラッグ＆ドロップすると、**一瞬で表示される**。
   → **「既にPC内にある」** から待ち時間がない。

### R3F (Web) の感覚

Webサイトを見るユーザーのPCには、まだ衣装データがありません。
`useGLTF` は、**「ユーザーがサイトを開いた瞬間に、Boothからダウンロードして、終わったらSceneに置く」** という処理を全自動でやっているイメージです。

```tsx
// R3F
function MyAvatar() {
    // 1. ネット経由でGLBをダウンロード (数秒かかるかも？)
    // 2. その間、画面には「Loading...」を出す (Suspense機能)
    // 3. 届いたらシーンに置く
    const { scene } = useGLTF('/avatar.glb')
    
    return <primitive object={scene} />
}
```

**重要:** Webでは「ドラッグ＆ドロップ」の手軽さの裏で、必ず **「ダウンロード待ち時間 (Loading)」** が発生します。これを意識するのが最大の違いです。

---

## 2. Prefab vs Component

### Unity: Prefab Variant

「着せ替え済みの完成形アバター」をPrefab化して保存します。
同じアバターを3体並べたいなら、Prefabを3回ドラッグします。

### R3F: React Component

「コンポーネント」とは、**「Prefab Variant を自動生成するマクロ（スクリプト）」** だと思ってください。

```tsx
// これが "Avatar_Variant_Final.prefab" の設計図
function Avatar(props) {
    const { scene } = useGLTF('/avatar.glb')
    return <primitive object={scene} position={props.pos} />
}

// Hierarchyに3体置く
<Canvas>
    <Avatar pos={[0,0,0]} />
    <Avatar pos={[1,0,0]} />
    <Avatar pos={[2,0,0]} />
</Canvas>
```

Prefabをコピー＆ペーストする代わりに、タグ `<Avatar />` を書くと、その場で見えない小人が「Prefab Variant」を組み立てて置いてくれるイメージです。

---

## 3. Hierarchy Structure: 親子関係

VRChatでアクセサリの位置調整をする時、**「Armature (Bone)」の下に衣服のPrefabを入れ子**にしますよね？
React（JSX）も全く同じです。**「タグの入れ子」** がそのまま **「Hierarchyの親子関係」** になります。

```tsx
// Unity Hierarchy:
// ▼ Group (親)
//    ▼ Mesh (子)
//       Pos: 0,0,0 (親からの相対座標)

// React Code:
<group>
    <mesh position={[0,0,0]} />
</group>
```

閉じタグ `</group>` が、Hierarchyの「▼」を閉じる場所です。

---

## 4. Animation: Animation Controller vs Code

### Unity (Animator)

「Walk」や「Idle」のAnimation Clipをステートマシン（Animator Window）で繋ぎ、Parameters (Int/Bool) で切り替えます。

### R3F (Actions)

WebではAnimator WindowのようなGUIはありません。
その代わり、**「Animation Clipの再生ボタンを直接コードで押す」** イメージです。

```tsx
const { actions } = useAnimations(animations, scene)

// "Walk" クリップを再生！
useEffect(() => {
    actions["Walk"].play() 
}, [])
```

Radial Menu (ExMenu) の代わりに、HTMLのボタン等でこの `play()` をトリガーします。
