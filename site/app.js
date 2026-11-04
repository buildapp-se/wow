import { PERKS, TREES, CLASSES, GOALS, CHALLENGES, REWARDS, buildFor, stegFor } from "./data.js?v=dev";
import { PHASES, PLAN, PLATSER, RUTTER, BOE, golv, GANTT, MILSTOLPAR, RECEPT, START, SLUT, dag, datum, pris, wh } from "./plan.js?v=dev";
import { initSortable, sortable } from "./sortable.js?v=dev";
import { TALANGER, GEAR } from "./mage.js?v=dev";

const $ = (s) => document.querySelector(s);

// ponytail: bockarna ligger bara i webbläsaren, delad lista kräver backend och ingen har bett om det.
const KEY = "wow-forever-bockar";
let saved = {};
try { saved = JSON.parse(localStorage.getItem(KEY)) ?? {}; } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {} };
const box = (id, label) => `<label class="bock"><input type="checkbox" data-id="${id}"><span>${label}</span></label>`;

const chips = (el, name, options, value) => {
  el.innerHTML = options.map(([v, label]) => `<label class="chip"><input type="radio" name="${name}" value="${v}" ${v === value ? "checked" : ""}><span>${label}</span></label>`).join("");
};

// Priser som mynt: "4 g 50 s" blir siffror med guld-, silver- och kopparmynt.
const MYNT = { g: "guld", s: "silver", k: "koppar" };
function mynt(rot) {
  const gang = document.createTreeWalker(rot, NodeFilter.SHOW_TEXT);
  const noder = [];
  while (gang.nextNode()) if (/\d (g|s|k)(?![a-zåäö])/.test(gang.currentNode.data) && !gang.currentNode.parentElement.closest("code")) noder.push(gang.currentNode);
  for (const n of noder) {
    const t = document.createElement("template");
    t.innerHTML = n.data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/(\d+(?: \d{3})*) (g|s|k)(?![a-zåäö])/g, (_, tal, m) => `<span class="belopp">${tal}<i class="mynt ${m}" role="img" aria-label="${MYNT[m]}"></i></span>`);
    n.replaceWith(t.content);
  }
}

// Roadmap
$("#tidslinje").innerHTML = PHASES.map((f, i) => `<li>
  <div class="tid"><b>${f.nar}</b>${f.tim ? `<small>${f.tim}</small>` : ""}</div>
  <div class="steg-kort">
    <h3>${f.titel}</h3>
    <div class="kolumner">
      <div><h4>Gör</h4>${f.gor.map((t, n) => box(`p${i}-${n}`, t)).join("")}</div>
      ${f.kop ? `<div><h4>Köp</h4><ul>${f.kop.map((t) => `<li>${t}</li>`).join("")}</ul></div>` : ""}
      ${f.salj ? `<div><h4>Sälj</h4><ul>${f.salj.map((t) => `<li>${t}</li>`).join("")}</ul></div>` : ""}
      ${f.inte ? `<div class="inte"><h4>Gör inte</h4><ul>${f.inte.map((t) => `<li>${t}</li>`).join("")}</ul></div>` : ""}
    </div>
  </div></li>`).join("");

// Gantt-schemat: datum blir procent av tidsaxeln
const pct = (d) => (dag(d) / dag(SLUT)) * 100;
const linjer = MILSTOLPAR.map(([d]) => `<i class="g-linje" style="left:${pct(d)}%"></i>`).join("");
const stapel = (typ, text, [a, b]) => `<span class="stapel ${typ}" style="left:${pct(a)}%;width:${pct(b) - pct(a)}%">${text}</span>`;
const veckor = Array.from({ length: 7 }, (_, i) => new Date(Date.parse(START) + i * 7 * 864e5).toISOString().slice(0, 10));
$("#gantt").innerHTML = `<li class="g-rad g-axel" aria-hidden="true"><div></div><div class="g-spar">
    ${veckor.map((d) => `<span class="g-tick" style="left:${pct(d)}%">${datum(d)}</span>`).join("")}
    ${MILSTOLPAR.map(([d, t]) => `<b class="g-mil" style="left:${pct(d)}%">${t}</b>`).join("")}</div></li>`
  + GANTT.map((r) => `<li class="g-rad"><div><strong>${r.varor.join(", ")}</strong>
    <small>Köp ${datum(r.kop[0])} till ${datum(r.kop[1])}. Sälj ${r.salj[1] === SLUT ? `från ${datum(r.salj[0])}` : `${datum(r.salj[0])} till ${datum(r.salj[1])}`}.</small></div>
    <div class="g-spar" aria-hidden="true">${linjer}${stapel("kop", "Köp", r.kop)}${stapel("salj", "Sälj", r.salj)}</div></li>`).join("");

