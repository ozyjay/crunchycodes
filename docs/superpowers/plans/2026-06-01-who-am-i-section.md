# Who Am I Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a named "Who am I" section with Dr Jason Holdsworth's avatar, career context, and project themes to the Crunchy Codes homepage.

**Architecture:** This is a static GitHub Pages site with no build step. The change adds one image asset, one semantic homepage section after the hero, and a small set of CSS rules that follow the existing section/card/tag patterns.

**Tech Stack:** HTML, CSS, GitHub Pages, Node-based existing test script.

---

## File Structure

- Create: `assets/jason-avatar.png`
  - Stores the supplied illustrated avatar for the homepage section.
- Modify: `index.html`
  - Adds an `About` nav link and the new `#about` section after the hero.
- Modify: `styles.css`
  - Adds responsive layout, avatar, intro, and tag styles for the new section.
- Use existing test: `tests/workbench-text-scale.test.mjs`
  - Confirms the existing CSS text-scaling safeguards still pass.

### Task 1: Add Avatar Asset

**Files:**
- Create: `assets/jason-avatar.png`

- [ ] **Step 1: Create the asset directory**

Run:

```bash
mkdir -p assets
```

Expected: `assets/` exists.

- [ ] **Step 2: Copy the supplied image**

Run:

```bash
cp /Users/cpjjh/Downloads/Jason_a_happy_young_man_wearing_glasses_facing_camera_backlit_b_59ca4a1d-f284-4976-b37a-719ddff5911f.png assets/jason-avatar.png
```

Expected: `assets/jason-avatar.png` exists and is tracked by git after staging.

### Task 2: Add Homepage Markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the nav link**

Insert the `About` link after the brand-visible primary `Projects` link:

```html
<a href="#projects">Projects</a>
<a href="#about">About</a>
<a href="#now-building">Now building</a>
```

Expected: The header still includes Projects, About, Now building, Local tools, Tools, Support, and Contact.

- [ ] **Step 2: Add the section after the hero**

Insert this section immediately after the closing `</section>` for `.hero` and before the existing `now-building` section:

```html
<section class="about-me" id="about" aria-label="About Dr Jason Holdsworth">
  <div class="about-identity">
    <img
      class="about-avatar"
      src="assets/jason-avatar.png"
      alt="Illustrated avatar of Dr Jason Holdsworth"
      width="320"
      height="320"
    />
    <div>
      <p class="eyebrow">Who am I</p>
      <h2>Dr Jason Holdsworth</h2>
    </div>
  </div>
  <div class="about-copy">
    <h2>I build practical local-first tools.</h2>
    <p>
      I'm Dr Jason Holdsworth, a Digital Technology academic and educator at
      James Cook University, and the maker behind Crunchy Codes. My work sits
      around local-first software, practical AI tools, teaching demos, and
      human-AI interaction experiments.
    </p>
    <div class="meta-list" aria-label="About Jason highlights">
      <span>Digital Technology educator</span>
      <span>Local-first software</span>
      <span>Teaching demos</span>
      <span>Human-AI interaction</span>
    </div>
  </div>
</section>
```

Expected: The new section has a stable `#about` anchor, descriptive `aria-label`, avatar dimensions, and readable copy.

### Task 3: Add Section Styling

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Add desktop styles near the existing `.now-building` styles**

Add:

```css
.about-me {
  display: grid;
  grid-template-columns: minmax(180px, 0.58fr) minmax(0, 1.42fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: center;
  margin: 0 clamp(20px, 5vw, 72px) clamp(26px, 5vw, 42px);
  padding: clamp(24px, 5vw, 42px);
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
}

.about-identity {
  display: grid;
  gap: 18px;
  align-items: start;
}

.about-avatar {
  display: block;
  width: min(100%, 220px);
  height: auto;
  aspect-ratio: 1;
  border: 1px solid var(--line);
  border-radius: 8px;
  object-fit: cover;
}

.about-identity h2 {
  margin-bottom: 0;
  font-size: clamp(1.55rem, 2.8vw, 2.35rem);
}

.about-copy {
  max-width: 760px;
}

.about-copy h2 {
  font-size: clamp(2rem, 4vw, 3.3rem);
}

.about-copy p {
  color: var(--muted);
  font-size: 1.06rem;
}
```

Expected: The section matches the existing card/band language without nested card styling.

- [ ] **Step 2: Add responsive behavior to the existing media query**

Include `.about-me` in the `@media (max-width: 820px)` one-column grid rule:

```css
.hero,
.about-me,
.now-building,
.lane-grid,
.principle-list,
.feature-grid {
  grid-template-columns: 1fr;
}
```

Expected: The section collapses cleanly to one column on mobile.

### Task 4: Verify

**Files:**
- Test: `tests/workbench-text-scale.test.mjs`
- Inspect: `index.html`
- Inspect: `styles.css`

- [ ] **Step 1: Run the existing CSS test**

Run:

```bash
node tests/workbench-text-scale.test.mjs
```

Expected: exit code `0`.

- [ ] **Step 2: Check whitespace and patch format**

Run:

```bash
git diff --check
```

Expected: no output and exit code `0`.

- [ ] **Step 3: Preview in browser**

Open `index.html` or serve the directory and inspect the homepage.

Expected:

- The `About` nav link jumps to the new section.
- The section appears after the hero and before "Now building".
- The avatar loads from `assets/jason-avatar.png`.
- The desktop layout is two columns.
- The mobile layout is one column with no overlapping text.

### Task 5: Final Commit

**Files:**
- Stage: `assets/jason-avatar.png`
- Stage: `index.html`
- Stage: `styles.css`
- Stage: `docs/superpowers/plans/2026-06-01-who-am-i-section.md`

- [ ] **Step 1: Review changed files**

Run:

```bash
git status --short
git diff -- index.html styles.css docs/superpowers/plans/2026-06-01-who-am-i-section.md
```

Expected: only the planned files are changed.

- [ ] **Step 2: Stage and commit**

Run:

```bash
git add assets/jason-avatar.png index.html styles.css docs/superpowers/plans/2026-06-01-who-am-i-section.md
git commit -m "Add who am I homepage section"
```

Expected: commit succeeds with the planned homepage section changes.

## Self-Review

- Spec coverage: The plan covers placement after hero, named JCU career copy, avatar asset, `About` nav link, existing visual language, responsive behavior, and verification.
- Placeholder scan: No placeholders, deferred steps, or ambiguous implementation instructions remain.
- Type and selector consistency: The section uses `#about`, `.about-me`, `.about-identity`, `.about-avatar`, and `.about-copy` consistently across HTML and CSS.
