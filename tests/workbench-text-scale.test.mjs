import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

function ruleFor(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "m"));
  assert.ok(match, `Expected to find ${selector} rule`);
  return match[1];
}

const tileRule = ruleFor(".tile");
const tileTitleRule = ruleFor(".tile strong");

assert.match(
  tileRule,
  /container-type:\s*inline-size;/,
  "Tiles should expose their inline size for text scaling",
);

assert.match(
  tileTitleRule,
  /font-size:\s*clamp\([^;]*cqi[^;]*\);/,
  "Tile titles should scale from card/container width, not viewport width",
);

assert.doesNotMatch(
  tileTitleRule,
  /font-size:[^;]*vw/,
  "Tile title font-size should not use viewport units",
);
