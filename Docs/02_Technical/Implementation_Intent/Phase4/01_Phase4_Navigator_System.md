# Phase 4.5: Navigator System Architecture (Intent)

**作成日:** 2026-01-30
**対象:** Navigator, Store (targetPath), ManualLoader

## 1. なぜ「パス」をGlobal Stateに入れたのか？

### 意図 (Intent)

通常、3Dモデルの切り替えは親コンポーネント(`Page.tsx`)からPropsで渡す設計も可能です。
しかし、本プロジェクトでは**「UIOverlay (2D)」と「Canvas (3D)」のレイヤーが完全に分離されている**（`ViewerLayout`による構造）ため、Propsバケツリレーを行うと `Page.tsx` の責務が肥大化します。

### 解決策 (Solution)

**Zustand Store (`targetPath`)** を「司令塔」として配置しました。
- **UI側:** ボタンを押すとStoreに「このパスを表示しろ」と命令する (`setTargetPath`).
- **3D側:** Storeを監視し、命令が変わったら即座にロードを開始する。

これにより、UIと3Dが互いの存在を知らなくても連携できる「疎結合」な設計を実現しました。

## 2. Dynamic Loading の仕組み

### 意図 (Intent)

React Three Fiber の `useLoader` は、引数（パス）が変わると自動的にサスペンド（中断）し、非同期で新しいデータを読みに行く習性があります。これを利用しない手はありません。

### 実装 (Implementation)

`ManualLoader.tsx` にて：

```typescript
const targetPath = useStore((state) => state.targetPath);
const gltf = useLoader(GLTFLoader, targetPath, ...);
```

このたった2行の変更で、以下の複雑な処理をReactに任せることができます：
1. 旧モデルの破棄 (Unmount)
2. メモリの解放 (Dispose)
3. 新モデルのフェッチとデコード
4. ロード中の `Suspense` (ローディング画面) 表示

自前で `useEffect` を書いてロード処理を管理するのは「車輪の再発明」であり、バグの温床となるため避けました。

## 3. Debugging Strategy (Rule #138)

### 意図 (Intent)

`ManualLoader.tsx` に残した `console.log("Loaded GLTF:", gltf);` は、開発完了後も**意図的に削除しません**。

### 理由 (Reason)

- **Asset Verification:** Web3Dにおいて「表示されない」バグの原因は、プログラム(React)ではなくアセット(GLB)にあることが大半です（ボーン構造の不一致、テクスチャパス切れなど）。
- **Data Structure:** `gltf.scene` の中身（階層構造やメタデータ）をコンソールですぐに展開確認できることは、保守運用において必須の機能です。
- **404 vs Decode Error:** `fetch` エラー（404）なのか、`Draco` デコードエラーなのかを切り分けるために、このログの有無が生命線となります。
