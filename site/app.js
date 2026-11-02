import { PERKS, TREES, CLASSES, GOALS, CHALLENGES, REWARDS, buildFor } from "./data.js";
import { initSortable, sortable } from "./sortable.js";

const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ponytail: bockarna ligger bara i webbläsaren, delad lista kräver backend och ingen har bett om det.
const KEY = "wow-forever-bockar";
let saved = {};
try { saved = JSON.parse(localStorage.getItem(KEY)) ?? {}; } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {} };

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
  $("#bygge").innerHTML = `<h4>${cls.name}, ${g.label.toLowerCase()} <span class="g ${g.grade[0]}">${g.grade[1]}</span></h4>
  <ul class="pips">${Object.entries(build).map(([perk, ranks]) => `<li><span>${perk}</span><span class="pip" aria-label="${ranks} av ${PERKS[perk].ranks}">${"<i class=on></i>".repeat(ranks)}${"<i></i>".repeat(PERKS[perk].ranks - ranks)}</span><small>${TREES[PERKS[perk].tree]}</small></li>`).join("")}</ul>
  <p>${g.note}</p><p><strong>${cls.name}:</strong> ${cls.note}</p>`;
}
document.addEventListener("change", (e) => { if (e.target.name === "klass" || e.target.name === "mal") renderBuild(); });
renderBuild();

// Legacy-listan
const box = (id, label) => `<label class="bock"><input type="checkbox" data-id="${esc(id)}" data-legacy ${saved[id] ? "checked" : ""}><span>${label}</span></label>`;
$("#utmaningar").innerHTML = CHALLENGES.map((c) => `<fieldset><legend>${c.group} <small>${c.points} poäng</small></legend>${c.grid
  ? `<div class="matris" style="--cols:${c.grid.cols.length}">${c.grid.rows.map((r) => `<span class="rad">${r}</span>${c.grid.cols.map((col) => box(`${r} ${col}`, col)).join("")}`).join("")}</div>`
  : c.items.map((i) => box(i, i)).join("")}</fieldset>`).join("");

function count() {
  const n = document.querySelectorAll("[data-legacy]:checked").length;
  const next = REWARDS.find((r) => r.at > n);
  $("#poang").textContent = `${n} av 65 poäng. ${Math.min(n, 16)} av 16 går att spendera per karaktär.`;
  $("#nasta").textContent = next ? `Nästa belöning: ${next.name} vid ${next.at} poäng.` : "Alla belöningar upplåsta.";
}
count();

document.addEventListener("change", (e) => {
  if (e.target.type !== "checkbox" || !e.target.dataset.id) return;
  saved[e.target.dataset.id] = e.target.checked;
  save();
  count();
});
document.querySelectorAll("input[data-id]:not([data-legacy])").forEach((i) => { i.checked = !!saved[i.dataset.id]; });

initSortable();
document.querySelectorAll("table[data-sort-key]").forEach(sortable);
