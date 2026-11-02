// Roadmap och handel. Priser i koppar: 1 g = 10 000, 1 s = 100.
const g = 10000, s = 100;

export const wh = (kind, id) => `https://www.wowhead.com/forever/${kind}=${id}`;

export function pris(c) {
  const gold = Math.floor(c / g), silver = Math.floor((c % g) / s), kop = c % s;
  return [gold && `${String(gold).replace(/\B(?=(\d{3})+$)/g, " ")} g`, silver && `${silver} s`, kop && `${kop} k`].filter(Boolean).join(" ") || "0";
}

// Gantt-schemat. Datumen räknar med 6 h spel om dagen.
export const START = "2026-11-05", SLUT = "2026-12-24";
export const dag = (d) => (Date.parse(d) - Date.parse(START)) / 864e5;
export const datum = (d) => new Date(d).toLocaleDateString("sv-SE", { day: "numeric", month: "short", timeZone: "UTC" }).replace(".", "");
export const MILSTOLPAR = [["2026-11-13", "Mount"], ["2026-11-25", "Nivå 60"], ["2026-12-09", "Raids"]];
export const GANTT = [
  { varor: ["Waylaid Crate"], kop: ["2026-11-05", "2026-11-09"], salj: ["2026-11-12", "2026-11-26"] },
  { varor: ["Pristine Leather", "Frilled Lichen"], kop: ["2026-11-07", "2026-11-26"], salj: ["2026-11-19", SLUT] },
  { varor: ["Rosecap", "Bauxite", "Pristine Hide"], kop: ["2026-11-13", "2026-11-26"], salj: ["2026-11-22", SLUT] },
  { varor: ["Stranglevine", "Pitchblende", "Pristine Scale", "Death Lotus", "Fel Crystal", "Torbernite", "Black Lotus", "Arcane Crystal"], kop: ["2026-11-19", "2026-12-03"], salj: ["2026-11-26", SLUT] },
  { varor: ["Elemental Fire", "Dreamfoil", "Heart of Fire"], kop: ["2026-11-19", "2026-12-01"], salj: ["2026-12-01", "2026-12-16"] },
];

// Det du tillverkar. Priser per styck i koppar. kostnad är det högsta du ska betala i material.
export const RECEPT = [
  { vad: "Bronze Tube", id: 4371, krav: "Engineering 105", mat: "2 Bronze Bar, 1 Weak Flux", kostnad: 2 * 830 + 100, salj: 4000, vendor: 200, kopare: "Lådor, quest Look to the Stars, 13 recept" },
  { vad: "Bronze Framework", id: 4382, krav: "Engineering 145", mat: "2 Bronze Bar, 1 Medium Leather, 1 Wool Cloth", kostnad: 2 * 830 + 269 + 100, salj: 2900, vendor: 600, kopare: "Journeyman Parts-lådor, 10 recept" },
  { vad: "Gyrochronatom", id: 4389, krav: "Engineering 170", mat: "1 Iron Bar, 1 Gold Power Core", kostnad: 600, salj: 2800, vendor: 750, kopare: "Quest Gyro... What?, 18 recept" },
  { vad: "Mithril Casing", id: 10561, krav: "Engineering 215", mat: "3 Mithril Bar", kostnad: 1800, salj: 3500, vendor: 1000, kopare: "Quest Chasing A-Me 01 från nivå 48, 22 recept" },
  { vad: "Frost Oil", id: 3829, krav: "Alchemy 200, recept 26 s 31 k hos Bro'kin i Alterac", mat: "4 Khadgar's Whisker, 2 Wintersbite, 1 Leaded Vial ger 2 st", kostnad: 800, salj: 1500, vendor: 150, kopare: "Questen Coolant Heads Prevail från nivå 35, A Broken Trap från 56" },
  { vad: "Free Action Potion", id: 5634, krav: "Alchemy 150, recept 18 s 94 k hos Soolie Berryfizz i Ironforge", mat: "2 Blackmouth Oil, 1 Stranglekelp, 1 Leaded Vial", kostnad: 500, salj: 1500, vendor: 75, kopare: "Raid och PvP, Craftsman's Writ" },
];

