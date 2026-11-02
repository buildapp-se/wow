import { PERKS, TREES, CLASSES, GOALS, CHALLENGES, REWARDS, buildFor } from "./data.js?v=dev";
import { PHASES, HANDEL, BUDGET, GANTT, MILSTOLPAR, START, SLUT, dag, datum, pris, wh } from "./plan.js?v=dev";
import { initSortable, sortable } from "./sortable.js?v=dev";

const $ = (s) => document.querySelector(s);

// ponytail: bockarna ligger bara i webbläsaren, delad lista kräver backend och ingen har bett om det.
const KEY = "wow-forever-bockar";
let saved = {};
try { saved = JSON.parse(localStorage.getItem(KEY)) ?? {}; } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {} };
const box = (id, label) => `<label class="bock"><input type="checkbox" data-id="${id}"><span>${label}</span></label>`;

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

// Handelslistan, grupperad per fas
const faser = [...new Set(HANDEL.map((h) => h.fas))];
$("#handelslista").innerHTML = faser.map((fas, n) => {
  const rader = HANDEL.filter((h) => h.fas === fas);
  const kapital = rader.reduce((a, h) => a + h.antal * h.kop, 0);
  return `<h3>${fas}</h3><p>${BUDGET[fas]}. Hela listan kostar högst ${pris(kapital)}.</p>
  <div class="tabell" tabindex="0" role="region" aria-label="${fas}"><table data-sort-key="handel${n}">
  <thead><tr><th>Klart</th><th>Vad</th><th data-sort-first="desc">Antal</th><th>Max per st</th><th>Sälj för</th><th>När</th><th>Varför</th></tr></thead>
  <tbody>${rader.map((h, i) => `<tr>
    <td class="kryss"><label class="bock"><input type="checkbox" data-id="h${n}-${i}" aria-label="Köpt: ${h.vad}"></label></td>
    <td>${h.id ? `<a href="${wh("item", h.id)}" rel="noopener"><strong>${h.vad}</strong></a>` : `<strong>${h.vad}</strong>`}</td>
    <td data-sort-value="${h.antal}">${h.antal}</td>
    <td data-sort-value="${h.kop}">${pris(h.kop)}</td>
    <td data-sort-value="${h.salj ?? ""}">${h.salj ? pris(h.salj) : "Eget bruk"}</td>
    <td>${h.nar}</td><td>${h.grund}</td></tr>`).join("")}</tbody></table></div>`;
}).join("");

// Perktabellen
$("#perkar tbody").innerHTML = Object.entries(PERKS).map(([name, p]) => `<tr>
  <td>${TREES[p.tree]}</td><td><strong>${name}</strong></td><td data-sort-value="${p.ranks}">${p.ranks}</td>
  <td>${p.effect}</td><td data-sort-value="${p.gate ?? ""}">${[p.gate ? `${p.gate} i trädet` : "", p.needs ? `${p.needs} full` : ""].filter(Boolean).join(", ") || "Inget"}</td></tr>`).join("");

// Byggväljaren
const chips = (el, name, options, value) => {
  el.innerHTML = options.map(([v, label]) => `<label class="chip"><input type="radio" name="${name}" value="${v}" ${v === value ? "checked" : ""}><span>${label}</span></label>`).join("");
};
chips($("#val-klass"), "klass", CLASSES.map((c) => [c.name, c.name]), "Mage");
chips($("#val-mal"), "mal", Object.entries(GOALS).map(([k, g]) => [k, g.label]), "levla");

function renderBuild() {
  const cls = CLASSES.find((c) => c.name === $("[name=klass]:checked").value);
  const goal = $("[name=mal]:checked").value;
  const build = buildFor(goal, cls);
  const g = GOALS[goal];
  $("#bygge").innerHTML = `<h4>${cls.name}, ${g.label.toLowerCase()}</h4>
  <ul class="pips">${Object.entries(build).map(([perk, ranks]) => `<li><span>${perk}</span><span class="pip" aria-label="${ranks} av ${PERKS[perk].ranks}">${"<i class=on></i>".repeat(ranks)}${"<i></i>".repeat(PERKS[perk].ranks - ranks)}</span><small>${TREES[PERKS[perk].tree]}</small></li>`).join("")}</ul>
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
  scrollTo(0, 0);
}
addEventListener("hashchange", visa);
visa();

initSortable();
document.querySelectorAll("table[data-sort-key]").forEach(sortable);