// Tillverkning
$("#recept tbody").innerHTML = RECEPT.map((r) => `<tr>
  <td><a href="${wh("item", r.id)}" rel="noopener"><strong>${r.vad}</strong></a></td><td>${r.krav}</td><td>${r.mat}</td>
  <td data-sort-value="${r.kostnad}">${pris(r.kostnad)}</td><td data-sort-value="${r.salj}">${pris(r.salj)}</td>
  <td data-sort-value="${r.vendor}">${pris(r.vendor)}</td><td data-sort-value="${r.salj - r.kostnad}">${pris(r.salj - r.kostnad)}</td><td>${r.kopare}</td></tr>`).join("");

// Karta: Wowheads zonbild med egna nålar. Koordinater är procent av bilden.
const zonbild = (zon) => `https://wow.zamimg.com/images/wow/classicplus/maps/enus/zoom/${zon}.jpg`;
const platsUrl = (p) => p.url ?? wh("npc", p.npc);
const knapp = (typ, id, text) => `<button type="button" class="plats" data-${typ}="${id}">${text}</button>`;
const karta = (zon, zonNamn, { linje = [], stang = false, noder = [], nalar = [] }) => {
  const pts = linje.map(([x, y]) => `${x * 1.5},${y}`).join(" ");
  return `<figure class="karta"><div class="kbild">
    <img src="${zonbild(zon)}" width="772" height="515" alt="Karta över ${zonNamn}" loading="lazy">
    <svg viewBox="0 0 150 100" aria-hidden="true">
      <defs><marker id="pil${zon}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 1 L9 5 L0 9 z" class="pil"/></marker></defs>
      ${linje.length > 1 ? `<${stang ? "polygon" : "polyline"} points="${pts}" class="rutt-linje" marker-mid="url(#pil${zon})"/>` : ""}
      ${noder.map(([x, y]) => `<circle cx="${x * 1.5}" cy="${y}" r=".9" class="nod"/>`).join("")}
    </svg>
    ${nalar.map((n) => `<a class="pin" href="${n.url}" rel="noopener" style="left:${n.x}%;top:${n.y}%" aria-label="${n.text}">${n.nr}</a>`).join("")}
  </div><figcaption>${zonNamn}</figcaption></figure>`;
};
const ruttHtml = (r) => {
  if (r.noder) {
    const noder = r.noder.split(",").map((p) => p.split(" ").map(Number));
    return `<p>${r.not} Följ linjen runt. Punkterna är spawnplatser, och bara en del har malm samtidigt. Linjen går rakt mellan punkterna, så gå runt berg och vatten.</p>${karta(r.zon, r.zonNamn, { linje: noder, stang: true, noder, nalar: [{ x: noder[0][0], y: noder[0][1], nr: "S", text: "Start", url: zonbild(r.zon) }] })}`;
  }
  let nr = 0;
  return `<p>${r.not}</p>` + r.ben.map((b) => {
    const steg = b.stopp.map(([id, gor]) => ({ p: PLATSER[id], gor, nr: ++nr }));
    return karta(b.zon, b.zonNamn, { linje: steg.map((s) => [s.p.x, s.p.y]), nalar: steg.map((s) => ({ x: s.p.x, y: s.p.y, nr: s.nr, text: `${s.nr}: ${s.p.namn}`, url: platsUrl(s.p) })) })
      + `<ol class="steg" start="${steg[0].nr}">${steg.map((s) => `<li><a href="${platsUrl(s.p)}" rel="noopener"><strong>${s.p.namn}</strong></a> (${String(s.p.x).replace(".", ",")}, ${String(s.p.y).replace(".", ",")}): ${s.gor}</li>`).join("")}</ol>`;
  }).join("");
};
const platsHtml = (id) => {
  const p = PLATSER[id];
  return `<h4>${p.namn}</h4><p>${p.zonNamn} ${String(p.x).replace(".", ",")}, ${String(p.y).replace(".", ",")}. Skriv <code>/way ${p.x} ${p.y}</code> med TomTom. <a href="${platsUrl(p)}" rel="noopener">Öppna på Wowhead</a></p>${karta(p.zon, p.zonNamn, { nalar: [{ x: p.x, y: p.y, nr: 1, text: p.namn, url: platsUrl(p) }] })}`;
};
const dialog = $("#kartruta");
const visaIDialog = (html) => { $("#kartinnehall").innerHTML = html; mynt($("#kartinnehall")); dialog.showModal(); };
$("#kartstang").addEventListener("click", () => dialog.close());
document.addEventListener("click", (e) => {
  const b = e.target.closest?.("[data-plats], [data-rutt]");
  if (!b) return;
  e.preventDefault();
  visaIDialog(b.dataset.plats ? platsHtml(b.dataset.plats) : ruttHtml(RUTTER.find((r) => r.id === b.dataset.rutt)));
});

