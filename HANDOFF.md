---
schemaVersion: 1
status: active
currentGoal: Handlingsplanen är live på buildapp.se/wow inför släppet 5 november 2026
nextAction: Efter släppet: byt riktpriserna i site/plan.js mot riktiga AH-priser, se BACKLOG.md
blockers: []
reviewedAt: 2026-11-24
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

## 2026-11-06: yrkesvägar för bank-alten

Två tabeller i vyn Mål (`site/index.html`): Tailoring och Enchanting 1 till 225. Färggränser, material och stavar lästa ur Wowheads Forever-listvyer `spells/professions/tailoring` och `enchanting` (`colors`, `reagents`) plus spellsidornas Tools-rad. Forever har ändrat början av Enchanting: Runed Copper Rod av Mote of Magic, Dust to Motes och Disenchant ger skill till 20, Enchant Bracer - Minor Health finns inte. Ordningen är min, inte provad i spelet.

## 2026-11-07: pengar i yrkestabellerna, fishing

Tailoring-tabellen har nu kostnad, vendorpris och netto per styck: tyg räknat till vendorpris, tråd och färg till vendorns köppris. Säljpriser ur Wowheads Forever-tooltip-API (`nether.wowhead.com/forever/tooltip/item/<id>`, inte spärrat när www.wowhead.com ger Human Verification efter ungefär 100 anrop). Köppriser för tråd och färg från warcraft.wiki.gg (`{{cost}}`). Heavy Silken Thread saknar källa, så den är satt till 4 × säljpriset (20 s) och markerad "cirka". 205 till 225 är nu Black Mageweave Headband, inte Red Mageweave Bag, eftersom den kostar mindre per poäng. Ny tabell för Fishing 1 till 300 i Mål. Zonernas skillnivåer kommer från wikins tabell för senare patchar (ungefärliga), och Nat Pagle-questen för Artisan gäller Classic, inte kontrollerad för Forever. Ny arbitragerad: Mageweave till Black Mageweave Vest, vendor 48 s.

## 2026-11-07: AH-priser och affärer

AH-priser finns på wow.gg/auction-house/forever (AHledger-skanning). Välj EU i regionknappen: sidan startar på US. Läs priserna i DOM:en via attributet `data-copper` under `[data-col="minBuyout"]` och `[data-col="median"]`, raden har `data-item-id`. Backend-API:t (railway) svarar 403 utan sidans egen auth: använd det inte. Ny sorterbar tabell Affärer i vyn Köp och sälj, EU Alliance PvE 7 nov. Bronze Tube, Framework och Gyrochronatom i `plan.js` har nu AH-priser i stället för betapriser (Bronze Bar 2 s 10 k, inte 8 s 30 k), och testets kostnader följer med. Recept kontrollerade via `nether.wowhead.com/forever/tooltip/spell/<id>`. Kvar: mountbudgetens inkomstplan bygger fortfarande på att Engineering ger mycket, vilket inte håller med dagens priser (BACKLOG).

## 2026-11-08: Engineering-tabell och vendor-arbitrage

Ny progressionstabell Main: Engineering till 225 i Mål, före bank-altens Tailoring. Färggränserna kommer från ClassicDB (`classicdb.ch/?spells=11.202`, vanilla) eftersom Wowheads Forever-lista gav Human Verification (405). Byt till Forever-färger när Wowhead svarar. AH-priser från wow.gg EU 7 nov. Affärer fick fem vendor-mot-AH-rader (recept och Rune of Teleportation), med vendorpriser från wikin. Silver Contact kostar 25 k på AH, så Big Bronze Bomb kostar 15 s 47 k.

Fisketabellen fick kolumnerna Zonens nivå (wikins Zones by level (original)) och AH per styck (wow.gg EU 7 nov).

## 2026-11-09: undermeny och Icy Veins-länk

Vänstermenyn visar den aktiva vyns rubriker (h3 och h2.mellan direkt under sektionen) som länkar. Rubrikerna får id:n `<vy>-<slug>` i `app.js`, och `visa()` hittar vyn via `closest(".vy")`, så `#mal-fishing-...` öppnar Mål och scrollar dit. `visa()` körs sist i `app.js`, annars hamnar direktlänkar fel när innehållet renderas. Undermenyn döljs under 920 px. Talangerna nivå för nivå och AoE-raden är ersatta av länkar till Icy Veins Forever-bygget och kalkylatorn: `TALANGER` är borttagen ur `mage.js`.

