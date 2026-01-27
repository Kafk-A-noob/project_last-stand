# 実装計画: Phase 1.9 Blender to Web 理論

## Goal Description

VRChat (Standard Shader) ユーザーが Web (glTF/PBR) 環境へ移行する際に最大の障壁となる「テクスチャパッキング (ORM Map)」の概念を、図解・対比を用いて解説し、帰宅後の作業効率を最大化する。

## User Review Required
>
> [!NOTE]
> コードの実装はなく、ドキュメント (`Docs/Implementation_Intent/`) の作成のみを行う。

## Proposed Changes

### 1. 理論解説資料の作成

#### [NEW] Docs/Implementation_Intent/04_Phase1.9_glTF_ORM_Theory.md

- **Standard Shader vs glTF Standard**
  - Metallic/Smoothness の扱い比較
  - マップ枚数の削減戦略 (通信量削減)
- **ORM Map 解説**
  - Red Channel: Ambient Occlusion (影の焼き込み)
  - Green Channel: Roughness (ざらつき = 1.0 - Smoothness)
  - Blue Channel: Metalness (金属度)
- **Blender Node Setup (Preview)**
  - Blenderでどう繋ぐかのスクリーンショット（あるいはテキスト図解）

## Verification Plan

### Manual Verification

- ユーザーに作成したドキュメントを読んでもらい、「VRChat用アバターのテクスチャをどう変換すればよいか」即答できる状態か確認する。
