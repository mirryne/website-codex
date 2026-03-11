# Memory

## Project
- Static landing page project for `LINK PLASTIC SURGERY` Taiwan consultation event.
- Main files:
  - `index.html`
  - `css/style.css`
  - `js/main.js`

## Current State
- `.codex/config.json` is set to:
  - provider: `openai`
  - model: `gpt-5.4`
- Landing page structure is implemented in `index.html`.
- Styling and responsive layout are implemented in `css/style.css`.
- Interactions are implemented in `js/main.js`:
  - scroll reveal animation
  - floating CTA visibility
  - topbar scroll state
  - countdown to `2026-03-14T10:00:00+08:00`
  - smooth anchor scrolling
- Local skill added at `.codex/skills/workspace-memory/` to maintain `Memory.md` across future sessions.

## Git / Remote
- This folder was not originally a Git repository.
- Git repository was initialized locally with branch `main`.
- Remote repository connected:
  - `https://github.com/mirryne/website-codex.git`
- Initial commit created:
  - `950f032` `Initial commit`
- Pushed successfully to `origin/main`.

## Notes
- There was a Git `safe.directory` warning because of ownership mismatch.
- It was handled per-command with `-c safe.directory=D:/projects/website-codex`.
- No global Git config was changed for that.

## Likely Next Steps
- Final QA in browser
- Check mobile layout and CTA behavior
- Verify event copy, links, and dates
- Add `.gitignore` if needed
