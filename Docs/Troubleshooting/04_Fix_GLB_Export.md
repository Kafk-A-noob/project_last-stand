# Troubleshooting: GLB Re-export & Restoration

「箱」が表示されたことで、**R3F環境は正常**であり、原因が **GLBファイルそのもの** (またはその読み込み設定) にあることが確定しました。

主な原因は **Draco圧縮 (Compression)** がONになっていることです。R3Fのデフォルト設定では圧縮されたGLBを読めず、クラッシュします。

以下の手順で修正します。

## 1. Blenderでの再エクスポート (Re-export)

Blenderに戻り、以下の設定で再度エクスポートしてください。

1. **File -> Export -> glTF 2.0 (.glb)**
2. 右側の設定パネルを開く:
    * **Data -> Mesh -> Compression:** **OFF (チェックを外す)** ※重要
    * **Include -> Limit to Selected Objects:** **ON**
    * **Transform -> +Y Up:** **ON**
3. ファイル名: `React_Logo.glb` (大文字小文字に注意)
4. 保存先: `D:\KafkA\Documents\project_last-stand\public\models\` (上書き保存)

## 2. コードの復旧 (Restore)

`app/components/ReactLogo.tsx` を修正し、箱テスト用コードから本来のコードに戻します。
**注意:** パスは `../../public` ではなく、Webルートからの絶対パス `/models/...` を使います。

```tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// Center, Clone, useGLTF をインポート
import { useGLTF, Billboard, Clone, Center } from '@react-three/drei'
import * as THREE from 'three'

export default function ReactLogo() {
  // 1. パスは '/models/React_Logo.glb' (実際のファイル名)
  const { scene } = useGLTF('/models/React_Logo.glb')
  
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5
    }
  })

  return (
    <Billboard follow={true}>
      <Center>
        {/* 箱(boxGeometry)を削除し、Cloneを復活 */}
        <Clone 
          object={scene} 
          ref={meshRef} 
          scale={[0.5, 0.5, 0.5]} 
        />
      </Center>
    </Billboard>
  )
}
```

## 3. 確認

これでブラウザに「Reactロゴ」が表示され、回転しているはずです。
もしこれでもダメな場合、Blenderで「Apply Scale」を忘れていないか再確認してください。
