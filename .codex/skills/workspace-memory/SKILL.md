---
name: workspace-memory
description: Create or update a concise `Memory.md` in the current workspace to preserve project context, recent edits, git state, blockers, and next steps between sessions. Use when the user asks to remember progress, save handoff notes, summarize where work stopped, or maintain continuity across future Codex conversations.
---

# Workspace Memory

## Overview

Maintain a small, durable handoff file that lets a future Codex session resume work quickly without rereading the full conversation. Keep the file factual, current, and easy to scan.

## Workflow

1. Check whether `Memory.md` already exists at the workspace root.
2. If it exists, update it in place instead of creating a second memory file.
3. If it does not exist, create `Memory.md` at the workspace root.
4. Capture only the information that helps future execution:
   - project purpose
   - important files and their roles
   - current implementation status
   - recent decisions and why they matter
   - git or deployment state when relevant
   - known blockers, risks, or follow-up tasks
5. Keep the memory concise. Prefer short bullets over long prose.
6. Refresh stale details instead of appending duplicate history.

## Recommended Structure

Use stable sections when possible:

- `Project`
- `Current State`
- `Recent Changes`
- `Git / Remote`
- `Open Questions` or `Risks`
- `Next Steps`

Omit empty sections. Add a short `Last Updated` line when timing matters.

## Content Rules

- Write facts that another Codex instance can act on.
- Prefer concrete identifiers such as file paths, branch names, commit hashes, URLs, and dates.
- Summarize decisions, not the whole conversation.
- Record user preferences that affect future work.
- Remove or rewrite outdated notes when the project changes.
- Do not store secrets, tokens, or sensitive credentials.
- Do not turn the file into a changelog for every tiny edit.

## Update Heuristics

- After substantial coding work, refresh `Current State` and `Next Steps`.
- After Git operations, refresh `Git / Remote`.
- After resolving a blocker, delete or rewrite the blocker note.
- If the user asks "where did we leave off?" or similar, read `Memory.md` first if it exists.

## Output Style

- Use plain Markdown.
- Keep entries compact and high signal.
- Favor action-oriented phrasing that makes the next step obvious.