// Huvudtabellen: en samlingscell per nivå
const typKlass = { "Köp": "kop", "Samla": "samla", "Spara": "spara", "Sälj": "salj" };
const lankar = (t) => t.replace(/\[(plats|rutt):(\w+)\]/g, (_, typ, id) => knapp(typ, id, typ === "plats" ? PLATSER[id].namn : RUTTER.find((r) => r.id === id).namn));
const varCell = (r) => r.plats ? knapp("plats", r.plats, PLATSER[r.plats].namn) : r.rutt ? knapp("rutt", r.rutt, `Rutt: ${RUTTER.find((x) => x.id === r.rutt).zonNamn}`) : r.var ?? "";
$("#plan tbody").innerHTML = PLAN.map((f, n) => {
  const kapital = f.rader.filter((r) => r.typ === "Spara" && r.kop).reduce((a, r) => a + r.antal * r.kop, 0);
  const cell = `<th class="plan-fas" scope="rowgroup" rowspan="${f.rader.length + 1}"><div><b>${f.fas}</b><small>${f.tid}</small>
    ${f.budget ? `<small>${f.budget}</small>` : ""}${kapital ? `<small>Spara för högst ${pris(kapital)}</small>` : ""}</div></th>`;
  return `<tr class="plan-start">${cell}<td colspan="9" class="plan-gor">${f.gor.map((t, i) => box(`plang${n}-${i}`, lankar(t))).join("")}</td></tr>`
    + f.rader.map((r, i) => `<tr>
    <td class="kryss"><label class="bock"><input type="checkbox" data-id="plan${n}-${i}" aria-label="Klart: ${r.vad}"></label></td>
    <td><span class="typ ${typKlass[r.typ]}">${r.typ}</span></td>
    <td>${r.id ? `<a href="${wh("item", r.id)}" rel="noopener"><strong>${r.vad}</strong></a>` : r.vad}</td>
    <td>${r.antal ?? ""}</td><td>${r.kop ? pris(r.kop) : r.kopText ?? ""}</td>
    <td>${r.salj ? pris(r.salj) : r.saljText ?? ""}</td><td>${r.kop && r.salj ? pris(r.salj - r.kop) : ""}</td>
    <td>${varCell(r)}</td><td>${r.nar ?? ""}</td></tr>`).join("");
}).join("");

// Rutterna
chips($("#val-rutt"), "rutt", RUTTER.map((r) => [r.id, r.namn]), "dagens");
const renderRutt = () => { $("#rutt").innerHTML = ruttHtml(RUTTER.find((r) => r.id === $("[name=rutt]:checked").value)); };
renderRutt();

// Dyra BoE
$("#boe tbody").innerHTML = BOE.map((b) => `<tr><td><a href="${wh("item", b.id)}" rel="noopener"><strong>${b.vad}</strong></a></td><td>${b.typ}</td><td>${b.krav}</td>
  <td data-sort-value="${golv(b)}">${pris(golv(b))}</td><td data-sort-value="${b.beta ?? ""}">${b.beta ? pris(b.beta) : ""}</td><td>${b.var}</td></tr>`).join("");

// Perktabellen
$("#perkar tbody").innerHTML = Object.entries(PERKS).map(([name, p]) => `<tr>
  <td>${TREES[p.tree]}</td><td><strong>${name}</strong></td><td data-sort-value="${p.ranks}">${p.ranks}</td>
  <td>${p.effect}</td><td data-sort-value="${p.gate ?? ""}">${[p.gate ? `${p.gate} i trädet` : "", p.needs ? `${p.needs} full` : ""].filter(Boolean).join(", ") || "Inget"}</td></tr>`).join("");

