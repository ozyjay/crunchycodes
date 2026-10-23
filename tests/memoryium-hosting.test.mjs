import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (name) => readFileSync(path.join(root, name), "utf8");

test("Memoryium pages ship all local assets and navigation targets", () => {
  for (const name of ["memoryium/index.html", "memoryium/glance.html"]) {
    const html = read(name);
    for (const [, reference] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:https?:|data:)/.test(reference)) continue;
      const [pathname, fragment] = reference.split("#");
      let target = path.resolve(root, path.dirname(name), pathname || path.basename(name));
      assert.ok(existsSync(target), `${name}: missing ${reference}`);
      if (statSync(target).isDirectory()) target = path.join(target, "index.html");
      assert.ok(existsSync(target), `${name}: missing directory index for ${reference}`);
      if (fragment) {
        assert.ok(readFileSync(target, "utf8").includes(`id="${fragment}"`), `${name}: missing anchor ${reference}`);
      }
    }
  }
});

test("homepage links to both activities and sitemap includes their canonical URLs", () => {
  const home = read("index.html");
  const sitemap = read("sitemap.xml");
  for (const [link, file] of [["memoryium/", "memoryium/index.html"], ["memoryium/glance.html", "memoryium/glance.html"]]) {
    assert.ok(home.includes(`href="${link}"`), `Homepage must link to ${link}`);
    const canonical = `https://crunchycodes.net/${link}`;
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
    assert.ok(read(file).includes(`href="${canonical}"`));
  }
});
