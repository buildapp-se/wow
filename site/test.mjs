// Går något av detta fel ska sidan inte ut: byggena måste gå att köpa i spelet och summorna stämma.
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { PERKS, CLASSES, GOALS, CHALLENGES, buildFor, buildError } from "./data.js";
import { HANDEL, BUDGET, PHASES, pris } from "./plan.js";

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

// Handeln: säljpriset ska ge vinst och aldrig ligga över Graphed-taket.
const TAK = { "Tak 5 g": 50000, "Tak 20 g": 200000, "Tak 50 g": 500000 };
for (const h of HANDEL) {
  assert.ok(h.antal > 0 && h.kop > 0, h.vad);
  if (h.salj) assert.ok(h.salj > h.kop * 1.3, `${h.vad}: för liten marginal`);
  const tak = Object.keys(TAK).find((t) => h.grund.includes(t));
  if (tak) {
    assert.ok(h.salj <= TAK[tak] * 0.95, `${h.vad}: över taket`);
    assert.ok(h.kop <= TAK[tak] * 0.5, `${h.vad}: för dyrt köp`);
  }
}
assert.equal(pris(45000), "4 g 50 s");
assert.equal(pris(300), "3 s");
assert.equal(pris(830), "8 s 30 k");

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const allText = html + readFileSync(new URL("./plan.js", import.meta.url), "utf8") + readFileSync(new URL("./data.js", import.meta.url), "utf8");
assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
assert.ok(!allText.includes("—"), "inget tankstreck i texten");
assert.ok(!/Gemini|Ej belagt/i.test(allText), "ingen faktakollstext på sidan");
for (const fas of HANDEL.map((h) => h.fas)) assert.ok(BUDGET[fas], fas);
assert.ok(PHASES.every((f) => f.gor.length), "varje fas har något att göra");
console.log("ok");
