# ID-001: Radio (The First Signal) 制作仕様書

**Status:** In Progress
**Target Format:** `.glb` (glTF 2.0 Binary)

## 1. ジオメトリ (Geometry)

- **Poly Count (目安):** `15,000 ~ 20,000 Tris` (現在の12.7kは理想的)
- **Topology:** 三角形 (Triangulate) 済みで出力することを推奨。
- **UV:** 重なりなし (Non-overlapping) ※AOベイクのため必須。

## 2. マテリアル構成 (Materials)

パフォーマンスと見た目の両立のため、以下の2マテリアル構成とします。

### A. `Radio_Body` (不透明)

- **Shader:** PBR (Principled BSDF)
- **Textures:**
  - **BaseColor (Albedo):** sRGB
  - **ORM (Occlusion/Roughness/Metallic):** Linear (R=AO, G=Rough, B=Metal)
  - **Normal:** OpenGL (Tangential)
  - **Emission:** sRGB (もしLED点灯などが必要なら)

### B. `Radio_Glass` (半透明)

- **対象パーツ:** チューナー窓 (Tuner Window)、カセット蓋 (Cassette Lid)
- **Shader:** PBR (Principled BSDF)
- **Settings (Blender):**
  - **Base Color:** 少し青みがかったグレー or クリア
  - **Transmission:** `1.0`
  - **Roughness:** `0.2` ~ `0.4` (すりガラス/プラスチック感)
  - **Alpha:** `1.0` (不透明度は下げない)
- **Note:** リアリティを出すために環境マップ (`<Environment preset="city" />`) を使用しますが、**背景には表示させません** (`background={false}` 設定)。
  - これにより、「真っ黒な空間（Data Archive）」のコンセプトを維持しつつ、物質感（反射・屈折）のみを得ることができます。

## 3. 原点と構造 (Origin & Hierarchy)

- **原点 (Pivot):** 全て **World Origin `(0,0,0)`** に統一。
  - ※ アニメーション非対応版としてシンプルに実装するため。
  - ※ 将来的に動かす場合は、Unity/Blender側でリグを入れるか、原点を再調整します。

## 4. エクスポート設定 (glTF Export)

- **Format:** glTF Binary (`.glb`)
- **Include:** Selected Objects
- **Transform:** +Y Up (Blender Default is +Z Up, usually auto-converted but check)
- **Geometry:**
  - UVs: Yes
  - Normals: Yes
  - Vertex Colors: No (Unless used for masking)
- **Compression:** Don't compress in Blender (Let existing `ManualLoader.tsx` handle it, or use standard export).

## 5. 次のステップ (Next Steps)

1. **UV展開:** 全パーツをUVマップに展開。
2. **AOベイク:** 溝や接地感の陰影をテクスチャに焼き込む。
3. **テクスチャ作成:** Substance Painter等、またはBlender内プロシージャルでBaseColor/Roughnessを作成。
4. **エクスポート:** `.glb` を出力し、`public/models/radio.glb` に配置。
