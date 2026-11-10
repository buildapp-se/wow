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
  { vad: "Bronze Tube", id: 4371, krav: "Engineering 105", mat: "2 Bronze Bar, 1 Weak Flux", kostnad: 2 * 168 + 100, salj: 1150, vendor: 200, kopare: "Lådor, quest Look to the Stars, 13 recept" },
  { vad: "Bronze Framework", id: 4382, krav: "Engineering 145", mat: "2 Bronze Bar, 1 Medium Leather, 1 Wool Cloth", kostnad: 2 * 168 + 72 + 100, salj: 830, vendor: 600, kopare: "Journeyman Parts-lådor, 10 recept" },
  { vad: "Gyrochronatom", id: 4389, krav: "Engineering 170", mat: "1 Iron Bar, 1 Gold Power Core", kostnad: 600, salj: 1025, vendor: 750, kopare: "Quest Gyro... What?, 18 recept" },
  { vad: "Mithril Casing", id: 10561, krav: "Engineering 215", mat: "3 Mithril Bar", kostnad: 1800, salj: 3500, vendor: 1000, kopare: "Quest Chasing A-Me 01 från nivå 48, 22 recept" },
  { vad: "Frost Oil", id: 3829, krav: "Alchemy 200, recept 26 s 31 k hos Bro'kin i Alterac", mat: "4 Khadgar's Whisker, 2 Wintersbite, 1 Leaded Vial ger 2 st", kostnad: 800, salj: 1500, vendor: 150, kopare: "Questen Coolant Heads Prevail från nivå 35, A Broken Trap från 56" },
  { vad: "Free Action Potion", id: 5634, krav: "Alchemy 150, recept 18 s 94 k hos Soolie Berryfizz i Ironforge", mat: "2 Blackmouth Oil, 1 Stranglekelp, 1 Leaded Vial", kostnad: 500, salj: 1500, vendor: 75, kopare: "Raid och PvP, Craftsman's Writ" },
];

