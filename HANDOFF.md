---
schemaVersion: 1
status: active
currentGoal: Handlingsplanen är live på buildapp.se/wow inför släppet 5 november 2026
nextAction: Efter släppet: byt riktpriserna i site/plan.js mot riktiga AH-priser, se BACKLOG.md
blockers: []
reviewedAt: 2026-11-05
---

# Handoff

## 2026-11-04: backlogrunda (draft-PR #3, staplad på #1)

Gren `claude/backlog-2026-11-04` från `claude/forbattringar-2026-11-04`; #1 mergas först. Dyra föremål: 14 världsepics och 10 recept tillagda (126 rader). Wowheads sidor gick inte att läsa, så kandidaterna kom från AtlasLoot Classics världsepics och classicdb.ch:s blå och lila recept; varje rad kontrollerad mot `nether.wowhead.com/forever/tooltip/item/<id>` (finns i Forever, binder inte vid upplockning). Var-texten säger "i Classic". 27 av AtlasLoots 41 saknade världsepics finns inte i Forever-datan (404) och är inte med. Roadmapens första fas heter "Före första inloggningen", namnreservationen är borta. Länkkontroll: warcraft.wiki.gg via wikins API och GitHub-repot finns; CurseForge, Icy Veins och Conquest Capped fortfarande okontrollerade. `node site/test.mjs` ok, axe 0 fel på Roadmap och Köp och sälj i 390 och 1280 px, ingen horisontell scroll.

## 2026-11-04: förbättringsrunda före släppet

Gren `claude/forbattringar-2026-11-04`, draft-PR #1. Bara rättningar: rangpipsen i Legacy fick `role="img"` (axe-fel), mobilmenyn scrollar fram den aktiva vyn, modulerna laddas med `modulepreload` (testet kräver samma adresser som importerna), kartrutan stängs av tryck utanför och Warchief Kilts betapris visade flyttalsrester. axe-core på alla vyer i 390 och 1280 px: 0 fel efter.

Länkkontroll: alla 240 Wowhead-länkar finns i Forever-datan och namnen stämmer (`nether.wowhead.com/forever/tooltip/<typ>/<id>` svarar utan 403, till skillnad från sidorna). Blizzard, zonbilderna, WoWCensus och wow-professions svarar 200. CurseForge, Icy Veins, Conquest Capped, warcraft.wiki.gg och GitHub svarar 403 mot skript och är inte kontrollerade. Släpptiden 00:00 CET och raids 9 december stämmer mot Blizzards artiklar.

## 2026-11-04: mutationstest

Stryker (command runner, `node site/test.mjs`) på logiken i `site/data.js` (`buildFor`, `buildError`, `stegFor`) och `site/plan.js` (`wh`, `pris`, `dag`, `datum`, `golv`): 82,47 % före, 100 % efter. Överlevande: bytet av Reagent Economy i `buildFor` var helt otestat, `buildError` saknade test för summa, okänd perk, rang och `needs`, och tusentalsavgränsaren i `pris` testades bara med sex siffror. Bara tester, ingen bugg. Kör om med `npm i --no-save @stryker-mutator/core && npx stryker run`, rapporten hamnar i `reports/` (ignorerad). Gren `claude/mutation-2026-11-04`, draft-PR #2.

## 2026-11-02: första versionen

Byggd från fem researchspår och Blizzards egna artiklar. Conquest Cappeds samlarbygge klarar inte grindarna enligt perktabellen och ersattes av ett justerat bygge.

Omgjord samma dag efter Patriks besked: Gemini-listan, faktakollen och säkerhetsmärkningarna är borta. Sajten är nu en handlingsplan med tidslinje, Missa inte, handelslista med antal och priser, och mål. Wowhead Forever går att läsa via Playwright men ger ofta 403 mot WebFetch.

Datumen i Gantt-schemat utgår från 6 h spel om dagen. Mount runt 13 nov är en egen uppskattning, inte en uppmätt nivåtid. Altplanen: main plus två alts ger 16 Legacy-poäng, fem karaktärer täcker alla sex crafts. Inkomstlistan på Köp och sälj är rangordnad av mig utifrån betapriser, ej provad i spelet. Recept, vendorpriser, lager och koordinater är lästa ur Wowheads Forever-data 2026-11-02. Vendorlagret kan skilja sig i spelet och påfyllningstiden är okänd. Bronze Framework kostar runt 20 s med köpta material (2 x 8 s 30 k + 2 s 69 k + 1 s). Ett tidigare påstående om 14 s var fel.

