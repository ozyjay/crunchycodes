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

The homepage currently features recent public Crunchy Codes repositories and
model artefacts:

- **ModelDeck**, a local runtime manager and stable capability gateway with
  versioned Routing Profiles, manifest-approved Qwen3.5 GGUF/Vulkan candidates,
  reviewed Qwen3.8 runtime paths, tool-calling Qwen3.5 and Gemma 4 routes, Live
  worker controls, and loopback OpenCode configuration.
- **Codex Router**, a local VS Code companion that recommends a current Codex
  model and reasoning effort through a deterministic policy or opt-in ModelDeck
  classifier before an explicitly approved Codex App Server turn.
- **WayFinder**, a local-first VS Code research POC for explainable, SLM-native
  routing, bounded agent loops, bounded read-only workspace evidence, and live
  evidence-coverage evaluation, with privacy-safe live traces and bounded
  recovery from eligible tool errors.
- **ModelConverter**, a hardware-aware Linux workbench for planning and running
  pinned llama.cpp/Vulkan GGUF transformations while retaining provenance,
  hardware fingerprints, and validation evidence.
- **VisionModelQuest**, a local-first vision-language model explorer and
  benchmark laboratory for Framework Desktop.
- **AgentWorldLab**, an offline-first Qwen-AgentWorld evaluation harness that
  treats generated observations as untrusted data and never executes them.
- **SceneChat**, a local camera, object-detection, and multimodal
  scene-description experience with explicit privacy and replay controls.
- **SpeakText**, private local speech-to-text dictation for Fedora GNOME
  Wayland, with revisable IBus previews, configurable gesture controls, and a
  safe sole-physical-microphone fallback when no default source is configured;
  ordinary editor keys are held while dictation is active.
- **Grab**, a GNOME Wayland screenshot and GIF capture tool with clipboard,
  editing, and optional local-save workflows.
- **SpeechShift**, a replay-first speech-transformation demonstration with an
  opt-in, memory-only microphone path and local DSP baseline.
- **DiffusionGemma Q4 for ModelDeck**, a published self-contained GPTQ Q4 g32
  and BF16 hybrid for local text diffusion on AMD ROCm.
- **Text Diffusion Lab**, a staged text-refinement demo with scripted fallback
  and an optional ModelDeck-backed DiffusionGemma mode.
- **Can You Spot the Scam?**, a local-first cybersecurity awareness game.
- **Humans in the Loop**, a crowd-controlled demonstration of AI oversight.
- **TokenTrail**, a token-level generation and probability teaching demo.
- **Repartee**, a local interactive voice-conversation research MVP.
- **Bouncer**, an Android live wallpaper maker project with configurable physics,
  two-stage calibration, frame-timing telemetry, and adaptive performance controls.
- **Codex Local Meter**, a local-only VS Code extension that preserves the
  Primary and Secondary rate-limit identities Codex reports while keeping
  session content on the user's machine.
- **System Usage Monitor**, a GNOME extension for Framework Desktop and Fedora
  with local sensor history plus optional Auto-Powersaver modes and diagnostics.
- **HuggingFacePull**, a local desktop, web, and CLI model snapshot manager with
  grouped model families, cache-aware removal, and optional Xet transfers.

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
