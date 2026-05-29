# Crunchy Codes website

Static GitHub Pages website for `crunchycodes.net`, a personal maker site for
Crunchy Codes projects, notes, experiments, and developer tools.

## Site structure

- `index.html` is the homepage, with sections for projects, notes, tools, and
  contact.
- `support.html` explains how to report bugs, request features, and share
  security concerns for Crunchy Codes projects.
- `privacy.html` describes the default privacy posture for Crunchy Codes
  projects and includes Codex Local Meter-specific notes.
- `styles.css` contains the full visual treatment. There is no build step,
  JavaScript bundle, or framework.
- `404.html`, `robots.txt`, `sitemap.xml`, and `CNAME` support GitHub Pages and
  the custom domain.

## Featured project

The homepage currently features **Codex Local Meter**, a VS Code extension that
shows local-only Codex CLI usage estimates from `~/.codex` session files.

When releasing a new Codex Local Meter version, check:

- The version badge in `index.html`.
- The GitHub and issue tracker links in `index.html`.
- The support details in `support.html`.
- The privacy summary in `privacy.html`.

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

- Replace placeholder project, note, and tool text as more work is published.
- Add project, repository, documentation, or marketplace links when available.
- Add your preferred contact details to `support.html` and `privacy.html`.
- Keep `CNAME` in the repository root so GitHub Pages retains the custom domain.
