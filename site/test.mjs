// Går något av detta fel ska sidan inte ut: byggena måste gå att köpa i spelet och summorna stämma.
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { PERKS, CLASSES, GOALS, CHALLENGES, buildFor, buildError, stegFor } from "./data.js";
import { TALANGER, GEAR } from "./mage.js";
import { HANDEL, PLAN, PLATSER, RUTTER, BOE, golv, PHASES, RECEPT, GANTT, MILSTOLPAR, START, SLUT, dag, datum, pris } from "./plan.js";

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
assert.match(buildError({ "Bartering": 2, "Working Overtime": 5, "Well Rested": 5, "Thrill of Adventure": 4 }), /Bartering kräver 5/, "ordningen måste räknas");
assert.deepEqual(stegFor(GOALS.crafta.build).slice(0, 2).map((s) => [s.perk, s.fran, s.till]), [["Thrill of Adventure", 1, 5], ["Working Overtime", 6, 10]]);

// Handeln: säljpriset ska ge vinst och aldrig ligga över Graphed-taket.
for (const h of HANDEL) {
  assert.ok(h.antal > 0 && h.kop > 0 && h.salj > h.kop * 1.3, h.vad);
  if (h.tak) assert.ok(h.salj <= h.tak * 0.95 && h.kop <= h.tak * 0.5, `${h.vad}: bryter takregeln`);
}
for (const f of PLAN) {
  assert.ok(f.fas && f.tid && f.rader.length, f.fas);
  for (const r of f.rader) {
    assert.ok(["Köp", "Samla", "Spara", "Sälj"].includes(r.typ), r.vad);
    assert.ok(!r.plats || PLATSER[r.plats], `${r.vad}: plats ${r.plats}`);
    assert.ok(!r.rutt || RUTTER.some((x) => x.id === r.rutt), `${r.vad}: rutt ${r.rutt}`);
    assert.ok(r.plats || r.rutt || r.var, `${r.vad}: saknar plats`);
    assert.ok(r.salj || r.saljText, `${r.vad}: saknar säljpris`);
  }
  for (const t of f.gor) for (const [, typ, id] of t.matchAll(/\[(plats|rutt):(\w+)\]/g)) assert.ok(typ === "plats" ? PLATSER[id] : RUTTER.some((x) => x.id === id), id);
}
// Kartan: koordinater inom bilden, och varje stopp finns.
for (const p of Object.values(PLATSER)) assert.ok(p.x > 0 && p.x < 100 && p.y > 0 && p.y < 100 && (p.npc || p.url), p.namn);
for (const r of RUTTER) {
  if (r.noder) for (const n of r.noder.split(",")) assert.match(n, /^\d+ \d+$/, r.id);
  else for (const b of r.ben) for (const [id] of b.stopp) assert.ok(PLATSER[id] && PLATSER[id].zon === b.zon, `${r.id}: ${id}`);
}
for (const b of BOE) assert.ok(b.id && golv(b) > 0 && (!b.beta || golv(b) < b.beta), b.vad);
assert.equal(new Set(BOE.map((b) => b.id)).size, BOE.length, "dubblett i BOE");
// 129.92 * 10000 blir 1299199,99... i flyttal och visades som "99.99999999976717 k".
for (const b of BOE) assert.ok(!b.beta || Number.isInteger(b.beta), `${b.vad}: betapriset måste vara hela koppar`);
assert.equal(pris(BOE.find((b) => b.vad === "Warchief Kilt").beta), "129 g 92 s");
assert.equal(golv(BOE.find((b) => b.vad === "Staff of Jordan")), 1250000);
assert.equal(golv(BOE.find((b) => b.vad === "Cloak of Flames")), 5000000);
assert.equal(golv(BOE.find((b) => b.vad === "Flurry Axe")), 1000000);
assert.equal(pris(1559980000), "155 998 g");
assert.equal(TALANGER.length, 51, "ett poäng per nivå 10 till 60");
assert.equal(new Set(GEAR.map((r) => r[2])).size, GEAR.length, "dubblett i GEAR");
for (const [niva, , id, , krav] of GEAR) { const [fran, till] = niva.split(" till ").map(Number); assert.ok(id && krav >= fran && krav <= till, `${id}: nivå`); }
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
const importer = readFileSync(new URL("./app.js", import.meta.url), "utf8").match(/from "\.\/[a-z]+\.js\?v=dev"/g);
assert.equal(importer.length, 4);
// modulepreload hämtar modulerna parallellt med app.js. Fel adress ger dubbel hämtning i stället.
assert.deepEqual([...html.matchAll(/rel="modulepreload" href="([a-z]+\.js\?v=dev)"/g)].map((m) => m[1]).sort(), importer.map((s) => s.slice(8, -1)).sort());
assert.ok(!allText.includes("—"), "inget tankstreck i texten");
assert.ok(!/Gemini|Ej belagt/i.test(allText), "ingen faktakollstext på sidan");
assert.ok(PHASES.every((f) => f.gor.length), "varje fas har något att göra");
console.log("ok");
