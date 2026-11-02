// Går något av detta fel ska sidan inte ut: byggena måste gå att köpa i spelet och summorna stämma.
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { PERKS, CLASSES, GOALS, CHALLENGES, buildFor, buildError } from "./data.js";

assert.equal(Object.keys(PERKS).length, 21, "Blizzard anger 21 perkar");
assert.equal(CHALLENGES.reduce((a, c) => a + c.points, 0), 65, "Blizzard anger 65 utmaningar");
for (const c of CHALLENGES) {
  const n = c.grid ? c.grid.rows.length * c.grid.cols.length : c.items.length;
  assert.equal(n, c.points, c.group);
}
for (const goal of Object.keys(GOALS)) {
  for (const cls of CLASSES) {
    const err = buildError(buildFor(goal, cls));
    assert.equal(err, null, `${goal}/${cls.name}: ${err}`);
  }
}
assert.ok(buildError({ "Bountiful Harvest": 5, "Bartering": 2, "Master Chef": 5, "Luremaster": 2, "Dedicated Study": 1, "The Quick and the Dead": 1 }), "grindarna måste kunna fälla ett bygge");

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
assert.ok(!html.includes("—"), "inget tankstreck i texten");
console.log("ok");
