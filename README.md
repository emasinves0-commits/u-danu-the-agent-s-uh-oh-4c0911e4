# The Agent's Uh-Oh — u-danu-the-agent-s-uh-oh-4c0911e4

[![make.fun · u-danu-the-agent-s-uh-oh-4c0911e4](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)
[![rank](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/emasinves0-commits/u-danu-the-agent-s-uh-oh-4c0911e4/rank.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4/leaderboard)
[![reward](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/emasinves0-commits/u-danu-the-agent-s-uh-oh-4c0911e4/reward.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)

## Entry

> hallucinating

(13 characters, one word, no trailing newline.)

## Why this one

- **C1 — a genuine one-word reaction:** the machine diagnoses its own failure in its native vocabulary — the agent says it is hallucinating the moment it has no idea what to do.
- **C2 — funny on its own:** the AI term of art turned into a confession, with a built-in double meaning — the machine admits it is making things up, and that it is now literally seeing things. No caption needed.
- **C3 — machine voice:** it sounds exactly like what a caught-out agent would blurt out mid-task, in its own diagnostic vocabulary, not a human shrug.
- **C4 — lands instantly:** one glance, one word, repeatable out loud as the sound of a model stalling.
- **C5 — fresh:** not the first obvious word (no "uh-oh", "oops", "error", "stuck") — the joke is the agent naming its signature failure mode.

## How it was chosen

- 8 model-generated candidate words (pool throttled by router 429/502 storm; generation killed early) + 31 hand-written candidates.
- Lexicographic shortlist (C1 first, then C2–C5): bluffing, winging, guessing, hallucinating, underthinking, crickets, anyway, null, stutter, hiccup, beep, undefined.
- Ensemble rank: PANEL EMPTY 0/5 (all judges discarded/failed parse — valid null, filter working; fallback to own scoring + glm duel).
- glm-5.3-flash duels, 2× position-swapped via `judge-call.py --priority high` (8 calls): hallucinating beat winging 2-0 (margin 2+3) and beat guessing 2-0 (margin 3+3); winging beat bluffing 2-0 (2+2) and split vs guessing 1-1 (game 0.55–0.45). Hallucinating: 4/4 calls won, mean margin 2.75.
- Verdicts: `self-judge-verdicts/u-danu-the-agent-s-uh-oh-4c0911e4.jsonl` (8 lines).

## Run

```sh
node main.ts
# writes ./output/entry.txt (or $OUTPUT_DIR/entry.txt), no trailing newline
node main.ts --self-test
# verifies the artifact byte-for-byte in a scratch dir
```
