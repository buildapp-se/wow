// Går något av detta fel ska sidan inte ut: byggena måste gå att köpa i spelet och summorna stämma.
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { PERKS, CLASSES, GOALS, CHALLENGES, buildFor, buildError } from "./data.js";
import { HANDEL, BUDGET, PHASES, RECEPT, GANTT, MILSTOLPAR, START, SLUT, dag, datum, pris } from "./plan.js";

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
// Schemat: allt som säljs ska finnas där, och köp måste börja före försäljning.
const varor = GANTT.flatMap((r) => r.varor);
for (const h of HANDEL.filter((x) => x.salj)) assert.ok(varor.includes(h.vad), `${h.vad} saknas i schemat`);
for (const r of GANTT) {
  assert.ok(dag(r.kop[0]) >= 0 && dag(r.kop[1]) > dag(r.kop[0]), r.varor[0]);
  assert.ok(dag(r.salj[0]) > dag(r.kop[0]) && dag(r.salj[1]) > dag(r.salj[0]) && dag(r.salj[1]) <= dag(SLUT), r.varor[0]);
}
assert.equal(dag("2026-12-09"), 34);
assert.equal(datum(START), "5 nov");
assert.ok(MILSTOLPAR.every(([d]) => dag(d) > 0 && dag(d) < dag(SLUT)));
// Tillverkning: kalkylerna ska stämma mot recepten, och försäljning måste ge vinst.
const kostnad = (vad) => RECEPT.find((r) => r.vad === vad).kostnad;
assert.equal(kostnad("Bronze Framework"), 2029);
assert.equal(kostnad("Bronze Tube"), 1760);
for (const r of RECEPT) assert.ok(r.salj > r.kostnad && r.salj > r.vendor, r.vad);
// 1 Gold Bar plus 3 Iron Bar för högst 18 s ger 3 Gyrochronatom för 22 s 50 k hos vendor.
assert.ok(3 * RECEPT.find((r) => r.vad === "Gyrochronatom").vendor > 1800);
assert.ok(RECEPT.find((r) => r.vad === "Gyrochronatom").salj < 3157, "Under vendorns pris");
assert.equal(pris(45000), "4 g 50 s");
assert.equal(pris(300), "3 s");
assert.equal(pris(830), "8 s 30 k");

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const allText = html + readFileSync(new URL("./plan.js", import.meta.url), "utf8") + readFileSync(new URL("./data.js", import.meta.url), "utf8");
assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
// Filerna cachas i 4 h. Utan version i adressen möter ny HTML gammal app.js och sidan blir tom.
assert.match(html, /app\.js\?v=dev/);
assert.match(html, /stil\.css\?v=dev/);
assert.equal(readFileSync(new URL("./app.js", import.meta.url), "utf8").match(/from "\.\/[a-z]+\.js\?v=dev"/g).length, 3);
assert.ok(!allText.includes("—"), "inget tankstreck i texten");
assert.ok(!/Gemini|Ej belagt/i.test(allText), "ingen faktakollstext på sidan");
for (const fas of HANDEL.map((h) => h.fas)) assert.ok(BUDGET[fas], fas);
assert.ok(PHASES.every((f) => f.gor.length), "varje fas har något att göra");
console.log("ok");