// Byggväljaren
chips($("#val-klass"), "klass", CLASSES.map((c) => [c.name, c.name]), "Mage");
chips($("#val-mal"), "mal", Object.entries(GOALS).map(([k, g]) => [k, g.label]), "crafta");

function renderBuild() {
  const cls = CLASSES.find((c) => c.name === $("[name=klass]:checked").value);
  const goal = $("[name=mal]:checked").value;
  const build = buildFor(goal, cls);
  const g = GOALS[goal];
  $("#bygge").innerHTML = `<h4>${cls.name}, ${g.label.toLowerCase()}</h4>
  <ol class="pips">${stegFor(build).map((s) => `<li><span><b>Poäng ${s.fran === s.till ? s.fran : `${s.fran} till ${s.till}`}:</b> ${s.perk}</span><span class="pip" role="img" aria-label="${s.rang} av ${s.max}">${"<i class=on></i>".repeat(s.rang)}${"<i></i>".repeat(s.max - s.rang)}</span><small>${TREES[PERKS[s.perk].tree]}. ${PERKS[s.perk].effect}</small></li>`).join("")}</ol>
  <p>${g.note}</p><p><strong>${cls.name}:</strong> ${cls.note}</p>`;
}
renderBuild();

// Legacy-listan
const legacyBox = (id, label) => `<label class="bock"><input type="checkbox" data-id="${id}" data-legacy><span>${label}</span></label>`;
$("#utmaningar").innerHTML = CHALLENGES.map((c) => `<fieldset><legend>${c.group} <small>${c.points} poäng</small></legend>${c.grid
  ? `<div class="matris" style="--cols:${c.grid.cols.length}">${c.grid.rows.map((r) => `<span class="rad">${r}</span>${c.grid.cols.map((col) => legacyBox(`${r} ${col}`, col)).join("")}`).join("")}</div>`
  : c.items.map((i) => legacyBox(i, i)).join("")}</fieldset>`).join("");

function count() {
  const n = document.querySelectorAll("[data-legacy]:checked").length;
  const next = REWARDS.find((r) => r.at > n);
  $("#poang").textContent = `${n} av 65 poäng. ${Math.min(n, 16)} av 16 går att spendera per karaktär.`;
  $("#nasta").textContent = next ? `Nästa belöning: ${next.name} vid ${next.at} poäng.` : "Alla belöningar upplåsta.";
}

document.querySelectorAll("input[data-id]").forEach((i) => { i.checked = !!saved[i.dataset.id]; });
count();

document.addEventListener("change", (e) => {
  if (e.target.name === "klass" || e.target.name === "mal") return renderBuild();
  if (e.target.name === "rutt") { renderRutt(); mynt($("#rutt")); return; }
  if (e.target.type !== "checkbox" || !e.target.dataset.id) return;
  saved[e.target.dataset.id] = e.target.checked;
  save();
  count();
});

// En sida i taget. Länkar på formen #handel går att dela.
function visa() {
  const id = location.hash.slice(1);
  const vy = document.getElementById(id)?.classList.contains("vy") ? id : "roadmap";
  document.querySelectorAll(".vy").forEach((s) => { s.hidden = s.id !== vy; });
  document.querySelectorAll("nav a").forEach((a) => {
    if (a.hash === `#${vy}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  // På mobil scrollar menyn i sidled: håll den aktiva länken synlig, annars syns inte var man är.
  const nav = $("nav"), aktiv = nav.querySelector("[aria-current]");
  if (aktiv && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = aktiv.offsetLeft - (nav.clientWidth - aktiv.offsetWidth) / 2;
  scrollTo(0, 0);
}
addEventListener("hashchange", visa);
visa();

for (const id of ["handel", "roadmap", "mal", "missa"]) mynt(document.getElementById(id));
initSortable();
const rang = {};
$("#talanger").innerHTML = TALANGER.map((t) => `<li value="${10 + Object.values(rang).reduce((a, b) => a + b, 0)}">${t} ${(rang[t] = (rang[t] ?? 0) + 1)}</li>`).join("");
$("#gear tbody").innerHTML = GEAR.map(([niva, plats, id, namn, krav, int, kalla]) => `<tr><td>${niva}</td><td>${plats}</td><td><a href="${wh("item", id)}" rel="noopener"><strong>${namn}</strong></a></td><td>${krav}</td><td>${int}</td><td>${kalla}</td></tr>`).join("");
document.querySelectorAll("table[data-sort-key]").forEach(sortable);
