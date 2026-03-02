# Blender to Web: Standard Shader から PBR (glTF) への頭の切り替え

3DモデラーがWeb3D (glTF) に移行する際、最も混乱するのが **「テクスチャのまとめ方 (Packing)」** です。
「Standard Shader (Unity)」と 「Standard Material (glTF)」は名前は似ていますが、**中身（チャンネルの使い道）は別物** です。

## 1. 比較: Unity vs Web (glTF)

Webでは通信量を減らすため、**「白黒の画像は1枚のRGBA画像にまとめる」** のが鉄則です。

| 特性 | リアルタイム3Dコンテンツ (Standard Shader) | Web (glTF PBR) | 解説 |
| :--- | :--- | :--- | :--- |
| **金属度** | `Metallic` (Alpha Channel等) | **B**lue Channel | Metalness。ほぼ同じ。 |
| **滑らかさ** | `Smoothness` (Alpha Channel等) | ❌ (存在しない) | WebにはSmoothnessはありません。 |
| **ザラつき** | ❌ (存在しない) | **G**reen Channel | **Roughness**。Smoothnessの **「逆」** (1.0 - Smooth) です。 |
| **影** | `Occlusion` (別テクスチャ) | **R**ed Channel | Ambient Occlusion。溝の影。 |
| **まとめ方** | Metallic+Smoothness (RGBA) もあるがバラバラが多い | **ORM Map** (必須) | **R**=Occ, **G**=Rough, **B**=Metal に絶対まとめる。 |

> [!IMPORTANT]
> **「Smoothness (ツルツル具合)」は忘れてください。**
> Webの世界では **「Roughness (ザラザラ具合)」** を使います。
> - Unity: 1.0 = 鏡のように反射する
> - Web: 0.0 = 鏡のように反射する (ザラつきゼロ)
>
> **つまり、白黒を反転 (Invert) させる必要があります！**

---

## 2. ORMマップの正体

Web用モデル(`.glb`)を作る時は、以下の3つの白黒画像を、1枚の画像の **R, G, B** チャンネルにそれぞれねじ込みます。これを頭文字を取って **「ORM Map」** と呼びます。

- **R**ed: **Ambient Occlusion (AO)**
  - 服のシワや溝に入っている影。
  - なければ真っ白(1.0)でOK。
- **G**reen: **Roughness**
  - **Smoothnessを反転したもの。**
  - 肌はザラザラ(白っぽい)、金属はツルツル(黒)。
- **B**lue: **Metalness**
  - 金属なら白(1.0)、布や肌なら黒(0.0)。
  - Standard ShaderのMetallicと同じ。

この3つを合成した画像は、**「毒々しい黄色やマゼンタ色が混じった変な画像」** になりますが、それで正解です。

---

## 3. Blender Node Setup (概念図)

帰宅後にBlenderで作業する際は、以下のようにノードを組んでベイク（焼き込み）します。

```mermaid
graph LR
    AO[Ambient Occlusion<br>(White/Black)] -->|Color| SeparateRGB_AO[Separate Color]
    Smooth[Smoothness Map<br>(VRC用)] -->|Color| Invert[Invert Color<br>(反転!)]
    Metal[Metallic Map<br>(VRC用)] -->|Color| SeparateRGB_Metal[Separate Color]

    SeparateRGB_AO -->|R| Combine[Combine RGB]
    Invert -->|G| Combine
    SeparateRGB_Metal -->|B| Combine

    Combine -->|Image| Result[ORM Texture<br>(Save as .png/.jpg)]
```

### 手順シミュレーション

1. VRC用の `Metallic / Smoothness` マップを用意する。
2. もし `Metallic` のアルファに `Smoothness` が入っているなら、分離(Separate)する。
3. `Smoothness` を **反転 (Invert)** させて `Roughness` にする。
4. `AO` (Red), `Roughness` (Green), `Metallic` (Blue) の順で **Combine RGB** ノードに繋ぐ。
5. これをテクスチャとしてベイクする。

これで、Webブラウザでもリアルタイム3Dコンテンツと同じような質感が再現できます。