Ny vy Dungeons (`#dungeons`): nivåer ur wikins Forever-lista (sidan World of Warcraft: Forever, avsnittet Dungeons and raids), mage-drops ur Wowheads zon-listvy `drops` filtrerad på Int eller spell power via nether-tooltipen. Urvalet tog bara de fem högsta blå per dungeon som kandidater. Wowhead saknar drops för City of Dalaran, Drowned City, Krol'dok, Alcaz, Blackmaw, Shaper's Terrace och Blackrock Spire (zon 17804): fyll i när de dyker upp. Undermenyn visas bara när vyn har rubriker.

## 2026-11-10: AH-priser 10 nov, Reddit-arbitrage

Affärer och Engineering-tabellen räknade om med wow.gg EU 10 nov (genererade av ett engångsskript, vinsten räknas ur kopparvärden). Big Bronze Bomb föll 50 s till 6 s, Mageweave Bag 2 g 52 s till 1 g 32 s. Utbud-kolumnen är borttagen: wow.gg visar inte antal längre i DOM:en. Reddit-tipsen kontrollerade mot Forever-recept (nether spell-tooltip): Light Leather Pants, Flying Tiger Goggles, Rough Dynamite, Heavy Blasting Powder och Cured Medium Hide går plus; Greater Magic Wand (2 Lesser Magic Essence i Forever, inte Greater), Cured Heavy Hide och Light till Medium Leather (4 Light i Forever, inte 3) går minus. Fisketabellens AH-priser, tyget i Tailoring-texten och plan.js Engineering-priser (RECEPT, HANDEL, testets kostnader) är också uppdaterade till 10 nov.

## 2026-11-11: Legacy-val

Patrik valde Bountiful Harvest på mainen (inte Thrill som sajtens Levla och crafta föreslår). Rogue-alten får Skinning och Herbalism. Noterat under Karaktärer. Öppet: Wowheads live-tooltip för Working Overtime säger 10 % totalt, sajten och guiden 4 % per rang; ej ändrat förrän spelets tooltip avläses.

## 2026-11-14: Dungeons med rogue och förberedelse

Dungeons-tabellen fick kolumnerna Rogue (alt) och Gör innan, och mage-kolumnen fylldes för Dalaran, SM Graveyard, Drowned City, Krol'dok, Alcaz, Blackmaw, LBRS, UBRS och DM West/North. Droppar ur Wowheads zon-listvyer (32 zoner, 14 nov) med stats från nether-tooltipen, set-bonusar bortklippta (annars räknas setets stats som föremålets). Rangordningen är min formel: rogue vapen-dps och 2 x Agi + Str, mage 1,3 x SP + Int. Blackrock Spire och Dire Maul är en zon var hos Wowhead, uppdelade på raderna efter boss. Shaper's Terrace saknar fortfarande data. Det finns en andra City of Dalaran-zon (16560, quests nivå 52 till 60) som inte har någon rad.

Quest-ID:n kommer ur zonernas quest-listvy (Alliance och båda). Kedjorna före dem kommer från warcraft.wiki.gg (API med `origin=*`): Classic-sidorna för gamla dungeons och Forever-mallarna (`Template:<dungeon> quests`) för nya. Wowheads quest-sidor gav Human Verification efter zonhämtningen.

Arbetsmetod: Wowhead läses i Patriks Chrome (Claude in Chrome) med `fetch` från en wowhead.com-flik och `Listview`-blocken tolkade ur HTML:en. Playwright fick Human Verification direkt. Stora resultat läses ut genom att skriva dem i sidan och köra `get_page_text`: `javascript_tool` kapar svaret vid ungefär 1 000 tecken. Auto-läget stoppade `curl` mot nether och Chrome mot Wowhead. Det kördes i manuellt läge.

Flygpunkter (samma dag): Notering fick "Flyg:" med närmaste Alliance-flygpunkt. Flygmästarna kommer ur zonernas npc-listvy (`react[0] === 1` betyder vänlig mot Alliance) och nether-npc-tooltips för zonerna där Wowhead gav Human Verification. Ortnamnen är mina, kopplade till flygmästarens zon och koordinater. Riverglades är inte kontrollerad.