Legacy visar nu byggen i köpordning, och `buildError` prövar exakt den ordningen. Tidigare räckte det att någon ordning fungerade, vilket dolde att "Bartering först" och Battlegrounds-bygget var omöjliga. Mainens bygge är Thrill 5, Working Overtime 5, Field Guide 3, Field Medicine 2, Frequent Flier 1: min bedömning, ej provad i spelet.

Listan över dyra föremål (`BOE` i `site/plan.js`) har 40 rader, alla kontrollerade mot Wowheads Forever-tooltips 2026-11-02. Priserna är begärda priser från WoWCensus, inga försäljningar, och de flesta rader saknar betapris. Dropplatserna är Wowheads data, med Classic-spår som raidmobs och världsbossar som kan skilja sig i Forever. Gränsen är min egen regel och ej provad i spelet. WoWCensus renderar med JS, så läs den via Playwright.

Mistral Large (`mistral-large-4-0`, 597 000 tokens, 17 min) granskade `ff4c64d` 2026-11-02. Rättat: Spelunker, Runecloth, Bartering-taket, Book Return, 145. Spekulation om Hyjal-kedja och Tailoring-konvertering avvisad. Vibes `read_file` stoppas inte utanför mappen och webb saknas. Wowheads listvy läses med `browser_run_code_unsafe` och `g_listviews`; `fetch` och iframe gav inga rader.

Talangerna är Icy Veins-bygget lästa med slidern. `GEAR` är mitt urval, inte en BiS-lista: Wowheads BiS-tabell är tom. Altordningen är min, hastigheten från Conquest Capped.

Wowhead svarar 403 (CloudFront) efter runt 100 sidor i följd, och tomma `g_listviews` ser då ut som att föremålet saknar källa. Vänta och kör långsamt, och räkna raderna mot kandidaterna.

Kontroll av Playwright: gå till `about:blank` före ny laddning, annars räknas byte av `#` som samma dokument och den nya koden körs inte.

Lokalt: `cd site` och valfri statisk server. Test: `node site/test.mjs`.

Publicerad efter Patriks ja. Repot är `buildapp-se/wow`, gren `main`, Pages via Actions. Orgen kräver kontot Elwyndaz: `GH_TOKEN="$(gh auth token --user Elwyndaz)"` före `gh`-kommandon, eftersom `fackligastudier-ui` är aktivt konto och saknar rättigheter. Ingen rad i buildapp.se:s sitemap eller startsida, med flit.

## 2026-11-04: koll före släppet

Blizzards pre-launch-noter (2 nov, via Warcraft Tavern 4 nov) lästa mot sajten. Piercing Ice borttagen och Elemental Precision blev Precision 3/3. Talangkartan i `site/mage.js` hade redan det, men punktlistan i Mage-avsnittet var gammal: questa- och 31-till-60-raderna togs bort (kartan täcker dem), AoE-bygget fick Precision 3/3 och de två frigjorda poängen i Frost Channeling 3/3 och Ice Shards 1/5 (mitt val, ej provat). Icy Veins svarar 403 mot WebFetch. Övrigt i noterna: klassträning 1 till 60 kostar 206 till 207 g, högre nivåers mobs har mer hälsa, snabbare respawn i startzoner. Inget om yrken, AH, mount eller dual spec.

## 2026-11-05: träningskostnad och addons

Budgetraderna i `PLAN` (`site/plan.js`) och mountraden har nu Mage-träningen per nivåspann, läst ur Wowheads Forever-listvy `spells/abilities/mage` (`trainingcost`, Horde-portaler borträknade). Wowhead summerar till 249 g, Blizzard säger 206 till 207 g, så budgeten är tilltagen. Mount: ha 140 g på nivå 40 (120 g mount och riding, 18 g träning). Addons: alla nio har en Forever-fil på CurseForge 5 nov, läst via Playwright (filsidans "Recent Files", raden "WoW Forever"). AtlasLoot-länken går till AtlasLoot Classic Forever. Ny rutt `yrken` (Yrken på vägen): Mining, Engineering, First Aid och Fishing i Kharanos och Ironforge, koordinater och priser ur Wowheads Forever-data.
