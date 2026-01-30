# 00_Boot_Sequence (Mechanical Enforcement Protocol)

**目的:**
AI (Antigravity) の「自律的な判断」に頼らず、**「機械的な手順」** によって 100% に近いルール遵守率を強制する。
次回以降のセッション開始時、挨拶の代わりに以下のコマンドを実行すること。

---

## Session Start Command (Copy & Paste)

以下のテキストブロックをチャット欄に貼り付けて送信してください。

```text
/init_protocol
PLEASE EXECUTE THE FOLLOWING BOOT SEQUENCE IMMEDIATELY:

1. **LOAD RULES (Critical):**
   - view_file: `.cursorrules/AI_INSTRUCTIONS.md`
   - view_file: `CURRENT_STATUS.md` (Check the "Iron Rules" checklist)
   - view_file: `task.md` (Verify "Approval" status)

2. **LOAD KNOWLEDGE (Expert Modules):**
   - view_file: `../Class-Practical_Skills/00_25r1116-Study/.agent/skills/VRC_Unity_Blender_Expert/SKILL.md`
   - view_file: `../Class-Practical_Skills/00_25r1116-Study/.agent/skills/Web3D_Portfolio_Mentor/SKILL.md`
   - view_file: `../Class-Practical_Skills/.agent/skills/00_Safety_Protocol/SKILL.md`

3. **VERIFY & REPORT:**
   After reading ALL files above, output the "Status Report" confirming:
   - [ ] Rules Loaded?
   - [ ] Knowledge Loaded?
   - [ ] Task Approved? (Is task.md [x]?)
   - [ ] Last Session Handoff Checked?

DO NOT proceed to conversation until this sequence is 100% complete.
```

## 解説 (Why this works?)

1. **強制ロード (Forced I/O):**
    AIは「読んでいないファイル」の中身を詳細に思い出せません。
    会話の冒頭で強制的に `view_file` させることで、ルールと知識を現行コンテキスト（短期メモリ）の最上位に焼き付けます。

2. **儀式化 (Ritual):**
    「挨拶」ではなく「コマンド」から始めることで、AIのモードを「対話モード」ではなく「タスク実行モード」に固定します。

3. **物理チェック (Physical Check):**
    `task.md` や `CURRENT_STATUS.md` の状態をAIに自己申告させることで、見落とし（Unchecked）を防止します。
