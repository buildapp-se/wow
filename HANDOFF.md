---
schemaVersion: 1
status: active
currentGoal: Samlingssidan är live på buildapp.se/wow inför släppet 5 november 2026
nextAction: Stäm av betauppgifterna mot spelet efter släppet, se BACKLOG.md
blockers: []
reviewedAt: 2026-11-02
---

# Handoff

## 2026-11-02: första versionen

Byggd från fem researchspår och Blizzards egna artiklar. Geminis råd är rad för rad bedömda på sajten. Conquest Cappeds samlarbygge klarar inte grindarna enligt perktabellen och ersattes av ett justerat bygge, märkt Bedömning.

Lokalt: `cd site` och valfri statisk server. Test: `node site/test.mjs`.

Publicerad efter Patriks ja. Repot är `buildapp-se/wow`, gren `main`, Pages via Actions. Orgen kräver kontot Elwyndaz: `GH_TOKEN="$(gh auth token --user Elwyndaz)"` före `gh`-kommandon, eftersom `fackligastudier-ui` är aktivt konto och saknar rättigheter. Ingen rad i buildapp.se:s sitemap eller startsida, med flit.