// Klassträning i budget: Wowheads Forever-data för Mage, Alliance, 2026-11-05. Summan där är 249 g, Blizzard säger 206 till 207 g, så budgeten är tilltagen.
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
  yarr: { namn: "Yarr Hammerstone", zon: 1, zonNamn: "Dun Morogh", x: 50, y: 50.4, npc: 5392 },
  thamner: { namn: "Thamner Pol", zon: 1, zonNamn: "Dun Morogh", x: 47.2, y: 52.4, npc: 2326 },
  golorn: { namn: "Golorn Frostbeard", zon: 1, zonNamn: "Dun Morogh", x: 46.6, y: 53.4, npc: 1692 },
  geofram: { namn: "Geofram Bouldertoe", zon: 1537, zonNamn: "Ironforge", x: 50.2, y: 26, npc: 4254 },
  grimnur: { namn: "Grimnur Stonebrand", zon: 1537, zonNamn: "Ironforge", x: 48.2, y: 6.6, npc: 5161 },
  tansy: { namn: "Tansy Puddlefizz", zon: 1537, zonNamn: "Ironforge", x: 47.8, y: 6.4, npc: 5162 },
  nissa: { namn: "Nissa Firestone", zon: 1537, zonNamn: "Ironforge", x: 54.8, y: 58.4, npc: 5150 },
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
  { id: "yrken", namn: "Yrken på vägen", not: "Mining, Engineering, First Aid och Fishing för några koppar. Allt i Kharanos utom Fishing, som finns i Ironforge.", ben: [
    { zon: 1, zonNamn: "Dun Morogh", stopp: [["yarr", "Mining, 10 k."], ["bronk", "Engineering, 10 k."], ["thamner", "First Aid, 1 k."], ["golorn", "Fishing Pole, 23 k, om du vill ha spöt direkt."]] },
    { zon: 1537, zonNamn: "Ironforge", stopp: [["grimnur", "Fishing, 1 k."], ["tansy", "Fishing Pole, 24 k, bredvid."], ["nissa", "First Aid, om du missade Kharanos."], ["geofram", "Mining, om du missade Kharanos."]] },
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
    { typ: "Köp", vad: "Bronze Tube", id: 4371, antal: "2 per besök", kop: 842, salj: 1150, plats: "billibub", nar: "Bara om AH är över 15 s" },
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
  { fas: "Nivå 1 till 20", tid: "Också låga alts. 5 till 8 nov", budget: "Högst 20 % av kassan. Klassträning runt 2 g", gor: ["Engineering hos [plats:bronk]. Mining till 65 och smält Bronze (1 Copper Bar plus 1 Tin Bar ger 2)"], rader: [
    { typ: "Köp", vad: "Bronze Bar, bara om du inte bryter själv", antal: 50, kop: 8 * s, saljText: "Eget bruk", plats: "ahSw" },
    { typ: "Samla", vad: "Tin Ore", antal: "Allt", saljText: "Eget bruk", rutt: "tin" },
    { typ: "Samla", vad: "Linen Cloth till bank-alten", antal: 65, saljText: "Eget bruk", var: "Humanoider på vägen" },
    { typ: "Samla", vad: "Light Leather, din sambo flår", antal: "Allt", saljText: "Över 2 gånger vendor", var: "Dun Morogh, Loch Modan, Darkshore" },
    { typ: "Spara", vad: "Pristine Leather", id: 249427, antal: 5, kop: 2 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    { typ: "Spara", vad: "Frilled Lichen", id: 249399, antal: 5, kop: 1 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    { typ: "Sälj", vad: "Bronze Tube du gör själv, Engineering 105", id: 4371, antal: 25, kop: 436, salj: 1150, plats: "ahSw", nar: "Direkt, i 8-stackar" },
    { typ: "Sälj", vad: "Bank-alten, Tailoring 25: Brown Linen Robe, disenchanta", id: 6238, antal: "Så länge det går runt", kopText: "Under 98 k i material", saljText: "Dust och Essence, annars vendor 98 k", plats: "ahSw", nar: "Direkt" },
  ] },
  { fas: "Nivå 20 till 30", tid: "8 till 9 nov", budget: "Köp inget nytt att spara: mount först. Klassträning runt 11 g", gor: ["Expert Engineering hos [plats:springspindle]. Smält Iron på Mining 125 och Gold på 155"], rader: [
    { typ: "Köp", vad: "Gold Bar till Gold Power Core, 1 ger 3", antal: "Efter behov", kop: 9 * s, saljText: "Eget bruk", plats: "ahSw" },
    { typ: "Samla", vad: "Wool Cloth till bank-alten", antal: 459, saljText: "Eget bruk", var: "Humanoider på vägen" },
    { typ: "Samla", vad: "Medium Leather, din sambo flår", antal: "Allt", kopText: "Beta 2 s 69 k", saljText: "Eget bruk eller AH", var: "Wetlands, Ashenvale" },
    { typ: "Sälj", vad: "Bronze Framework, bara för att levla yrket", id: 4382, antal: 15, kop: 508, salj: 830, plats: "ahSw", nar: "Direkt, i 4-stackar" },
    { typ: "Sälj", vad: "Malm och bars du inte använder", antal: "Överskott", saljText: "Över 2 gånger vendor", plats: "ahSw", nar: "Löpande" },
  ] },
  { fas: "Nivå 30 till 40", tid: "9 till 13 nov", budget: "Ha 140 g på nivå 40: 120 g mount och riding, 18 g klassträning. Träning 30 till 38 kostar runt 30 g på vägen. Köp inget att spara. Varorna här ger högst runt 25 g, resten måste bli questguld och BoE (ej uppmätt)", gor: ["Artisan Engineering hos [plats:buzzek] från nivå 35. Kontrollera [plats:graphed] på nivå 36+. Riding på 40"], rader: [
    { typ: "Samla", vad: "Iron Ore och Gold Ore", antal: "Allt", saljText: "Eget bruk", rutt: "arathi" },
    { typ: "Samla", vad: "Silk Cloth till bank-alten", antal: 216, saljText: "Eget bruk", var: "Humanoider på vägen" },
    { typ: "Samla", vad: "Heavy Leather, din sambo flår", antal: "Allt", saljText: "Över 2 gånger vendor", var: "Stranglethorn, Dustwallow" },
    { typ: "Sälj", vad: "Gyrochronatom, Engineering 170: 1 Iron Bar plus 1 Gold Power Core", id: 4389, antal: "5 åt gången", kop: 600, salj: 1025, plats: "ahSw", nar: "Från nivå 35 på servern" },
    { typ: "Sälj", vad: "Vän-alten, Alchemy 150: Free Action Potion. Recept hos Soolie", id: 5634, antal: "5 åt gången", kop: 500, salj: 1500, plats: "soolie", nar: "Löpande" },
    { typ: "Sälj", vad: "Vän-alten, Alchemy 200: Frost Oil. Recept hos Bro'kin", id: 3829, antal: "5 åt gången", kop: 800, salj: 1500, plats: "brokin", nar: "Från nivå 35 på servern" },
    { typ: "Sälj", vad: "Waylaid Crates", antal: "Alla", saljText: "15 till 30 s", plats: "ahSw", nar: "Senast 26 nov" },
    { typ: "Sälj", vad: "Pristine Leather, Frilled Lichen, bara om mountpengarna saknas", antal: "Det som behövs", saljText: "Från 4 g", plats: "ahSw", nar: "Direkt" },
  ] },
  { fas: "Nivå 40 till 50", tid: "13 till 19 nov", budget: "Mount först, sedan högst 30 % av kassan. Klassträning runt 50 g, plus dual spec 50 g", gor: ["Dual spec för 50 g hos din Mage-lärare, se Missa inte"], rader: [
    { typ: "Samla", vad: "Mithril Ore", antal: "Allt", saljText: "Eget bruk", rutt: "mithril" },
    { typ: "Samla", vad: "Thick Leather, din sambo flår", antal: "Allt", saljText: "Över 2 gånger vendor", var: "Feralas, Tanaris, Hinterlands" },
    { typ: "Spara", vad: "Pristine Leather", id: 249427, antal: 20, kop: 2.5 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    { typ: "Spara", vad: "Frilled Lichen", id: 249399, antal: 20, kop: 1.5 * g, salj: 4.5 * g, tak: 5 * g, plats: "ahSw", nar: "Från 19 nov" },
    ...[["Rosecap", 249424], ["Bauxite", 249425], ["Pristine Hide"]].map(([vad, id]) => (
      { typ: "Spara", vad, id, antal: 5, kop: 8 * g, salj: 18 * g, tak: 20 * g, plats: "ahSw", nar: "Från 22 nov" })),
    { typ: "Sälj", vad: "Mithril Casing, Engineering 215: 3 Mithril Bar", id: 10561, antal: 5, kop: 1800, salj: 3500, plats: "ahSw", nar: "När folk når nivå 48" },
  ] },
  { fas: "Nivå 50 till 60", tid: "19 till 25 nov", budget: "Högst 30 % av kassan, börja uppifrån. Klassträning runt 140 g, varav 41 g på nivå 60", gor: ["Starta Dragonkin Menace hos [plats:helendis]"], rader: [
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

// Dyra föremål. beta: begärt pris på Forever-betan, WoWCensus 2026-10-12, nivåtak 30. De fyra på 25 g: warcraftforever.games 19 sept.
// var: Wowheads Forever-data 2026-11-02, de mobs med högst droppchans. Rader med "i Classic" kommer från classicdb.ch 2026-11-04. Under 0,1 % syns inte. grans: min gräns i guld när betapris saknas, standard 100. Recept: skill 290 eller epic 500, skill 200 100, annars 25.
const dyr = (vad, id, typ, krav, beta, varifran, grans) => ({ vad, id, typ, krav, beta: beta && Math.round(beta * g), var: varifran, grans });
export const BOE = [
  dyr("The Green Tower", 1204, "Epic", "Nivå 36", 500.89, "Världsdrop, 21 mobtyper: Dustwallow Marsh, Swamp of Sorrows, Feralas"),
  dyr("Schematic: Sniper Scope", 10608, "Recept", "Engineering 240", 339.71, "Världsbossar: Ysondre, Lethon, Azuregos runt 5 %. Sällsynt i lådor"),
  dyr("Speedsteel Rapier", 13034, "Blå", "Nivå 36", 250.21, "Världsdrop, 33 mobtyper: Badlands, Swamp of Sorrows, Dustwallow Marsh"),
  dyr("Staff of Jordan", 873, "Epic", "Nivå 35", 250, "Världsdrop, 9 mobtyper: Arathi Highlands, Stranglethorn Vale, Desolace"),
  dyr("Tigerstrike Mantle", 13108, "Blå", "Nivå 29", 204.46, "Världsdrop, 36 mobtyper: Stranglethorn Vale, Alterac Mountains"),
  dyr("Scarlet Boots", 10332, "Blå", "Nivå 30", 200, "Scarlet Monastery, vanliga mobs"),
  dyr("Gnomish Shrink Ray", 10716, "Övrigt", "Engineering 205", 177.12, "Craftas med Engineering, du kan göra den själv"),
  dyr("Mantle of Thieves", 2264, "Blå", "Nivå 25", 160.29, "Razorfen Kraul, vanliga mobs"),
  dyr("Warchief Kilt", 7760, "Blå", "Nivå 34", 129.92, "Scarlet Monastery, vanliga mobs"),
  dyr("Big Iron Fishing Pole", 6367, "Övrigt", "Nivå 25, Fishing 100", 125.25, "Shellfish Trap i Desolace, 1,2 %"),
  dyr("Traveler's Backpack", 4500, "Väska", "", 100, "16 platser. Världsdrop på över 200 mobtyper, bäst Blackrock Spire 1 % och Wetlands 0,7 %. Lockboxar. Behåll efter mount"),
  dyr("Vendetta", 776, "Blå", "Nivå 26", 99.63, "Razorfen Kraul, vanliga mobs"),
  dyr("Forest Tracker Epaulets", 2278, "Blå", "Nivå 26", 96.22, "Världsdrop, 43 mobtyper: Duskwood, Stranglethorn Vale, Hillsbrad Foothills"),
  dyr("Pugilist Bracers", 4438, "Blå", "Nivå 25", 80, "Razorfen Kraul, vanliga mobs"),
  dyr("Lil Timmy's Peashooter", 13136, "Blå", "", 25, "Världsdrop, 67 mobtyper: Ashenvale, Redridge Mountains"),
  dyr("Starsight Tunic", 12988, "Blå", "", 25, "Världsdrop, 67 mobtyper: Ashenvale, Redridge Mountains"),
  dyr("Searing Blade", 12992, "Blå", "", 25, "Lady Anacondra, Wailing Caverns 0,4 %. Världsdrop i Wetlands"),
  dyr("Stormbringer Belt", 12978, "Blå", "", 25, "Dalaran Spellscribe, Silverpine Forest 0,3 %. Lord Pythas, Wailing Caverns 0,3 %"),
  dyr("Cloak of Flames", 3475, "Epic", "Nivå 60", null, "Molten Core och Ahn'Qiraj, vanliga mobs", 500),
  dyr("Formula: Enchant Chest - Greater Stats", 16253, "Recept", "Enchanting 300", null, "Världsbossar: Azuregos 2,1 %, Taerar 1,6 %, Ysondre 1,2 %", 500),
  dyr("Teebu's Blazing Longsword", 1728, "Epic", "Nivå 60", null, "Blackwing Lair och Molten Core, vanliga mobs", 500),
  dyr("Sulfuron Hammer", 17193, "Epic", "Nivå 60", null, "Craftas med Blacksmithing", 500),
  dyr("Plans: Lionheart Helm", 12717, "Recept", "Blacksmithing 300", null, "Världsbossar: Azuregos 1,7 %, Ysondre 0,9 %, Emeriss 0,8 %", 500),
  dyr("Plans: Stronghold Gauntlets", 12720, "Recept", "Blacksmithing 300", null, "Världsbossar: Emeriss 3,2 %, Azuregos 2,1 %, Taerar 1,6 %", 500),
  dyr("Plans: Sulfuron Hammer", 18592, "Recept", "Blacksmithing 300", null, "Quest: A Binding Contract", 500),
  dyr("Pattern: Mooncloth Circlet", 14509, "Recept", "Tailoring 280", null, "Världsbossar: Ysondre 2,3 %, Azuregos 2,2 %, Taerar 1,6 %", 500),
  dyr("Schematic: Flame Deflector", 4411, "Recept", "Engineering 125", null, "Mekgineer Thermaplugg, Gnomeregan 0,5 %"),
  dyr("Schematic: Hyper-Radiant Flame Reflector", 18657, "Recept", "Engineering 290", null, "Solakar Flamewreath, Blackrock Spire 8,2 %"),
  dyr("Recipe: Flask of the Titans", 13519, "Recept", "Alchemy 300", null, "General Drakkisath, Blackrock Spire 4,1 %. Pix Xizzix, Stranglethorn Vale, säljer det också"),
  dyr("Shadowfang", 1482, "Blå", "Nivå 19", null, "Shadowfang Keep, vanliga mobs"),
  dyr("Assassin's Blade", 1935, "Blå", "Nivå 19", null, "Shadowfang Keep, vanliga mobs"),
  dyr("Hand of Edward the Odd", 2243, "Epic", "Nivå 57", null, "Blackwing Lair och Molten Core, vanliga mobs"),
  dyr("Blade of Hanna", 2801, "Epic", "Nivå 59", null, "Lieutenant General Nokhor, Silithus 12,6 %. Blackrock Spire, Molten Core"),
  dyr("Cloudkeeper Legplates", 14554, "Epic", "Nivå 57", null, "Lieutenant General Nokhor, Silithus 5,8 %. Molten Core, Blackwing Lair"),
  dyr("Wall of the Dead", 1979, "Epic", "Nivå 45", null, "Temple of Atal'Hakkar, vanliga mobs"),
  dyr("Flurry Axe", 871, "Epic", "Nivå 42", null, "Världsdrop, 20 mobtyper: Azshara, Searing Gorge, Maraudon"),
  dyr("Fiery War Axe", 870, "Epic", "Nivå 35", null, "Världsdrop, 13 mobtyper: Desolace, Arathi Highlands, Scarlet Monastery"),
  dyr("Kang the Decapitator", 2291, "Epic", "Nivå 44", null, "Temple of Atal'Hakkar, vanliga mobs"),
  dyr("The Eye of Shadow", 18665, "Epic", "Nivå 60", null, "Lord Kazzak, Blasted Lands 89,7 %. Dreadlords och Manahounds där runt 3,5 %"),
  dyr("Elemental Mage Staff", 944, "Epic", "Nivå 56", null, "Världsdrop, 74 mobtyper: Dustwallow Marsh, Blackwing Lair"),
  dyr("Pattern: Bottomless Bag", 14510, "Recept", "Tailoring 300", null, "Taerar, Duskwood 4,6 %. Ysondre, Duskwood 1,4 %. Emeriss, Duskwood 1,1 %", 500),
  dyr("Plans: Arcanite Reaper", 12838, "Recept", "Blacksmithing 300", null, "Bannok Grimaxe, Blackrock Spire 8,2 %", 500),
  dyr("Pattern: Devilsaur Leggings", 15772, "Recept", "Leatherworking 290", null, "Cloned Ooze, Un'Goro Crater 0,8 %. Glutinous Ooze, Un'Goro Crater 0,7 %. Muculent Ooze, Un'Goro Crater 0,6 %", 500),
  dyr("Schematic: Force Reactive Disk", 18291, "Recept", "Engineering 300", null, "Golemagg the Incinerator, Molten Core 1,3 %. Baron Geddon, Molten Core 1,2 %. Garr, Molten Core 1,2 %", 500),
  dyr("Schematic: Core Marksman Rifle", 18292, "Recept", "Engineering 300", null, "Magmadar, Molten Core 1,2 %. Garr, Molten Core 1,1 %. Golemagg the Incinerator, Molten Core 1,1 %", 500),
  dyr("Plans: Annihilator", 12835, "Recept", "Blacksmithing 300", null, "Quartermaster Zigris, Blackrock Spire 12,6 %", 500),
  dyr("Pattern: Core Felcloth Bag", 21371, "Recept", "Tailoring 300", null, "Lord Kazzak, Blasted Lands 21,4 %. Garr, Molten Core 1,2 %. Baron Geddon, Molten Core 1,2 %", 500),
  dyr("Pattern: Robe of Winter Night", 14493, "Recept", "Tailoring 245", null, "Cobalt Mageweaver, Winterspring 4,7 %", 100),
  dyr("Plans: Heartseeker", 12839, "Recept", "Blacksmithing 300", null, "Cannon Master Willey, Stratholme 7,2 %", 500),
  dyr("Pattern: Black Dragonscale Leggings", 15781, "Recept", "Leatherworking 290", null, "Anvilrage Captain, Blackrock Depths 3,3 %", 500),
  dyr("Schematic: Spellpower Goggles Xtreme", 10605, "Recept", "Engineering 225", null, "Ysondre, Duskwood 5,6 %. Azuregos, Azshara 4,7 %. Taerar, Duskwood 4,3 %", 100),
  dyr("Schematic: Craftsman's Monocle", 4415, "Recept", "Engineering 185", null, "Mekgineer Thermaplugg, Gnomeregan 0,5 %", 25),
  dyr("Pattern: Mooncloth Shoulders", 14507, "Recept", "Tailoring 275", null, "Lethon, Duskwood 3,3 %. Taerar, Duskwood 2,7 %. Azuregos, Azshara 2,2 %", 100),
  dyr("Plans: Hammer of the Titans", 12833, "Recept", "Blacksmithing 300", null, "Maleki the Pallid, Stratholme 8,1 %", 500),
  dyr("Pattern: Comfortable Leather Hat", 8384, "Recept", "Leatherworking 175", null, "Världsdrop, 9 mobtyper: Razorfen Downs, Badlands, Feralas, Stranglethorn Vale", 25),
  dyr("Plans: Whitesoul Helm", 12711, "Recept", "Blacksmithing 290", null, "Ysondre, Duskwood 6,7 %. Lethon, Duskwood 5,5 %. Emeriss, Duskwood 4,1 %", 500),
  dyr("Plans: Arcanite Champion", 12834, "Recept", "Blacksmithing 300", null, "Goraluk Anvilcrack, Blackrock Spire 8,7 %", 500),
  dyr("Pattern: Barbaric Belt", 4301, "Recept", "Leatherworking 175", null, "Världsdrop, 6 mobtyper: Alterac Mountains, Razorfen Downs, Badlands", 25),
  dyr("Plans: Runed Mithril Hammer", 8028, "Recept", "Blacksmithing 220", null, "Emeriss, Duskwood 6,5 %. Azuregos, Azshara 5,7 %. Ysondre, Duskwood 4,7 %", 100),
  dyr("Plans: Dark Iron Pulverizer", 11610, "Recept", "Blacksmithing 240", null, "Grizzle, Blackrock Depths 92,7 %", 100),
  dyr("Plans: Masterwork Stormhammer", 12837, "Recept", "Blacksmithing 300", null, "Goraluk Anvilcrack, Blackrock Spire 8,8 %", 500),
  dyr("Plans: Frostguard", 12836, "Recept", "Blacksmithing 300", null, "Western Plaguelands, vanliga mobs", 500),
  dyr("Pattern: Black Dragonscale Shoulders", 15770, "Recept", "Leatherworking 270", null, "Anvilrage Marshal, Blackrock Depths 2,9 %", 100),
  dyr("Pattern: Cloak of Warding", 18418, "Recept", "Tailoring 280", null, "Ur Knot Thimblejack's Cache", 100),
  dyr("Pattern: Stormshroud Gloves", 21548, "Recept", "Leatherworking 290", null, "Världsdrop, 2 mobtyper: Winterspring, Silithus", 500),
  dyr("Plans: Golden Scale Shoulders", 3871, "Recept", "Blacksmithing 150", null, "Världsdrop, 20 mobtyper: Arathi Highlands, Desolace, Razorfen Kraul", 25),
  dyr("Pattern: Helm of the Great Chief", 12716, "Recept", "Leatherworking 290", null, "Azuregos, Azshara 1,7 %. Lethon, Duskwood 1,3 %. Emeriss, Duskwood 1,1 %", 500),
  dyr("Pattern: Blue Dragonscale Shoulders", 15763, "Recept", "Leatherworking 270", null, "Azshara, vanliga mobs", 100),
  dyr("Pattern: Flarecore Wraps", 18265, "Recept", "Tailoring 300", null, "Golemagg the Incinerator, Molten Core 1,2 %. Garr, Molten Core 1,2 %. Baron Geddon, Molten Core 1,2 %", 500),
  dyr("Pattern: Runed Stygian Boots", 20547, "Recept", "Tailoring 285", null, "Ur Decoded True Believer Clippings", 100),
  dyr("Plans: Mithril Plate Shoulders", 7991, "Recept", "Blacksmithing 210", null, "Ysondre, Duskwood 4,2 %. Lethon, Duskwood 3,5 %. Azuregos, Azshara 3,1 %", 100),
  dyr("Pattern: Mooncloth Vest", 14501, "Recept", "Tailoring 270", null, "Ysondre, Duskwood 4,2 %. Azuregos, Azshara 3,2 %. Lethon, Duskwood 2,9 %", 100),
  dyr("Pattern: Ironfeather Breastplate", 15760, "Recept", "Leatherworking 265", null, "The Hinterlands, vanliga mobs", 100),
  dyr("Pattern: Living Breastplate", 15771, "Recept", "Leatherworking 290", null, "Decaying Horror, Western Plaguelands 2,9 %", 500),
  dyr("Pattern: Felcloth Gloves", 18415, "Recept", "Tailoring 280", null, "Ur Knot Thimblejack's Cache", 100),
  dyr("Plans: Black Grasp of the Destroyer", 22220, "Recept", "Blacksmithing 300", null, "Moam, Ruins of Ahn'Qiraj 14 %", 500),
  dyr("Pattern: Dusky Boots", 7452, "Recept", "Leatherworking 175", null, "Världsdrop, 6 mobtyper: Scarlet Monastery, Swamp of Sorrows, Stranglethorn Vale", 25),
  dyr("Pattern: Red Dragonscale Breastplate", 15730, "Recept", "Leatherworking 290", null, "General Drakkisath, Blackrock Spire 4,7 %", 500),
  dyr("Pattern: Stormshroud Armor", 15753, "Recept", "Leatherworking 260", null, "Arkkoran Oracle, Azshara 2,3 %", 100),
  dyr("Pattern: Stormshroud Shoulders", 15764, "Recept", "Leatherworking 270", null, "Azshara, vanliga mobs", 100),
  dyr("Pattern: Mongoose Boots", 18515, "Recept", "Leatherworking 290", null, "Ur Knot Thimblejack's Cache", 500),
  dyr("Plans: Darkrune Gauntlets", 20553, "Recept", "Blacksmithing 300", null, "Ur Decoded True Believer Clippings", 500),
  dyr("Pattern: Mooncloth Leggings", 14497, "Recept", "Tailoring 245", null, "Taerar, Duskwood 3,6 %. Azuregos, Azshara 2,7 %. Emeriss, Duskwood 2,4 %", 100),
  dyr("Pattern: Inferno Gloves", 18416, "Recept", "Tailoring 280", null, "Ur Knot Thimblejack's Cache", 100),
  dyr("Plans: Dark Iron Sunderer", 11611, "Recept", "Blacksmithing 250", null, "Ribbly's Crony, Blackrock Depths 6 %. Hammered Patron, Blackrock Depths 5,6 %", 100),
  dyr("Plans: Golden Scale Boots", 3875, "Recept", "Blacksmithing 175", null, "Världsdrop, 12 mobtyper: Badlands, Alterac Mountains, Scarlet Monastery", 25),
  dyr("Pattern: Guardian Belt", 4298, "Recept", "Leatherworking 145", null, "Mindless Horror, Alterac Mountains 0,6 %", 25),
  dyr("Pattern: Green Dragonscale Leggings", 15733, "Recept", "Leatherworking 245", null, "Murk Worm, The Temple of Atal'Hakkar 2,6 %", 100),
  dyr("Pattern: Swift Flight Bracers", 18516, "Recept", "Leatherworking 290", null, "Ur Knot Thimblejack's Cache", 500),
  dyr("Plans: Darkrune Helm", 20555, "Recept", "Blacksmithing 300", null, "Silithus, vanliga mobs", 500),
  dyr("Pattern: Mooncloth Gloves", 18417, "Recept", "Tailoring 280", null, "Ur Knot Thimblejack's Cache", 100),
  dyr("Pattern: Girdle of Insight", 18514, "Recept", "Leatherworking 290", null, "Ur Knot Thimblejack's Cache", 500),
  dyr("Pattern: Cloak of Fire", 14486, "Recept", "Tailoring 235", null, "Drop, mob okänd", 100),
  dyr("Pattern: Runed Stygian Belt", 20548, "Recept", "Tailoring 285", null, "Ur Decoded True Believer Clippings", 100),
  dyr("Plans: Darkrune Breastplate", 20554, "Recept", "Blacksmithing 300", null, "Ur Decoded True Believer Clippings", 500),
  dyr("Plans: Thick Obsidian Breastplate", 22222, "Recept", "Blacksmithing 300", null, "The Prophet Skeram, Ahn'Qiraj 13,7 %", 500),
  dyr("Pattern: Runed Stygian Leggings", 20546, "Recept", "Tailoring 285", null, "Ur Decoded True Believer Clippings", 100),
  dyr("Pattern: Living Leggings", 15752, "Recept", "Leatherworking 260", null, "Deadwood Shaman, Felwood 1,8 %", 100),
  dyr("Plans: Sageblade", 22389, "Recept", "Blacksmithing 300", null, "Ysondre, Duskwood 1,9 %. Taerar, Duskwood 1,6 %. Azuregos, Azshara 1 %", 500),
  dyr("Pattern: Gloves of Spell Mastery", 14511, "Recept", "Tailoring 295", null, "Lethon, Duskwood 1,7 %. Taerar, Duskwood 0,9 %. Azuregos, Azshara 0,9 %", 500),
  dyr("Pattern: Hide of the Wild", 18518, "Recept", "Leatherworking 300", null, "Ur Knot Thimblejack's Cache", 500),
  dyr("Plans: Persuader", 22390, "Recept", "Blacksmithing 300", null, "Lethon, Duskwood 0,9 %. Emeriss, Duskwood 0,5 %. Taerar, Duskwood 0,5 %", 500),  // Hämtade 2026-11-04 utan Wowheads sidor (403): AtlasLoot Classics lista över världsepics och Classic-recept
  // som saknades ovan, var och en kontrollerad mot Wowheads Forever-tooltip (finns, binder vid equip eller inte alls).
  // Var kommer från classicdb.ch, alltså Classic och inte Forever. Världsepics har 0,025 % per mob där.
  dyr("Dazzling Longsword", 869, "Epic", "Nivå 36", null, "Världsdrop i Classic, 124 mobtyper: Stranglethorn Vale, Badlands, Feralas"),
  dyr("Gloves of Holy Might", 867, "Epic", "Nivå 37", null, "Världsdrop i Classic, 196 mobtyper: Feralas, Stranglethorn Vale, Tanaris"),
  dyr("Bow of Searing Arrows", 2825, "Epic", "Nivå 37", null, "Världsdrop i Classic, 196 mobtyper: Feralas, Stranglethorn Vale, Tanaris"),
  dyr("Ardent Custodian", 868, "Epic", "Nivå 38", null, "Världsdrop i Classic, 196 mobtyper: Feralas, Stranglethorn Vale, Tanaris"),
  dyr("Underworld Band", 1980, "Epic", "Nivå 38", null, "Världsdrop i Classic, 196 mobtyper: Feralas, Stranglethorn Vale, Tanaris"),
  dyr("Icemail Jerkin", 1981, "Epic", "Nivå 39", null, "Världsdrop i Classic, 226 mobtyper: Feralas, Tanaris, Maraudon"),
  dyr("Nightblade", 1982, "Epic", "Nivå 39", null, "Världsdrop i Classic, 226 mobtyper: Feralas, Tanaris, Maraudon"),
  dyr("Gut Ripper", 2164, "Epic", "Nivå 40", null, "Världsdrop i Classic, 226 mobtyper: Feralas, Tanaris, Maraudon"),
  dyr("Boots of Avoidance", 14549, "Epic", "Nivå 40", null, "Världsdrop i Classic, 226 mobtyper: Feralas, Tanaris, Maraudon"),
  dyr("Ring of Saviors", 1447, "Epic", "Nivå 41", null, "Världsdrop i Classic, 224 mobtyper: Feralas, Tanaris, The Hinterlands"),
  dyr("Stonerender Gauntlets", 17007, "Epic", "Nivå 46", null, "Världsdrop i Classic, 250 mobtyper: Felwood, Un'Goro Crater, Azshara"),
  dyr("Hammer of the Northern Wind", 810, "Epic", "Nivå 49", null, "Världsdrop i Classic, 368 mobtyper: Western Plaguelands, Eastern Plaguelands, Felwood"),
  dyr("Glowing Brightwood Staff", 812, "Epic", "Nivå 49", null, "Världsdrop i Classic, 368 mobtyper: Western Plaguelands, Eastern Plaguelands, Felwood"),
  dyr("Helm of Narv", 2245, "Epic", "Nivå 54", null, "Världsdrop i Classic, 353 mobtyper: Blackrock Spire, Eastern Plaguelands, Silithus"),
  dyr("Pattern: Rich Purple Silk Shirt", 4354, "Recept", "Tailoring 150", null, "Världsdrop i Classic, 45 mobtyper: Scarlet Monastery, Uldaman, Stranglethorn Vale", 25),
  dyr("Plans: Mithril Shield Spike", 7976, "Recept", "Blacksmithing 190", null, "Världsdrop i Classic, 178 mobtyper: Tanaris, Feralas, Uldaman. Lockboxar", 25),
  dyr("Pattern: Storm Gauntlets", 12703, "Recept", "Leatherworking 270", null, "Världsdrop i Classic, 129 mobtyper: Blackrock Spire, Stratholme, Scholomance", 100),
  dyr("Pattern: Invulnerable Mail", 12728, "Recept", "Leatherworking 295", null, "Världsdrop i Classic, 30 mobtyper: Blackrock Spire, Molten Core, Blackwing Lair", 500),
  dyr("Formula: Enchant Weapon - Lifestealing", 16254, "Recept", "Enchanting 300", null, "Spectral Researcher, Scholomance 0,88 % i Classic", 500),
  dyr("Recipe: Major Rejuvenation Potion", 18257, "Recept", "Alchemy 300", null, "Molten Core, sju bossar 0,2 % i Classic", 500),
  dyr("Pattern: Belt of the Archmage", 18414, "Recept", "Tailoring 295", null, "Ur Knot Thimblejack's Cache, Dire Maul 2 % i Classic", 500),
  dyr("Pattern: Chromatic Cloak", 18517, "Recept", "Leatherworking 300", null, "Ur Knot Thimblejack's Cache, Dire Maul 2 % i Classic", 500),
  dyr("Pattern: Shifting Cloak", 18519, "Recept", "Leatherworking 300", null, "Ur Knot Thimblejack's Cache, Dire Maul 2 % i Classic", 500),
  dyr("Plans: Titanic Leggings", 22388, "Recept", "Blacksmithing 300", null, "Världsdrop i Classic, 28 mobtyper: Scholomance, Stratholme, Eastern Plaguelands", 500),
];
// Min egen gräns, inget marknadspris: halva betapriset, annars grans.
export const golv = (b) => b.beta ? Math.round(b.beta / 2 / s) * s : (b.grans ?? 100) * g;

// Tidslinjen. Samma priser och antal som PLAN: ändra båda.
const hos = (id) => `<button type="button" class="plats" data-plats="${id}">${PLATSER[id].namn}</button>`;
export const PHASES = [
  {
    nar: "Före första inloggningen", titel: "Förberedelser",
    gor: ["Bestäm ruleset och fraktion med alla. Normal om ni inte vill ha PvP", "Installera via Battle.net, Game Version, World of Warcraft: Forever", "Lägg in addons i _forever_\\Interface\\AddOns"],
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
    salj: ["Bronze Tube från Billibub: strax under lägsta pris, 10 nov låg AH på 9 till 11 s 50 k, alltså knappt någon vinst", "Copper Ore du inte behöver: över 10 k, annars behåll"],
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
    salj: ["Bronze Tube: 8-stackar, runt 9 till 11 s styck", "Bronze Framework: 4-stackar, runt 8 s styck", "Malm du inte behöver: över 2 gånger vendor"],
    inte: ["Köp inget att spara: mount först", "Kör inte dungeons utan quests för XP: den är låg. Undantag: de som krävs för Spelunker-poängen", "Återställ inte talanger i onödan: priset stiger"],
  },
  {
    nar: "Nivå 30 till 40", titel: "Mount", tim: "Ha 140 g på nivå 40",
    gor: ["Riverglades 36 till 44, Drowned City 35 till 40", `Artisan Engineering hos ${hos("buzzek")} i Gadgetzan från nivå 35`, `Nivå 36+: kontrollera priserna hos ${hos("graphed")}`, "Nivå 40: Apprentice Riding och Portaler"],
    kop: ["1 Gold Bar plus 3 Iron Bar: högst 18 s tillsammans, blir 3 Gyrochronatom"],
    salj: ["Gyrochronatom: runt 10 s, högst 5 st åt gången. Under 7 s 50 k: sälj till vendorn", "Waylaid Crate: 15 till 30 s, alla senast 26 nov", "Pristine Leather från 4 g, bara om mountpengarna saknas"],
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