// Platser på kartan. Koordinater och zon-id från Wowheads Forever-data 2026-11-02.
export const PLATSER = {
  ahSw: { namn: "AH Stormwind", zon: 1519, zonNamn: "Stormwind", x: 53.2, y: 60.4, npc: 8670 },
  ahIf: { namn: "AH Ironforge", zon: 1537, zonNamn: "Ironforge", x: 24.2, y: 74.4, npc: 8720 },
  billibub: { namn: "Billibub Cogspinner", zon: 1519, zonNamn: "Stormwind", x: 55.2, y: 7.4, npc: 5519 },
  gearcutter: { namn: "Gearcutter Cogspinner", zon: 1537, zonNamn: "Ironforge", x: 67.8, y: 43, npc: 5175 },
  loslor: { namn: "Loslor Rudge", zon: 1, zonNamn: "Dun Morogh", x: 50, y: 49.4, npc: 1694 },
  bronk: { namn: "Bronk Guzzlegear", zon: 1, zonNamn: "Dun Morogh", x: 50.2, y: 50.4, npc: 1702 },
  springspindle: { namn: "Springspindle Fizzlegear", zon: 1537, zonNamn: "Ironforge", x: 68.2, y: 43.4, npc: 5174 },
  buzzek: { namn: "Buzzek Bracketswing", zon: 440, zonNamn: "Tanaris", x: 52.2, y: 27.4, npc: 8736 },
  soolie: { namn: "Soolie Berryfizz", zon: 1537, zonNamn: "Ironforge", x: 66.4, y: 54.4, npc: 5178 },
  brokin: { namn: "Bro'kin", zon: 36, zonNamn: "Alterac Mountains", x: 38.4, y: 38.8, npc: 2480 },
  graphed: { namn: "Mister Graphed", zon: 16591, zonNamn: "Riverglades", x: 78.2, y: 51.8, npc: 263384 },
  helendis: { namn: "Helendis Riverhorn", zon: 46, zonNamn: "Burning Steppes", x: 85.4, y: 68.8, npc: 9562 },
  lotwil: { namn: "Lotwil Veriatus", zon: 3, zonNamn: "Badlands", x: 25.8, y: 44.4, npc: 2921 },
  grund: { namn: "Grund Drokda", zon: 1, zonNamn: "Dun Morogh", x: 28.6, y: 67.4, npc: 2756 },
  eric: { namn: "Eric Brighthammer", zon: 1, zonNamn: "Dun Morogh", x: 46.6, y: 53.8, npc: 265813 },
  dughan: { namn: "Marshal Dughan", zon: 12, zonNamn: "Elwynn Forest", x: 42.2, y: 65.8, npc: 240 },
  sam: { namn: "Sam Sarsaparilla", zon: 12, zonNamn: "Elwynn Forest", x: 44.8, y: 63.2, npc: 263399 },
  sovsack: { namn: "Burned-Out Remains", zon: 40, zonNamn: "Westfall", x: 37, y: 50, url: "https://www.wowhead.com/forever/guide/cozy-sleeping-bag-locations-rewards" },
};

