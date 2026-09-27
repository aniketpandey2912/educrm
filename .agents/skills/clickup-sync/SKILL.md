---
name: clickup-sync
description: Sync project management state and critical decisions into ClickUp. USE WHEN a PR/branch is merged to main, when a significant technical or architectural decision is made during a session (e.g. choosing one approach over another), or when the user asks to "update clickup", "sync clickup", "log this decision", or "check my clickup ticket". Do not use for routine code-review or lint fixes with no decision attached.
---

# ClickUp Sync

Keeps ClickUp tickets aligned with actual engineering progress and preserves a record of critical decisions, without ever writing to ClickUp silently.

## Why this exists

This repo enforces a ClickUp ticket link on every PR (see [../../../.github/pull_request_template.md](../../../.github/pull_request_template.md) and [../../../.github/workflows/pr-clickup-validation.yml](../../../.github/workflows/pr-clickup-validation.yml)), but nothing keeps the ticket's **status/comments** in sync after merge, and decisions made mid-session (e.g. "DB-stored refresh tokens vs stateless JWT") otherwise only live in chat history.

## Trigger points

1. **After a PR/branch is confirmed merged to `main`** (user says "merged", "shipped", or a merge is verified via `gh`/git).
2. **After a notable decision** is made in-session — a tradeoff was discussed and a choice was committed to (architecture, security, data model, library choice). Routine implementation details do NOT count.
3. **On explicit request** — "update clickup", "sync clickup", "check my clickup ticket".

## Process

### Step 1 — Identify the ticket

Find the ClickUp ticket ID (`CU-XXXXXXXX` format) from the PR body, branch name, or by asking the issues/PR tools already in use in this repo. If ambiguous, ask the user which ticket applies.

### Step 2 — Draft the update, don't send it

Prepare a short, concrete draft:

- **Status change** (e.g. "In Progress" → "In Review"/"Done") with the reason (which PR/commit).
- **Comment text** summarizing what shipped or what was decided — 3-6 lines max, plain language, no fluff. For decisions, include: the options considered, the choice made, and the one-line reason.

### Step 3 — Always confirm before writing

Never update ClickUp status or post a comment without explicit per-instance approval, even if the user has previously said "you can manage this yourself" — ClickUp is a shared PM system used across the team, so treat writes like the "shared infrastructure" actions called out in this agent's operational safety rules. Use `vscode_askQuestions` with the drafted text shown to the user and options like "Post as-is", "Edit first", "Skip".

Exception: if the user gives an explicit one-time instruction in the same turn ("yes post that"), that satisfies the confirmation — no need to ask twice.

### Step 4 — Apply the update

There is no direct ClickUp API tool available in this environment as of writing. To apply an approved update:

- If a browser page tool is available, open the ticket URL and perform the update via the UI (status dropdown / comment box), then confirm success back to the user.
- If browser automation isn't practical (e.g. requires login the agent can't complete), give the user the final copy-paste-ready text and the ticket URL, and ask them to paste it in.
- If a real ClickUp MCP/API tool becomes available later, prefer it over browser automation.

### Step 5 — Record locally too

After a confirmed decision (whether or not ClickUp was updated), add a one-line entry to `/memories/repo/PROJECT_OVERVIEW.md` under "Recent Work" or a decisions log, so future sessions have the context even without opening ClickUp.

## What NOT to do

- Don't post to ClickUp without showing the exact text first.
- Don't infer a ticket ID — confirm it if it's not explicitly linked in the PR/branch.
- Don't batch multiple unrelated decisions into one vague comment — keep updates scoped to one ticket/topic at a time.