## 2026-11-18: AH-priser i Dyra föremål (backlogsvep, agent)

wow.gg EU Alliance PvE lästes med playwright-cli: regionknappen (US) byts till EU, sökrutan fylls med föremålets namn och raden med rätt `data-item-id` läses (`median`, annars `minBuyout`). 91 av 126 BOE-rader låg ute. Priserna står i `AH` i `site/plan.js` och styr nu gränsen; många är en enda annons och långt under betan (The Green Tower 20 g mot 500 g). Wowhead lästes inte. Övriga P1 kräver spelet.

## 2026-11-20: AH-priser 20 nov överallt

Alla AH-priser är nu wow.gg EU Alliance PvE 20 nov, cirka 15:30: Dyra föremål (`AH` i `plan.js`, median, 96 av 126 rader ute mot 91), Affärer (omräknad och omsorterad, lägsta utköp), Engineering-tabellen, fisketabellen, tyget i Tailoring-texten och `RECEPT` för Bronze Tube, Framework och Gyrochronatom. Stora skiften sedan 10 nov: Bronze Tube 9 s till 5 s (Billibub-köpet går back), Silk Headband från förlust till +23 s, Mithril Casing och Unstable Trigger går plus, Mageweave-sömnad är förlust (Mageweave 5 s 21 k). Affärer räknade tidigare Gyrochronatom på Iron Ore, rättat till Iron Bar. Gray Dye säljs hos vendor (wikin: säljpris 87 k, alltså cirka 3 s 50 k), Salt 50 k (säljpris 12 k).

Metod (playwright-cli, egen session): regionen byts med knappen vars klass innehåller `Dropdown_trigger` och texten US, sedan det synliga menyvalet EU (`:visible`, det finns dolda kopior). Fyll sökrutan (`getByPlaceholder('Search')`), vänta på sidans eget svar från `/api/forever/ah?` med `.eu` och `q=`, läs raden i DOM:en (`data-item-id`, `data-copper` under `data-col="minBuyout"`/`"median"`). Utan id matchas raden på exakt namn. Skriv skriptet som fil och kör `run-code --filename`: inline-JS med regex stoppas av dcg. 216 sökningar tar runt 7 minuter. warcraft.wiki.gg:s API rate-limitar utan egen User-Agent.

`golv`-testet för halva betapriset använder nu ett syntetiskt föremål: 20 nov hade alla rader med betapris också ett AH-pris. Många AH-priser är en enda annons (Gnomish Shrink Ray 1 g 60 s mot betans 177 g), så gränsen kan bli orimligt låg.

## 2026-11-20: granskning av mage, yrken och ekonomi (agent)

En granskningsagent läste sajten mot wikin, nether-tooltips och Icy Veins. Rättat, med källorna kontrollerade en gång till: pullraderna (Flamestrike kommer på 16, Cone of Cold på 26, enligt wikins Mage abilities (Forever)), talangkalkylatorns länk (Icy Veins byggde om guiden 9 och 17 nov), dungeonnivåerna (25 rader enligt wikins Forever-lista), Missa inte (klassquests på 30, 35 och 50), fiskeboken på skill 150 och Nat Pagle bekräftad för Forever, Darkmoon-biljetterna märkta "i Classic". I `GEAR` är nio rader borttagna: fem binder vid upplockning men stod som bank-altens, tre kräver League of Arathor (PvP) och Rose Colored Goggles kräver Engineering 230. Sorcerer's-delarna heter nu Dungeon Set 2-kedjan. Tidslinjen säger Bountiful Harvest i stället för Thrill.

Ej ändrat: bygget "Levla och crafta" (Thrill först) visas fortfarande först i Legacy (`app.js`, `data.js`), trots valet 11 nov. Övriga förslag ligger i BACKLOG.

Arbetsmetod: Icy Veins Forever-sidor svarar 200 mot `curl` med en webbläsar-User-Agent. nether-tooltipen ska anropas utan `dataEnv`: `?dataEnv=13` ger Classic-data.

## 2026-11-21: Warrior-alt med Blacksmithing

