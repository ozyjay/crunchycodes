# Crunchy Codes website

Static GitHub Pages website for `crunchycodes.net`, a personal maker site for
Crunchy Codes projects, notes, experiments, and developer tools.

## Site structure

- `index.html` is the homepage, with sections for recent public projects, local
  tools, project support, and contact.
- `support.html` explains how to report bugs, request features, and share
  security concerns for Crunchy Codes projects.
- `privacy.html` describes the default privacy posture for Crunchy Codes
  projects and includes Codex Local Meter-specific notes.
- `styles.css` contains the full visual treatment. There is no build step,
  JavaScript bundle, or framework.
- `404.html`, `robots.txt`, `sitemap.xml`, and `CNAME` support GitHub Pages and
  the custom domain.

## Featured portfolio

The homepage currently features recent public Crunchy Codes repositories:

- **TokenTrail**, an Open Day teaching demo that shows prompt tokens,
  next-token candidates, probabilities, and generated text as a replayable
  local trace.
- **HuggingFacePull**, a local FastAPI and CLI tool for searching, queueing,
  downloading, and cleaning up Hugging Face Hub model snapshots.
- **MLXDashboard** and **MLXChat**, paired Swift tools for managing an
  MLX-backed localhost provider and checking it through local chat clients.
- **Codex Local Meter**, a VS Code extension that shows local-only Codex CLI
  usage estimates from `~/.codex` session files.
- **Codex Local Meter App**, a native macOS menu bar companion for the VS Code
  extension.
- **ollama-manual-pull**, a CLI, web UI, and macOS app for manually downloading
  and registering Ollama models.
- **CameraShotPicker**, a SwiftUI utility for local camera RAW triage and
  keeper export.
- **OllamaAgent** and **OllamaChat**, local Ollama control-plane and VS Code
  assistant experiments.
- **ThoughtBench**, a local desktop chat app for Gemma and Qwen models.
- **VoiceChanger**, an early Open Day voice effects demo.

When releasing a new project version, check:

- Any version badges, project lanes, timeline entries, and status labels in
  `index.html`.
- The Marketplace, GitHub, and issue tracker links in `index.html`.
- The support details in `support.html`.
- The privacy summary in `privacy.html` when privacy claims change.

## Publish with GitHub Pages

1. Commit these files to the repository root.
2. In GitHub, open **Settings > Pages**.
3. Set the source to the default branch and root folder.
4. Confirm the custom domain is `crunchycodes.net`.
5. Enable **Enforce HTTPS** once GitHub makes the certificate available.

GitHub Pages can publish from a private repository when the account has GitHub
Pro, Team, Enterprise, or an equivalent active education benefit. On GitHub
Free, the repository normally needs to be public for Pages.

## Local checks

This site is plain HTML and CSS, so a normal browser can open the files
directly. Before publishing, check:

```sh
git diff --check
```

Then open `index.html`, `support.html`, `privacy.html`, and `404.html` locally
to confirm layout and links.

## Before launch

- Add new public projects as more work is published.
- Keep documentation, demo, release, and marketplace links current.
- Add your preferred contact details to `support.html` and `privacy.html`.
- Keep `CNAME` in the repository root so GitHub Pages retains the custom domain.