// Rutter. stopp går i ordning. noder är spawnpunkter i kortaste slinga: närliggande punkter är sammanslagna.
export const RUTTER = [
  { id: "dagens", namn: "Dagens runda", not: "Bank-alten, 5 min, morgon och kväll. Töm posten i en postlåda på vägen.", ben: [
    { zon: 1519, zonNamn: "Stormwind", stopp: [["ahSw", "Skanna med Auctionator. Köp allt under maxpris."], ["billibub", "Köp Bronze Tube och det som klarar tabellens villkor."], ["ahSw", "Lägg upp med kortaste tid, strax under lägsta pris."]] },
  ] },
  { id: "vendor", namn: "Vendorrunda", not: "Tre vendorer på en runda. Ta Deeprun Tram mellan Stormwind och Ironforge. Lagret är litet, så varje vendor är ett nytt köp.", ben: [
    { zon: 1519, zonNamn: "Stormwind", stopp: [["billibub", "Köp enligt tabellen, ta sedan tåget."]] },
    { zon: 1537, zonNamn: "Ironforge", stopp: [["gearcutter", "Köp enligt tabellen."], ["ahIf", "Lägg upp det du köpt."]] },
    { zon: 1, zonNamn: "Dun Morogh", stopp: [["loslor", "Sista vendorn. Står nära din Engineering-lärare."]] },
  ] },
  { id: "larare", namn: "Engineering-lärare", not: "I den ordning du behöver dem.", ben: [
    { zon: 1, zonNamn: "Dun Morogh", stopp: [["bronk", "Lär dig Engineering från nivå 5."]] },
    { zon: 1537, zonNamn: "Ironforge", stopp: [["springspindle", "Expert från nivå 20 och skill 125. Trixie Quikswitch (Journeyman) står bredvid."]] },
    { zon: 440, zonNamn: "Tanaris", stopp: [["buzzek", "Artisan från nivå 35, i Gadgetzan."]] },
  ] },
  { id: "copper", namn: "Copper", not: "Dun Morogh. Från nivå 1.", zon: 1, zonNamn: "Dun Morogh", noder: "21 51,22 50,24 46,27 45,27 49,29 54,33 54,36 55,38 54,38 59,40 56,42 54,42 53,42 51,42 50,39 49,33 51,34 49,34 41,30 41,27 35,31 34,36 35,39 38,38 43,40 42,43 45,43 39,42 37,40 33,39 30,44 29,48 36,50 44,58 42,78 38,80 34,82 39,82 47,78 48,75 52,79 54,85 54,82 56,78 58,76 59,78 64,71 63,67 60,64 59,62 62,57 61,59 57,66 56,66 57,71 59,70 56,70 53,72 50,68 49,67 50,65 51,63 47,56 53,55 55,52 52,52 58,50 58,50 64,48 65,43 61,43 64,44 68,40 68,39 65,36 64,32 59,29 59,21 55,22 54" },
  { id: "tin", namn: "Tin", not: "Loch Modan. Från Mining 65.", zon: 38, zonNamn: "Loch Modan", noder: "23 31,25 47,27 59,29 72,27 86,30 87,34 92,35 94,33 87,36 85,57 69,63 71,70 77,73 74,79 74,80 74,78 71,78 68,75 65,73 69,71 66,69 63,72 50,69 47,72 44,79 47,80 40,67 31,72 28,74 26,78 27,74 20,79 16,77 14,75 16,68 19,65 19,62 16,60 14,35 15" },
  { id: "arathi", namn: "Iron och Gold", not: "Arathi Highlands. Samma noder kan ge båda. Iron från Mining 125, Gold från 155.", zon: 45, zonNamn: "Arathi Highlands", noder: "16 68,22 74,19 84,22 85,19 93,23 90,27 88,41 76,51 78,50 81,54 81,54 78,56 73,60 74,65 66,67 67,63 74,65 75,68 76,66 81,70 83,70 78,70 74,71 71,73 67,74 64,73 59,70 58,71 53,71 50,74 48,78 44,80 43,79 36,82 36,83 33,86 31,86 30,84 29,77 29,77 33,71 31,69 28,66 26,64 35,62 32,53 33,48 36,43 32,42 31,41 28,36 25,38 23,34 21,31 18,27 19,32 23,38 35,31 33,26 30,19 33,25 37,30 44,32 46,34 42,39 43,50 48,54 49,62 44,55 65,47 71,38 63,35 62,34 67,32 70" },
  { id: "mithril", namn: "Mithril", not: "The Hinterlands. Från Mining 175.", zon: 47, zonNamn: "The Hinterlands", noder: "23 60,26 63,31 61,34 64,33 66,30 68,27 69,30 71,31 75,36 75,37 67,41 66,41 59,50 48,54 54,51 61,52 65,50 65,46 69,47 71,51 69,57 73,61 83,65 83,68 77,74 87,83 81,80 74,75 75,80 63,83 50,81 42,79 48,72 52,65 52,68 55,75 57,77 60,74 66,73 67,69 72,66 69,62 72,63 64,67 62,61 58,58 49,56 45,57 41,59 42,60 44,63 44,64 37,68 38,69 34,70 27,68 20,70 12,67 14,64 17,64 22,58 20,59 23,59 28,61 34,57 36,47 33,46 38,49 42,42 42,40 44,33 41,31 42,30 55" },
  { id: "thorium", namn: "Thorium", not: "Un'Goro Crater, flest noder av alla zoner. 225 st till Engineering 300.", zon: 490, zonNamn: "Un'Goro Crater", noder: "38 35,45 35,52 32,55 35,45 65,49 66,51 76,49 87,51 90,55 93,54 87,62 85,65 80,55 65,59 65,63 66,74 70,76 62,81 61,77 49,75 40,79 39,76 33,63 33,70 19,66 18,64 16,66 14,57 12,50 13,39 15" },
];

