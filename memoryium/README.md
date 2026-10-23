# Memoryium on Crunchy Codes

This folder hosts Matching Pairs and Glance at:

- https://crunchycodes.net/memoryium/
- https://crunchycodes.net/memoryium/glance.html

The source project is https://github.com/ozyjay/Memoryium. These files were
copied from that project's `public/` directory, with canonical URLs and a
Crunchy Codes footer added to each page. No build or package installation is
required for the hosted games. Their styles are isolated from the main site.

To update, copy `public/` from Memoryium into this folder, retain the canonical
URLs and host footer in both HTML files, and retain `.host-footer` rules in
`styles/memoryium.css`. Recheck homepage links and the privacy/support sections
if game behaviour changes. Run the source project's browser tests against this
subfolder as well as `node --test tests/*.test.mjs` in this repository.

For a local preview from the repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/memoryium/. Both activities keep game state in the
open page only. Glance is experimental and is not a cognitive assessment or
validated clinical intervention.

## Mobile portrait layouts

Phone layouts use compact headers, four-column matching boards, and an
expandable Glance picture guide. During a Glance round, the introduction and
game navigation give way to the picture and answers. Controls remain at least
44px high. The source project's portrait tests cover 320 × 568, 360 × 640,
375 × 812, and 390 × 844, including all matching-board sizes and both types of
Glance answer.
