// Går något av detta fel ska sidan inte ut: byggena måste gå att köpa i spelet och summorna stämma.
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { PERKS, CLASSES, GOALS, CHALLENGES, buildFor, buildError, stegFor } from "./data.js";
import { GEAR } from "./mage.js";
import { numberOf, cellValue, compareValues, orderedRows, sortable, initSortable } from "./sortable.js";
import { wh, HANDEL, PLAN, PLATSER, RUTTER, BOE, golv, PHASES, RECEPT, GANTT, MILSTOLPAR, START, SLUT, dag, datum, pris, rikt } from "./plan.js";

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
// Bytet: klasser utan köpta reagenser får inte Reagent Economy, de andra behåller bygget orört.
const klass = (namn) => CLASSES.find((c) => c.name === namn);
assert.deepEqual(buildFor("raid", klass("Mage")), GOALS.raid.build);
assert.deepEqual(buildFor("raid", klass("Hunter")), { "Reinforce": 5, "Gourmand": 3, "The Quick and the Dead": 2, "Permanence": 2, "Diplomat": 4 });
assert.deepEqual(buildFor("pvp", klass("Warrior")), { "Gourmand": 3, "The Quick and the Dead": 2, "For Great Honor": 5, "Diplomat": 5, "Reinforce": 1 });
assert.notEqual(buildFor("raid", klass("Hunter")), GOALS.raid.build, "bytet får inte skriva om GOALS");
assert.equal(GOALS.raid.build["Reagent Economy"], 1);
// Varje grind ska ge sitt eget fel.
assert.equal(buildError({ "Well Rested": 5 }), "summan är 5, inte 16");
assert.equal(buildError({ "Well Rested": 5, "Okänd": 11 }), "okänd perk Okänd");
assert.equal(buildError({ "Well Rested": 6, "Working Overtime": 5, "Reinforce": 5 }), "Well Rested har bara 5 rang");
assert.equal(buildError({ "Thrill of Adventure": 5, "Talented": 5, "Working Overtime": 5, "Gourmand": 1 }), "Talented kräver full Well Rested");
assert.equal(buildError({ "Well Rested": 4, "Thrill of Adventure": 1, "Talented": 5, "Working Overtime": 5, "Gourmand": 1 }), "Talented kräver full Well Rested");
assert.equal(buildError({ "Well Rested": 5, "Talented": 5, "Working Overtime": 5, "Gourmand": 1 }), null);
assert.deepEqual(stegFor(GOALS.crafta.build).slice(0, 2).map((s) => [s.perk, s.fran, s.till]), [["Bountiful Harvest", 1, 5], ["Thrill of Adventure", 6, 10]]);

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
for (const b of BOE) assert.ok(b.id && golv(b) > 0 && (!(b.ah ?? b.beta) || golv(b) < (b.ah ?? b.beta)), b.vad);
for (const b of BOE) assert.ok(!b.ah || Number.isInteger(b.ah), `${b.vad}: AH-priset måste vara hela koppar`);
assert.equal(new Set(BOE.map((b) => b.id)).size, BOE.length, "dubblett i BOE");
// 129.92 * 10000 blir 1299199,99... i flyttal och visades som "99.99999999976717 k".
for (const b of BOE) assert.ok(!b.beta || Number.isInteger(b.beta), `${b.vad}: betapriset måste vara hela koppar`);
assert.equal(pris(BOE.find((b) => b.vad === "Warchief Kilt").beta), "129 g 92 s");
assert.equal(golv(BOE.find((b) => b.vad === "Staff of Jordan")), 500000); // AH 100 g går före betans 250 g
assert.equal(golv({ beta: 1771200 }), 885600); // ingen på AH: halva betapriset (20 nov har alla med betapris ett AH-pris)
assert.equal(golv(BOE.find((b) => b.vad === "Cloak of Flames")), 5000000);
assert.equal(golv(BOE.find((b) => b.vad === "Flurry Axe")), 889500); // AH går före grans
assert.equal(pris(1559980000), "155 998 g");
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
assert.equal(kostnad("Bronze Framework"), 586);
assert.equal(kostnad("Bronze Tube"), 488);
// Riktpris är AH-medianen avrundad, maxpris hälften nedåt: under 1 g till 10 k, annars till hela silver.
assert.deepEqual(rikt("Pristine Leather"), { salj: 370, kop: 180 });
assert.deepEqual(rikt("Death Lotus"), { salj: 72900, kop: 36400 }); // maxpriset avrundas nedåt
for (const r of RECEPT) assert.ok(r.salj > r.kostnad && r.salj > r.vendor, r.vad);
// 1 Gold Bar plus 3 Iron Bar för högst 18 s ger 3 Gyrochronatom för 22 s 50 k hos vendor.
assert.ok(3 * RECEPT.find((r) => r.vad === "Gyrochronatom").vendor > 1800);
assert.ok(RECEPT.find((r) => r.vad === "Gyrochronatom").salj < 3157, "Under vendorns pris");
assert.equal(pris(45000), "4 g 50 s");
assert.equal(pris(300), "3 s");
assert.equal(pris(830), "8 s 30 k");
assert.equal(pris(1e10), "1 000 000 g", "tusentalsmellanslag i varje grupp");
assert.equal(pris(0), "0");
// Förlust: Vinst-kolumnen i Tillverkning visade -1 g -1 s -5 k för fem koppar back.
assert.equal(pris(-5), "−5 k");
assert.equal(pris(-12345), "−1 g 23 s 45 k");
assert.equal(wh("item", 4371), "https://www.wowhead.com/forever/item=4371");

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const allText = html + readFileSync(new URL("./plan.js", import.meta.url), "utf8") + readFileSync(new URL("./data.js", import.meta.url), "utf8");
assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
// 404-sidan (GitHub Pages visar annars sin engelska) är också olistad och leder tillbaka.
const fyra = readFileSync(new URL("./404.html", import.meta.url), "utf8");
assert.match(fyra, /<meta name="robots" content="noindex, nofollow">/);
assert.match(fyra, /<a href="\/wow\/">/);
// CSP: bara egna skript, inga inline-skript (OWASP 2026-11-24).
assert.match(html, /<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'( https:\/\/[a-z.]+)*;/);
// Filerna cachas i 4 h. Utan version i adressen möter ny HTML gammal app.js och sidan blir tom.
assert.match(html, /app\.js\?v=dev/);
assert.match(html, /stil\.css\?v=dev/);
const importer = readFileSync(new URL("./app.js", import.meta.url), "utf8").match(/from "\.\/[a-z]+\.js\?v=dev"/g);
assert.equal(importer.length, 4);
// modulepreload hämtar modulerna parallellt med app.js. Fel adress ger dubbel hämtning i stället.
assert.deepEqual([...html.matchAll(/rel="modulepreload" href="([a-z]+\.js\?v=dev)"/g)].map((m) => m[1]).sort(), importer.map((s) => s.slice(8, -1)).sort());
// Typsnitten är självhostade (2026-11-25): varje @font-face (och preload) måste peka på en fil som finns. Preload av typsnitten gjorde FCP 200 ms sämre i 390 px på Slow 4G, så de laddas via stil.css.
const css = readFileSync(new URL("./stil.css", import.meta.url), "utf8");
const typsnitt = [...css.matchAll(/url\((fonts\/[a-z0-9-]+\.woff2)\)/g)].map((m) => m[1]);
assert.equal(typsnitt.length, 6);
for (const f of [...typsnitt, ...[...html.matchAll(/rel="preload" href="([^"]+)"/g)].map((m) => m[1])]) readFileSync(new URL(`./${f}`, import.meta.url));
assert.ok(!html.includes("googleapis"), "ingen Google Fonts-CSS");
assert.ok(!allText.includes("—"), "inget tankstreck i texten");
// Svensk text: tusentalsmellanslag ("1 548 armor", inte "1548 armor").
assert.deepEqual(html.replace(/<[^>]*>/g, " ").match(/(?<![\d.,\/=#?:-])\d{4,}(?= [a-zåäö])/gi), null, "tal utan tusentalsmellanslag");
// Pengar skrivs i mynt ("7 g 23 s"), inte som decimaler av guld ("7,24 g").
assert.deepEqual(allText.match(/\d,\d+ [gsk]\b/g), null, "pengar som decimaltal");
assert.ok(!/Gemini|Ej belagt/i.test(allText), "ingen faktakollstext på sidan");
assert.ok(PHASES.every((f) => f.gor.length), "varje fas har något att göra");
// En cell som börjar med ett pris ("8 k", "13 s 19 k") sorterar som text utan data-sort-value: 8 k hamnade mellan 5 s och 8 s.
for (const [tabell] of html.matchAll(/<table data-sort-key[\s\S]*?<\/table>/g)) {
  for (const [, cellHtml] of tabell.matchAll(/<td>(\d+ (?:g|s|k)\b[^<]*)<\/td>/g)) assert.fail(`pris utan data-sort-value: ${cellHtml}`);
}

// Tabellsorteringen (sortable.js, kopia av elwyn-dash): attrapper i stället för DOM.
const cell = (text, sortValue, select) => ({ textContent: text, dataset: sortValue === undefined ? {} : { sortValue }, querySelector: (q) => (select === undefined || q !== "select" ? null : { value: select }) });
const row = (name, value, divider = false) => ({ name, cells: [cell(name), cell(value)], hasAttribute: (a) => divider && a === "data-sort-divider" });
const names = (rows) => rows.map((r) => r.name);
for (const [t, n] of [["1 240", 1240], ["12 500 000", 12500000], ["27,5", 27.5], ["27,55", 27.55], ["12 %", 12], ["12%", 12], ["-3", -3], ["0", 0]]) assert.equal(numberOf(t), n, t);
for (const t of ["33 öppna", "2026-10-30", "1.5", "1 24", "abc", "", "12 500 kr", "x12", "12x", "- 3"]) assert.equal(numberOf(t), null, t);
assert.ok(compareValues("1 240", "27") > 0 && compareValues("4,5", "27") < 0, "tal jämförs som tal");
assert.ok(compareValues("4 öppna", "33 öppna") < 0 && compareValues("ö", "z") > 0 && compareValues("a", "A") === 0);
for (const d of [1, -1]) assert.ok(compareValues("", "a", d) > 0 && compareValues("a", "", d) < 0 && compareValues("", "", d) === 0, "tomt sist åt båda hållen");
assert.ok(compareValues("5", "abc") < 0 && compareValues("abc", "5") > 0, "tal mot text jämförs som text");
// ponytail: * direction och / direction är samma sak när direction är 1 eller -1, den mutanten kan inte dö.
assert.ok(compareValues("a", "b", -1) > 0 && compareValues("1", "2", -1) > 0 && compareValues("2", "1") > 0);
assert.equal(cellValue(cell("synligt", "3", "1")), "3");
assert.equal(cellValue(cell("1 2 3", undefined, "2")), "2");
assert.equal(cellValue(cell("  text  ")), "text");
assert.equal(cellValue(cell("aldrig", "")), "");
assert.equal(cellValue(cell("·")), "");
assert.equal(cellValue(undefined), "");
assert.equal(cellValue({ dataset: {}, querySelector: () => null }), "");
const rader = [row("c", "3"), row("blank", ""), row("a", "1"), row("div", "", true), row("z", "9"), row("y", "8")];
assert.deepEqual(names(orderedRows(rader, 1, 1)), ["a", "c", "blank", "div", "y", "z"]);
assert.deepEqual(names(orderedRows(rader, 1, -1)), ["c", "a", "blank", "div", "z", "y"]);
assert.deepEqual(names(orderedRows([row("first", "1"), row("second", "1"), row("third", "0")], 1, -1)), ["first", "second", "third"], "lika behåller ordningen");
sortable(null); sortable({ tHead: null }); sortable({ tHead: { rows: [] } });
// En hel tabell: rubrikerna blir knappar, klick sorterar, andra klicket vänder, data-sort-first="desc" börjar störst.
const th = (text, attrs = {}) => ({ textContent: text, innerHTML: text, dataset: attrs, aria: null, querySelector: (s) => (s === "button, input" && attrs.input ? {} : null), setAttribute(k, v) { assert.equal(k, "aria-sort"); this.aria = v; } });
const tbody = { rows: [row("b", "2"), row("a", "10"), row("c", "")], append(...r) { this.rows = r; } };
const tabell = { dataset: { sortKey: "prov" }, tHead: { rows: [{ cells: [th("Namn"), th("Pris", { sortFirst: "desc" }), th(" "), th("Val", { input: true })] }] }, tBodies: [tbody] };
for (const h of tabell.tHead.rows[0].cells) h.closest = (s) => (s === "table[data-sort-key]" ? tabell : null);
sortable(tabell);
assert.deepEqual(tabell.tHead.rows[0].cells.map((h) => h.innerHTML), ['<button type="button" class="sort-head">Namn</button>', '<button type="button" class="sort-head">Pris</button>', " ", "Val"], "blank rubrik blir ingen knapp");
assert.deepEqual(tabell.tHead.rows[0].cells.map((h) => h.aria), ["none", "none", "none", "none"]);
assert.deepEqual(names(tbody.rows), ["b", "a", "c"], "osorterad tills någon klickar");
let klick;
initSortable({ addEventListener: (typ, f) => { assert.equal(typ, "click"); klick = f; } });
const tryck = (h, knapp = true) => klick({ target: { closest: (s) => (s === "thead th" ? h : s === "button" ? knapp : null) } });
const [namnTh, prisTh] = tabell.tHead.rows[0].cells;
for (const h of tabell.tHead.rows[0].cells) h.textContent = h.textContent.padEnd(h.textContent.length + 1); // trim() ska matcha rubriken
tryck(prisTh, false);
assert.deepEqual(names(tbody.rows), ["b", "a", "c"], "klick utanför knappen sorterar inte");
klick({ target: { closest: () => null } });
tryck({ textContent: "X", closest: () => null });
tryck(prisTh);
assert.deepEqual(names(tbody.rows), ["a", "b", "c"], "desc först: störst överst, tomt sist");
assert.deepEqual(tabell.tHead.rows[0].cells.map((h) => h.aria), ["none", "descending", "none", "none"]);
tryck(prisTh);
assert.deepEqual(names(tbody.rows), ["b", "a", "c"]);
assert.equal(prisTh.aria, "ascending");
tryck(namnTh);
assert.deepEqual(names(tbody.rows), ["a", "b", "c"]);
assert.deepEqual(tabell.tHead.rows[0].cells.map((h) => h.aria), ["ascending", "none", "none", "none"]);
tbody.rows = [row("y", "1"), row("x", "2")];
sortable(tabell);
assert.deepEqual(names(tbody.rows), ["x", "y"], "omritning behåller sorteringen");
console.log("ok");
