# Who Am I Homepage Section Design

## Context

The Crunchy Codes homepage is a static GitHub Pages site with one HTML file, one shared stylesheet, and no build step. The current homepage introduces Crunchy Codes as a public workshop for local-first software, AI-assisted utilities, and practical developer experiments. It already uses first-person copy, but it does not yet identify the person behind the work.

## Goal

Add a warm, named "Who am I" section near the top of the homepage. The section should help visitors understand that Crunchy Codes is the public project workshop of Dr Jason Holdsworth, a Digital Technology academic and educator at James Cook University, while keeping the site focused on the tools and experiments.

## Placement

Place the new section immediately after the hero and before the "Now building" section. This gives readers a human anchor early without displacing the existing project-first flow.

Add an `About` navigation link that points to the section anchor. Keep the existing navigation compact and preserve the links to Projects, Now building, Local tools, Tools, Support, and Contact.

## Content

Use the heading:

> I build practical local-first tools.

Use this intro direction:

> I'm Dr Jason Holdsworth, a Digital Technology academic and educator at James Cook University, and the maker behind Crunchy Codes. My work sits around local-first software, practical AI tools, teaching demos, and human-AI interaction experiments.

Include concise supporting tags:

- Digital Technology educator
- Local-first software
- Teaching demos
- Human-AI interaction

The wording should be personal and credible, not resume-like. It should mention the JCU career directly but avoid turning the homepage into an academic profile.

## Visual Design

Use the supplied avatar image of Jason as a square-cropped illustrated portrait. The section should use a restrained two-column layout:

- Left column: avatar, "Who am I" eyebrow, and "Dr Jason Holdsworth" name.
- Right column: section heading, short intro paragraph, and supporting tags.

Match the existing site language:

- 8px border radius.
- Existing colors and borders from `styles.css`.
- Existing `eyebrow`, `meta-list`, and section spacing patterns where possible.
- Responsive behavior that collapses cleanly to one column on mobile.

## Assets

Copy the provided avatar into a project asset path, such as `assets/jason-avatar.png`, and reference it from `index.html`.

Use descriptive alt text:

> Illustrated avatar of Dr Jason Holdsworth

## Implementation Scope

Update only the static site files needed for the feature:

- `index.html`
- `styles.css`
- the new avatar asset

Do not add JavaScript, a build system, or unrelated page changes.

## Verification

Run the existing local checks:

- `node tests/workbench-text-scale.test.mjs`
- `git diff --check`

Open or preview `index.html` in the browser and verify:

- The new section appears after the hero.
- The avatar loads.
- The navigation link jumps to the section.
- The layout remains readable at desktop and mobile widths.