// Huvudtabellen. Priser i koppar. kop är maxpris, salj riktpris.
// Köp: köp och sälj vidare direkt, eller använd. Samla: bryt, flå eller loota. Spara: håll för att sälja senare. Sälj: lägg upp nu.
// plats öppnar kartan på en plats, rutt på en rutt, var är ren text.
export const PLAN = [
  { fas: "Alltid", tid: "Alla nivåer, main och alts", gor: ["Kör [rutt:dagens] på bank-alten morgon och kväll", "Logga ut i stan eller på värdshus, så byggs rested", "Sälj på AH i Stormwind eller Ironforge (5 % avgift), inte i Gadgetzan (15 %)"], rader: [
    { typ: "Köp", vad: "Bronze Tube", id: 4371, antal: "2 per besök", kop: 842, salj: 4000, plats: "billibub", nar: "Bara om AH är över 15 s" },
    { typ: "Köp", vad: "Bronze Framework", id: 4382, antal: "1 per besök", kop: 2526, saljText: "35 s eller mer", plats: "billibub", nar: "Bara om AH är över 35 s" },
    { typ: "Köp", vad: "Gyrochronatom", id: 4389, antal: "1 per besök", kop: 3157, saljText: "45 s eller mer", plats: "billibub", nar: "Bara om AH är över 45 s" },
    { typ: "Köp", vad: "Allt under vendorvärde", antal: "Allt", kopText: "Under vendorvärdet", saljText: "Vendor", plats: "ahSw", nar: "Direkt" },
    { typ: "Köp", vad: "Felprissatta varor och blå BoE", antal: "Allt", kopText: "Under halva medelpriset", saljText: "Medelpriset", plats: "ahSw", nar: "Direkt" },
    { typ: "Samla", vad: "Malm och tyg på vägen, posta till bank-alten", antal: "Allt", kopText: "Post 30 k per föremål", saljText: "Se nivåerna", var: "Där du är" },
    { typ: "Spara", vad: "Waylaid Crates och Scarce-material du hittar", antal: "Alla", saljText: "Se nivåerna", var: "Bank-alten" },
    { typ: "Sälj", vad: "Blå BoE du hittar. Aldrig till vendor: då binds den", antal: "Alla", saljText: "Kolla AH, betan gav 10 till 250 g", plats: "ahSw", nar: "Direkt" },
    { typ: "Sälj", vad: "Tyg utöver det bank-alten behöver", antal: "Överskott", saljText: "Över 2 gånger vendor", plats: "ahSw", nar: "Löpande" },
  ] },
  { fas: "Serverstart", tid: "5 till 7 nov", budget: "Kassa under 5 g", gor: ["Väskan: Grund and Gozwin hos [plats:grund]", "Cooking, First Aid och Mining, sätt Hearthstone", "Skapa bank-alten (Warlock) och logga ut vid [plats:ahSw]"], rader: [
    { typ: "Samla", vad: "Copper Ore", antal: "Allt", saljText: "Över 2 gånger vendor", rutt: "copper" },
    { typ: "Spara", vad: "Waylaid Crate", id: 248549, antal: 40, kop: 3 * s, salj: 20 * s, plats: "ahSw", nar: "12 till 26 nov" },
  ] },
  { fas: "Nivå 1 till 20", tid: "Också låga alts. 5 till 8 nov", budget: "Högst 20 % av kassan", gor: ["Engineering hos [plats:bronk]. Mining till 65 och smält Bronze (1 Copper Bar plus 1 Tin Bar ger 2)"], rader: [
    { typ: "Köp", vad: "Bronze Bar, bara om du inte bryter själv", antal: 50, kop: 8 * s, saljText: "Eget bruk", plats: "ahSw" },
    { typ: "Samla", vad: "Tin Ore", antal: "Allt", saljText: "Eget bruk", rutt: "tin" },
    { typ: "Samla", vad: "Linen Cloth till bank-alten", antal: 65, saljText: "Eget bruk", var: "Humanoider på vägen" },
    { typ: "Samla", vad: "Light Leather, din sambo flår", antal: "Allt", saljText: "Över 2 gånger vendor", var: "Dun Morogh, Loch Modan, Darkshore" },
    { typ: "Spara", vad: "Pristine Leather", id: 249427, antal: 5, kop: 2 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    { typ: "Spara", vad: "Frilled Lichen", id: 249399, antal: 5, kop: 1 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    { typ: "Sälj", vad: "Bronze Tube du gör själv, Engineering 105", id: 4371, antal: 25, kop: 1760, salj: 4000, plats: "ahSw", nar: "Direkt, i 8-stackar" },
    { typ: "Sälj", vad: "Bank-alten, Tailoring 25: Brown Linen Robe, disenchanta", id: 6238, antal: "Så länge det går runt", kopText: "Under 98 k i material", saljText: "Dust och Essence, annars vendor 98 k", plats: "ahSw", nar: "Direkt" },
  ] },
  { fas: "Nivå 20 till 30", tid: "8 till 9 nov", budget: "Köp inget nytt att spara: mount först", gor: ["Expert Engineering hos [plats:springspindle]. Smält Iron på Mining 125 och Gold på 155"], rader: [
    { typ: "Köp", vad: "Gold Bar till Gold Power Core, 1 ger 3", antal: "Efter behov", kop: 9 * s, saljText: "Eget bruk", plats: "ahSw" },
    { typ: "Samla", vad: "Wool Cloth till bank-alten", antal: 459, saljText: "Eget bruk", var: "Humanoider på vägen" },
    { typ: "Samla", vad: "Medium Leather, din sambo flår", antal: "Allt", kopText: "Beta 2 s 69 k", saljText: "Eget bruk eller AH", var: "Wetlands, Ashenvale" },
    { typ: "Sälj", vad: "Bronze Framework, bara för att levla yrket", id: 4382, antal: 15, kop: 2029, salj: 2900, plats: "ahSw", nar: "Direkt, i 4-stackar" },
    { typ: "Sälj", vad: "Malm och bars du inte använder", antal: "Överskott", saljText: "Över 2 gånger vendor", plats: "ahSw", nar: "Löpande" },
  ] },
  { fas: "Nivå 30 till 40", tid: "9 till 13 nov", budget: "Spara 120 g till mount, köp inget att spara. Varorna här ger högst runt 25 g, resten måste bli questguld och BoE (ej uppmätt)", gor: ["Artisan Engineering hos [plats:buzzek] från nivå 35. Kontrollera [plats:graphed] på nivå 36+. Riding på 40"], rader: [
    { typ: "Samla", vad: "Iron Ore och Gold Ore", antal: "Allt", saljText: "Eget bruk", rutt: "arathi" },
    { typ: "Samla", vad: "Silk Cloth till bank-alten", antal: 216, saljText: "Eget bruk", var: "Humanoider på vägen" },
    { typ: "Samla", vad: "Heavy Leather, din sambo flår", antal: "Allt", saljText: "Över 2 gånger vendor", var: "Stranglethorn, Dustwallow" },
    { typ: "Sälj", vad: "Gyrochronatom, Engineering 170: 1 Iron Bar plus 1 Gold Power Core", id: 4389, antal: "5 åt gången", kop: 600, salj: 2800, plats: "ahSw", nar: "Från nivå 35 på servern" },
    { typ: "Sälj", vad: "Vän-alten, Alchemy 150: Free Action Potion. Recept hos Soolie", id: 5634, antal: "5 åt gången", kop: 500, salj: 1500, plats: "soolie", nar: "Löpande" },
    { typ: "Sälj", vad: "Vän-alten, Alchemy 200: Frost Oil. Recept hos Bro'kin", id: 3829, antal: "5 åt gången", kop: 800, salj: 1500, plats: "brokin", nar: "Från nivå 35 på servern" },
    { typ: "Sälj", vad: "Waylaid Crates", antal: "Alla", saljText: "15 till 30 s", plats: "ahSw", nar: "Senast 26 nov" },
    { typ: "Sälj", vad: "Pristine Leather, Frilled Lichen, bara om mountpengarna saknas", antal: "Det som behövs", saljText: "Från 4 g", plats: "ahSw", nar: "Direkt" },
  ] },
  { fas: "Nivå 40 till 50", tid: "13 till 19 nov", budget: "Mount först, sedan högst 30 % av kassan", gor: ["Dual spec för 50 g hos din Mage-lärare, se Missa inte"], rader: [
    { typ: "Samla", vad: "Mithril Ore", antal: "Allt", saljText: "Eget bruk", rutt: "mithril" },
    { typ: "Samla", vad: "Thick Leather, din sambo flår", antal: "Allt", saljText: "Över 2 gånger vendor", var: "Feralas, Tanaris, Hinterlands" },
    { typ: "Spara", vad: "Pristine Leather", id: 249427, antal: 20, kop: 2.5 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    { typ: "Spara", vad: "Frilled Lichen", id: 249399, antal: 20, kop: 1.5 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    ...[["Rosecap", 249424], ["Bauxite", 249425], ["Pristine Hide"]].map(([vad, id]) => (
      { typ: "Spara", vad, id, antal: 5, kop: 8 * g, salj: 18 * g, tak: 20 * g, plats: "ahSw", nar: "Från 22 nov" })),
    { typ: "Sälj", vad: "Mithril Casing, Engineering 215: 3 Mithril Bar", id: 10561, antal: 5, kop: 1800, salj: 3500, plats: "ahSw", nar: "När folk når nivå 48" },
  ] },
  { fas: "Nivå 50 till 60", tid: "19 till 25 nov", budget: "Högst 30 % av kassan, börja uppifrån", gor: ["Starta Dragonkin Menace hos [plats:helendis]"], rader: [
    { typ: "Samla", vad: "Thorium Ore till Engineering 300", antal: 225, saljText: "Eget bruk", rutt: "thorium" },
    { typ: "Samla", vad: "Runecloth till Engineering 300", id: 14047, antal: 35, saljText: "Eget bruk", var: "På vägen, annars AH" },
    ...[["Stranglevine", 249274], ["Pitchblende", 249426], ["Pristine Scale"], ["Death Lotus"], ["Fel Crystal"], ["Torbernite"]].map(([vad, id]) => (
      { typ: "Spara", vad, id, antal: 3, kop: 20 * g, salj: 45 * g, tak: 50 * g, plats: "ahSw", nar: "Från 26 nov" })),
    ...[["Black Lotus", 13468], ["Arcane Crystal", 12363]].map(([vad, id]) => (
      { typ: "Spara", vad, id, antal: 2, kop: 20 * g, salj: 45 * g, tak: 50 * g, plats: "ahSw", nar: "Från 26 nov" })),
    { typ: "Spara", vad: "Elemental Fire", id: 7068, antal: 40, kop: 15 * s, salj: 60 * s, plats: "ahSw", nar: "1 till 16 dec" },
    { typ: "Spara", vad: "Dreamfoil", antal: 40, kop: 20 * s, salj: 60 * s, plats: "ahSw", nar: "1 till 16 dec" },
    { typ: "Spara", vad: "Heart of Fire", id: 7077, antal: 10, kop: 40 * s, salj: 1.5 * g, plats: "ahSw", nar: "1 till 16 dec" },
  ] },
  { fas: "Nivå 60 till raid", tid: "25 nov till 9 dec", budget: "Sälj det du sparat. Köp bara under maxpris", gor: ["Journeyman Riding 1 000 g, 900 g vid Honored. Drakefire Amulet klar. PvP Rank 3"], rader: [
    { typ: "Sälj", vad: "Pristine Leather, Frilled Lichen", antal: "Allt", saljText: "4 g 50 s", plats: "ahSw", nar: "Löpande" },
    { typ: "Sälj", vad: "Rosecap, Bauxite, Pristine Hide", antal: "Allt", saljText: "18 g", plats: "ahSw", nar: "Löpande" },
    { typ: "Sälj", vad: "Allt med 50 g-tak hos Mister Graphed", antal: "Allt", saljText: "45 g", plats: "ahSw", nar: "Löpande" },
    { typ: "Sälj", vad: "Elemental Fire, Dreamfoil, Heart of Fire", antal: "Hälften", saljText: "60 s, Heart 1 g 50 s", plats: "ahSw", nar: "Från 1 dec" },
  ] },
  { fas: "Raids", tid: "Från 9 dec", gor: ["Fortsätt flippa under taket hos [plats:graphed]. Gift of Galloping för 150 g först när epic är betald"], rader: [
    { typ: "Sälj", vad: "Resten av fire-varorna, helst kvällen före raid", antal: "Allt", saljText: "60 s och uppåt", plats: "ahSw", nar: "Senast 16 dec" },
  ] },
];
export const HANDEL = PLAN.flatMap((f) => f.rader.filter((r) => r.typ === "Spara" && r.kop));

// Dyra föremål. beta: begärt pris på Forever-betan, WoWCensus 2026-10-12, nivåtak 30. classic: begärt pris i Classic Era, WoWCensus 2026-10-26.
// Båda är begärda priser, inte försäljningar. Classic Era är en gammal ekonomi: det visar vad som är sällsynt, inte vad det ger i Forever.
// Flask of the Titans, Shadowfang och Assassin's Blade: snitt räknat ur avrundat listvärde delat med antal. Fyra föremål på 25 g: warcraftforever.games 19 sept.
// Alla är kontrollerade mot Wowheads Forever-databas 2026-11-02. Edgemaster's Handguards, Blackmetal Cape och Lady Maye's Pendant saknades där.
const dyr = (vad, id, typ, krav, beta, classic) => ({ vad, id, typ, krav, beta: beta && beta * g, classic: classic && classic * g });
export const BOE = [
  dyr("The Green Tower", 1204, "Epic", "Nivå 36", 500.89),
  dyr("Schematic: Sniper Scope", 10608, "Recept", "Engineering 240", 339.71),
  dyr("Speedsteel Rapier", 13034, "Blå", "Nivå 36", 250.21),
  dyr("Staff of Jordan", 873, "Epic", "Nivå 35", 250),
  dyr("Tigerstrike Mantle", 13108, "Blå", "Nivå 29", 204.46),
  dyr("Scarlet Boots", 10332, "Blå", "Nivå 30", 200),
  dyr("Gnomish Shrink Ray", 10716, "Övrigt", "Engineering 205", 177.12),
  dyr("Mantle of Thieves", 2264, "Blå", "Nivå 25", 160.29),
  dyr("Warchief Kilt", 7760, "Blå", "Nivå 34", 129.92),
  dyr("Big Iron Fishing Pole", 6367, "Övrigt", "Nivå 25, Fishing 100", 125.25),
  dyr("Traveler's Backpack", 4500, "Väska", "", 100),
  dyr("Vendetta", 776, "Blå", "Nivå 26", 99.63),
  dyr("Forest Tracker Epaulets", 2278, "Blå", "Nivå 26", 96.22),
  dyr("Pugilist Bracers", 4438, "Blå", "Nivå 25", 80),
  ...[["Lil Timmy's Peashooter", 13136], ["Starsight Tunic", 12988], ["Searing Blade", 12992], ["Stormbringer Belt", 12978]].map(([v, id]) => dyr(v, id, "Blå", "", 25)),
  dyr("Cloak of Flames", 3475, "Epic", "Nivå 60", null, 155998),
  dyr("Formula: Enchant Chest - Greater Stats", 16253, "Recept", "Enchanting 300", null, 102997),
  dyr("Teebu's Blazing Longsword", 1728, "Epic", "Nivå 60", null, 100000),
  dyr("Sulfuron Hammer", 17193, "Epic", "Nivå 60", null, 34199),
  dyr("Plans: Lionheart Helm", 12717, "Recept", "Blacksmithing 300", null, 28199),
  dyr("Plans: Stronghold Gauntlets", 12720, "Recept", "Blacksmithing 300", null, 15299),
  dyr("Plans: Sulfuron Hammer", 18592, "Recept", "Blacksmithing 300", null, 10829),
  dyr("Pattern: Mooncloth Circlet", 14509, "Recept", "Tailoring 280", null, 10656),
  dyr("Schematic: Flame Deflector", 4411, "Recept", "Engineering 125", null, 9399),
  dyr("Schematic: Hyper-Radiant Flame Reflector", 18657, "Recept", "Engineering 290", null, 9266),
  dyr("Recipe: Flask of the Titans", 13519, "Recept", "Alchemy 300", null, 6188),
  dyr("Shadowfang", 1482, "Blå", "Nivå 19", null, 2405),
  dyr("Assassin's Blade", 1935, "Blå", "Nivå 19", null, 2293),
  ...[["Hand of Edward the Odd", 2243, 57], ["Blade of Hanna", 2801, 59], ["Cloudkeeper Legplates", 14554, 57], ["Wall of the Dead", 1979, 45], ["Flurry Axe", 871, 42], ["Fiery War Axe", 870, 35], ["Kang the Decapitator", 2291, 44], ["The Eye of Shadow", 18665, 60], ["Elemental Mage Staff", 944, 56]].map(([v, id, n]) => dyr(v, id, "Epic", `Nivå ${n}`)),
];
// Min egen gräns, inget marknadspris: halva betapriset, annars efter hur dyrt det är i Classic Era.
export const golv = (b) => b.beta ? Math.round(b.beta / 2 / s) * s : b.classic >= 10000 * g ? 500 * g : 100 * g;

// Tidslinjen. Samma priser och antal som PLAN: ändra båda.
const hos = (id) => `<button type="button" class="plats" data-plats="${id}">${PLATSER[id].namn}</button>`;
export const PHASES = [
  {
    nar: "Nu till 4 nov", titel: "Före släpp",
    gor: ["Bestäm ruleset och fraktion med alla. Normal om ni inte vill ha PvP", "Reservera namn senast 3 nov om du har köpt paket", "Installera via Battle.net, Game Version, World of Warcraft: Forever", "Lägg in addons i _forever_\\Interface\\AddOns"],
    inte: ["Skapa inte karaktärer på olika rulesets"],
  },
  {
    nar: "5 nov 00:00", titel: "Släppnatten", tim: "Betan hade upp till 48 min kö",
    gor: ["Välj förinställningen Enhanced", "Skapa din Gnome Mage i Dun Morogh", "Skapa bank-alten: Human Warlock i Stormwind", "Bilda grupp innan ni reser. En inbjudan flyttar dig till ledarens layer"],
    inte: ["Slåss inte om mål i fullsatta startzoner: gå vidare"],
  },
  {
    nar: "Nivå 1 till 10", titel: "Bygg grunden", tim: "Första kvällen",
    gor: [`Väskan: Grund and Gozwin hos ${hos("grund")}, senast nivå 7`, "Cooking, First Aid och Mining i första staden", "Sätt Hearthstone vid första värdshuset", `The Great Outdoors hos ${hos("eric")} från nivå 4`, `Ställ bank-alten vid ${hos("ahSw")} och logga ut där. När den levlas: Book Return hos ${hos("dughan")} före nivå 7, gratis väska`, "Posta all Linen till bank-alten, och några silver så att den kan köpa"],
    kop: [`Bronze Tube hos ${hos("billibub")}: högst 8 s 42 k, 2 st per besök, om AH är över 15 s`, "Waylaid Crate: högst 3 s, 40 st"],
    salj: ["Bronze Tube från Billibub: strax under lägsta pris, betan gav runt 40 s", "Copper Ore du inte behöver: över 10 k, annars behåll"],
    inte: ["Sälj inte Linen: bank-alten gör Brown Linen Robe och disenchantar", "Köp inte levlingsprylar på AH", "Sälj inte handelsvaror till vendor: posta till alten"],
  },
  {
    nar: "Nivå 10 till 20", titel: "Yrket börjar betala",
    gor: ["Talanger från nivå 10: se kartan under Karaktärer", `Engineering hos ${hos("bronk")}`, "Mage-quests på nivå 10 och 15: gratis utrustning", "Hall of Thanes 14 till 17 och Deadmines 18 till 22, med alla quests", "Möt din sambo i Westfall eller Loch Modan", "Posta varje Waylaid Crate och Scarce-material till bank-alten", "Legacy-fönstret (Y): lägg första poängen på Thrill of Adventure"],
    kop: ["Pristine Leather: högst 2 g, 5 st", "Frilled Lichen: högst 1 g, 5 st", "Bronze Bar: högst 8 s, 50 st, bara om du inte bryter själv"],
    salj: ["Bank-alten: Strange Dust och Lesser Magic Essence från roben. Ger de mindre än 98 k per robe, sälj roben till vendor"],
    inte: ["Grinda inte kill-XP ihop: kill-XP delas, quest-XP inte", "Sälj inte Scarce under 3 g"],
  },
  {
    nar: "Nivå 20 till 30", titel: "AoE och mount-pengar", tim: "Nivå 30 vid 18 till 22 h",
    gor: ["Teleport på 20", `Expert Engineering hos ${hos("springspindle")}`, "Gör 25 Bronze Tubes på 105 till 125", "Gör 15 Bronze Framework på 145 till 160", "Mage-quest på nivå 26", "Stockade 23 till 29, Excavation Site från 26, City of Dalaran 28 till 33 med quests"],
    salj: ["Bronze Tube: 8-stackar, runt 40 s styck", "Bronze Framework: 4-stackar, runt 29 s styck", "Malm du inte behöver: över 2 gånger vendor"],
    inte: ["Köp inget att spara: mount först", "Kör inte dungeons utan quests för XP: den är låg. Undantag: de som krävs för Spelunker-poängen", "Återställ inte talanger i onödan: priset stiger"],
  },
  {
    nar: "Nivå 30 till 40", titel: "Mount", tim: "Spara 120 g",
    gor: ["Riverglades 36 till 44, Drowned City 35 till 40", `Artisan Engineering hos ${hos("buzzek")} i Gadgetzan från nivå 35`, `Nivå 36+: kontrollera priserna hos ${hos("graphed")}`, "Nivå 40: Apprentice Riding och Portaler"],
    kop: ["1 Gold Bar plus 3 Iron Bar: högst 18 s tillsammans, blir 3 Gyrochronatom"],
    salj: ["Gyrochronatom: 25 till 30 s, högst 5 st åt gången", "Waylaid Crate: 15 till 30 s, alla senast 26 nov", "Pristine Leather från 4 g, bara om mountpengarna saknas"],
    inte: ["Spekulera inte med mount-pengarna"],
  },
  {
    nar: "Nivå 40 till 50", titel: "Börja investera", tim: "Mount först, sedan högst 30 % av kassan",
    gor: ["Dual spec för 50 g hos din Mage-lärare: Frost AoE och Frost solo", "Badlands, Tanaris, Feralas, Hinterlands", `Nifty Stopwatch: This Is Going to Be Hard hos ${hos("lotwil")}`, "Krol'dok Stronghold med quests"],
    kop: ["Pristine Leather: högst 2 g 50 s, 20 st", "Frilled Lichen: högst 1 g 50 s, 20 st", "Rosecap, Bauxite, Pristine Hide: högst 8 g, 5 st var"],
    salj: ["Blåa BoE: kolla AH-priset, betan gav 10 till 250 g", "Mithril Casing: 35 s, 5 st, när folk når nivå 48"],
    inte: ["Betala aldrig mer än 45 g för något Mister Graphed säljer för 50 g", "Sälj aldrig en BoE till vendor: då binds den"],
  },
  {
    nar: "Nivå 50 till 60", titel: "Raid-förberedelser", tim: "60 vid 103 till 124 h",
    gor: [`Starta Dragonkin Menace hos ${hos("helendis")}`, "Alcaz 48 till 53, Blackrock Depths 52 till 60", "Bryt 225 Thorium till Engineering 225 till 300, se rutten på Köp och sälj"],
    kop: ["Stranglevine, Pitchblende, Pristine Scale, Death Lotus, Fel Crystal, Torbernite: högst 20 g, 3 st var", "Black Lotus, Arcane Crystal: högst 20 g, 2 st var", "Elemental Fire: högst 15 s, 40 st", "Dreamfoil: högst 20 s, 40 st", "Heart of Fire: högst 40 s, 10 st"],
    salj: ["Pristine Leather, Frilled Lichen: 4 g 50 s", "Rosecap, Bauxite, Pristine Hide: 18 g, från 22 nov"],
    inte: ["Sälj inte ditt Thorium: du behöver det själv"],
  },
  {
    nar: "60 till 9 dec", titel: "Epic och Onyxia", tim: "6 h om dagen ger 60 runt 25 nov",
    gor: ["Journeyman Riding: 1 000 g, 900 g vid Honored", "Drakefire Amulet klar: The True Masters, Blackrock Depths, Stormwind, Upper Blackrock Spire", "Bygg fire resistance till Onyxia", "PvP Rank 3 för en Legacy-poäng"],
    salj: ["Allt med 50 g-tak: 45 g, från 26 nov", "Hälften av fire-varorna från 1 dec: Elemental Fire och Dreamfoil 60 s, Heart of Fire 1 g 50 s"],
    inte: ["Köp inte Gift of Galloping för 150 g före epic mount"],
  },
  {
    nar: "9 dec och framåt", titel: "Raids", tim: "Barrow Deeps, Hyjal, Onyxia",
    gor: ["Barrow Deeps 10, Hyjal 20, Onyxia 40", "Amuleten i väskan, den behöver inte bäras", "Raidklarningar ger Legacy-poäng"],
    salj: ["Resten av fire-varorna, helst kvällen före raid: 60 s och uppåt, senast 16 dec"],
    inte: ["Lagra inte fire-varor efter första veckorna"],
  },
];
