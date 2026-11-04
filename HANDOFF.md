---
schemaVersion: 1
status: active
currentGoal: Handlingsplanen är live på buildapp.se/wow inför släppet 5 november 2026
nextAction: Efter släppet: byt riktpriserna i site/plan.js mot riktiga AH-priser, se BACKLOG.md
blockers: []
reviewedAt: 2026-11-04
---

# Handoff

## 2026-11-04: förbättringsrunda före släppet

Gren `claude/forbattringar-2026-11-04`, draft-PR #1. Bara rättningar: rangpipsen i Legacy fick `role="img"` (axe-fel), mobilmenyn scrollar fram den aktiva vyn, modulerna laddas med `modulepreload` (testet kräver samma adresser som importerna), kartrutan stängs av tryck utanför och Warchief Kilts betapris visade flyttalsrester. axe-core på alla vyer i 390 och 1280 px: 0 fel efter.

Länkkontroll: alla 240 Wowhead-länkar finns i Forever-datan och namnen stämmer (`nether.wowhead.com/forever/tooltip/<typ>/<id>` svarar utan 403, till skillnad från sidorna). Blizzard, zonbilderna, WoWCensus och wow-professions svarar 200. CurseForge, Icy Veins, Conquest Capped, warcraft.wiki.gg och GitHub svarar 403 mot skript och är inte kontrollerade. Släpptiden 00:00 CET och raids 9 december stämmer mot Blizzards artiklar.

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