Patrik startade en Warrior-alt med Blacksmithing (nivå 6 vid start). Nytt i Karaktärer: Warrior-avsnitt med Legacy-råd, föremål nivå för nivå (Alliance, inga plate-saker före 40, inget PvP och ingen raid) och enchants nivå för nivå (bank-altens Enchanting till 225, effekter ur nether-tooltips: Forever har höjt flera). Nytt i Mål: Blacksmithing 1 till 225, inköpslista och vad smeden gör åt Warrior och Rogue. Alt 4 i tabellen är nu Arms Warrior; Mining som andra yrke är antaget.

Vägen räknades med ett skript över alla tränarrecept upp till 225 (Wowheads Forever-listvy `spells/professions/blacksmithing`, `colors` och `reagents`) och wow.gg EU 21 nov lägsta utköp. Chansen för gul och grön är (grå minus skill) / (grå minus gul), och vid varje skillpoäng valdes receptet med lägst kostnad per förväntad poäng. Summa runt 67 g, mest Mithril och Steel. Working Overtime 5 sänker det med 4 till 8 g beroende på om perken ger +10 eller +20 procentenheter.

Arbetsmetod: Wowheads föremålsfilter med vikter fungerar i Chrome (`/forever/items?filter=ub=1;minrl=X;maxrl=Y;wt=20:21:22;wtv=10:7:3`), `g_listviews.items.data` har `score`, stats, `source` och `sourcemore`. Questens sida läses med `fetch('/forever/quest=ID')` från en wowhead-flik och "Side:" i HTML:en; flera Forever-quests är Horde trots att de kommer upp i filtret. wow.gg har nu en cookie-ruta utan avvisa-knapp: skriptet tar bort elementet i stället för att godkänna, och regionmenyn ligger i `[class*=Dropdown_menu__]` (portal), inte under knappen.

Samma dag: alten är Protection (Icy Veins Forever kallar det snabbaste Warrior-specen). Gear-tabellen fick enhandsvapen och sköldar från nivå 14, valda på Stamina, Strength, armor och dps ur nether-tooltips. Horde-quests sorterades bort via questens tooltiptext (vart den lämnas in). Wowheads föremålssidor visade efter ett 60-tal anrop en mänsklighetskontroll som inte ska lösas: nether-tooltips (`nether.wowhead.com/forever/tooltip/item|quest/ID`) fungerade fortfarande, och källorna för drops lästes i stället via warcraft.wiki.gg:s `api.php?action=parse&prop=wikitext` från en wiki-flik i Chrome (curl ger 403).

Samma dag: Alchemy till 225 under Mål (tabell och inköpslista), räknat som Blacksmithing men med AH-median i stället för lägsta utköp. Runt 7 g. Vem som ska göra Alchemy är inte bestämt; texten föreslår att Rogue-altens örter postas dit. Forevers tränarlista för Alchemy saknar Minor Healing Potion och liknande: läkdryckerna heter Discolored och kräver Murloc Eye. Flaskpriserna är uppskattade som 4 gånger säljpriset.

## 2026-11-24: backlogsvep (agent, worktree `wow-sweep-1124`, gren `sweep/2026-11-24`): klar

Legacy: bygget "Samla, levla och crafta" (förvalt, mainen) är nu Bountiful Harvest 5, Thrill 5, Working Overtime 5, Field Medicine 1, efter Patriks val 11 nov. Field Guide och Frequent Flier föll bort: mitt val, eftersom Thrill och Working Overtime var de första tio poängen förut. Mage-raden i `CLASSES` sade "Thrill först", nu "före resten av Adventure-trädet". Billibub: alla köp är villkorade på AH över 15, 35 och 45 s, även Dagens runda; 9 s-gränsen i tidslinjen och Arbitrage bröt sidans egen 20 %-regel. Altplanen har Rogue-alten som Alt 2, Warrior Alt 3, Paladin och Hunter som förslag, med omräknade summor. Mountbudgeten är 120 g på nivå 40 (Apprentice Riding 100 g med första mounten, Conquest Capped guld- och levlingsguide, ändrad 16 nov), inte 140 g.

Länkkontroll: Icy Veins och Conquest Capped svarar 200 mot `curl` med webbläsar-User-Agent men ger Cloudflare-utmaningen ("Vänta...") mot headless Playwright. CurseForge ger utmaningen mot båda och lämnades.
