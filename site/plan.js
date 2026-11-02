// Roadmap och handel. Priser i koppar: 1 g = 10 000, 1 s = 100.
const g = 10000, s = 100;

export const wh = (kind, id) => `https://www.wowhead.com/forever/${kind}=${id}`;

export function pris(c) {
  const gold = Math.floor(c / g), silver = Math.floor((c % g) / s), kop = c % s;
  return [gold && `${gold} g`, silver && `${silver} s`, kop && `${kop} k`].filter(Boolean).join(" ") || "0";
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
  { varor: ["Stranglevine", "Pitchblende", "Pristine Scale", "Death Lotus", "Fel Crystal", "Torbernite", "Black Lotus", "Arcane Crystal"], kop: ["2026-11-13", "2026-12-03"], salj: ["2026-11-26", SLUT] },
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

// fas: när köpet görs. kop: maxpris per styck. salj: riktpris per styck.
export const HANDEL = [
  { fas: "1. Första dagarna", vad: "Waylaid Crate", id: 248549, antal: 40, kop: 3 * s, salj: 20 * s, nar: "Vecka 2 till 3", grund: "Betan: 1 till 2 s tidigt, 15 till 49 s senare" },
  { fas: "2. Fram till mount", vad: "Pristine Leather", id: 249427, antal: 5, kop: 2 * g, salj: 4.5 * g, nar: "När du behöver kassa, annars vid 60", grund: "Betan: 1 g 60 s. Tak 5 g hos Mister Graphed" },
  { fas: "2. Fram till mount", vad: "Frilled Lichen", id: 249399, antal: 5, kop: 1 * g, salj: 4.5 * g, nar: "När du behöver kassa, annars vid 60", grund: "Går in i Cerulean Dye. Tak 5 g" },
  { fas: "2. Fram till mount", vad: "Bronze Bar till yrket", antal: 50, kop: 8 * s, nar: "Görs till Bronze Tube", grund: "Betan: 8 s 30 k. Bara om du inte bryter själv" },
  { fas: "3. Efter mount", vad: "Pristine Leather", id: 249427, antal: 20, kop: 2.5 * g, salj: 4.5 * g, nar: "Vecka 3 och framåt", grund: "Tak 5 g" },
  { fas: "3. Efter mount", vad: "Frilled Lichen", id: 249399, antal: 20, kop: 1.5 * g, salj: 4.5 * g, nar: "Vecka 3 och framåt", grund: "Tak 5 g" },
  ...[["Rosecap", 249424], ["Bauxite", 249425], ["Pristine Hide"]].map(([vad, id]) => (
    { fas: "3. Efter mount", vad, id, antal: 5, kop: 8 * g, salj: 18 * g, nar: "När folk når 45+", grund: "Tak 20 g" })),
  ...[["Stranglevine", 249274], ["Pitchblende", 249426], ["Pristine Scale"], ["Death Lotus"], ["Fel Crystal"], ["Torbernite"]].map(([vad, id]) => (
    { fas: "3. Efter mount", vad, id, antal: 3, kop: 20 * g, salj: 45 * g, nar: "När folk når 60", grund: "Tak 50 g" })),
  ...[["Black Lotus", 13468], ["Arcane Crystal", 12363]].map(([vad, id]) => (
    { fas: "3. Efter mount", vad, id, antal: 2, kop: 20 * g, salj: 45 * g, nar: "När folk når 60", grund: "Tak 50 g" })),
  { fas: "4. Inför raid", vad: "Elemental Fire", id: 7068, antal: 40, kop: 15 * s, salj: 60 * s, nar: "1 till 16 dec", grund: "Greater Fire Protection Potion. Vendor 4 s" },
  { fas: "4. Inför raid", vad: "Dreamfoil", antal: 40, kop: 20 * s, salj: 60 * s, nar: "1 till 16 dec", grund: "Samma potion" },
  { fas: "4. Inför raid", vad: "Heart of Fire", id: 7077, antal: 10, kop: 40 * s, salj: 1.5 * g, nar: "1 till 16 dec", grund: "Transmute till Elemental Fire" },
];

export const BUDGET = {
  "1. Första dagarna": "Kassa under 5 g",
  "2. Fram till mount": "Högst 20 % av kassan. 100 g till mounten går först",
  "3. Efter mount": "Högst 30 % av kassan. Börja uppifrån. Kolla Mister Graphed i spelet innan du lägger över 20 g",
  "4. Inför raid": "Köp av överskottet",
};

export const PHASES = [
  {
    nar: "Nu till 4 nov", titel: "Före släpp",
    gor: ["Bestäm ruleset och fraktion med alla. Normal om ni inte vill ha PvP", "Reservera namn senast 3 nov om du har köpt paket", "Installera via Battle.net, Game Version, World of Warcraft: Forever", "Lägg in addons i _forever_\\Interface\\AddOns"],
    inte: ["Skapa inte karaktärer på olika rulesets"],
  },
  {
    nar: "5 nov 00:00", titel: "Släppnatten", tim: "Betan hade upp till 48 min kö",
    gor: ["Välj förinställningen Enhanced", "Gnome Mage i Dun Morogh. Skapa också en karaktär som blir bank-alt", "Bilda grupp innan ni reser. En inbjudan flyttar dig till ledarens layer"],
    inte: ["Slåss inte om mål i fullsatta startzoner: gå vidare"],
  },
  {
    nar: "Nivå 1 till 10", titel: "Bygg grunden", tim: "Första kvällen",
    gor: ["Bag-questen senast nivå 7", "Cooking, First Aid och Mining i första staden", "Sätt Hearthstone vid första värdshuset", "The Great Outdoors på nivå 5 ger Campfire", "Ställ bank-alten vid AH och brevlåda i Stormwind och logga ut där", "Bank-alten: köp Bronze Tube hos Billibub Cogspinner, se Köp och sälj"],
    kop: ["Waylaid Crate upp till 3 s, 40 st"],
    salj: ["Linen och Copper Ore direkt, om priset slår vendor plus deposition"],
    inte: ["Köp inte levlingsprylar på AH", "Sälj inte handelsvaror till vendor: posta till alten"],
  },
  {
    nar: "Nivå 10 till 20", titel: "Yrket börjar betala", 
    gor: ["Frost-talanger från nivå 10", "Engineering hos Bronk Guzzlegear i Dun Morogh", "Mage-quests på nivå 10 och 15: gratis utrustning", "Hall of Thanes 14 till 17 och Deadmines 18 till 22, med alla quests", "Möt din sambo i Westfall eller Loch Modan", "Spara varje Waylaid Crate och Scarce-material på alten"],
    kop: ["Pristine Leather upp till 2 g, Frilled Lichen upp till 1 g, 5 st var"],
    salj: ["Mat till spelare"],
    inte: ["Grinda inte kill-XP ihop: kill-XP delas, quest-XP inte", "Sälj inte Scarce under 3 g"],
  },
  {
    nar: "Nivå 20 till 30", titel: "AoE och mount-pengar", tim: "Nivå 30 vid 18 till 22 h",
    gor: ["Byt till AoE-bygget. Teleport på 20", "Expert Engineering hos Springspindle Fizzlegear", "Gör 25 Bronze Tubes på 105 till 125", "Stockade 23 till 29, Excavation Site från 26, City of Dalaran 28 till 33 med quests", "Första Legacy-poängen: Thrill of Adventure"],
    salj: ["Bronze Tube runt 40 s, Bronze Framework runt 29 s", "Malm du inte behöver"],
    inte: ["Kör inte dungeons utan quests: dungeon-XP är låg", "Återställ inte talanger i onödan: priset stiger"],
  },
  {
    nar: "Nivå 30 till 40", titel: "Mount", tim: "Spara 120 g",
    gor: ["Riverglades 36 till 44, Drowned City 35 till 40", "Artisan Engineering hos Buzzek Bracketswing i Gadgetzan från nivå 35", "Lägg upp Gyrochronatom och andra questvaror", "Nivå 40: Apprentice Riding och Portaler", "Sälj Waylaid Crates om priset är över 15 s"],
    salj: ["Waylaid Crate 15 till 30 s", "Pristine Leather från 4 g om du behöver mounten först"],
    inte: ["Spekulera inte med mount-pengarna"],
  },
  {
    nar: "Nivå 40 till 50", titel: "Börja investera", tim: "Kassa över 100 g",
    gor: ["Dual spec för 50 g: Frost AoE och Frost solo", "Badlands, Tanaris, Feralas, Hinterlands", "Nifty Stopwatch: This Is Going to Be Hard hos Lotwil Veriatus i Badlands", "Krol'dok Stronghold med quests"],
    kop: ["Scarce under 40 % av Graphed-taket, se Köp och sälj"],
    salj: ["Blåa BoE när du ser köpare på 50+"],
    inte: ["Betala aldrig mer än 45 g för något Mister Graphed säljer för 50 g"],
  },
  {
    nar: "Nivå 50 till 60", titel: "Raid-förberedelser", tim: "60 vid 103 till 124 h",
    gor: ["Starta Dragonkin Menace hos Helendis Riverhorn i Burning Steppes", "Alcaz 48 till 53, Blackrock Depths 52 till 60", "Thorium Bar till Engineering 225 till 300: 225 st, bryt själv"],
    salj: ["Scarce till 4 g 50 s under 5 g-taket och 18 g under 20 g-taket"],
    inte: ["Sälj inte allt Thorium: ingår i 131 recept och du behöver det själv"],
  },
  {
    nar: "60 till 9 dec", titel: "Epic och Onyxia", tim: "6 h om dagen ger 60 runt 25 nov",
    gor: ["Journeyman Riding: 1 000 g, 900 g vid Honored", "Drakefire Amulet klar: The True Masters, Blackrock Depths, Stormwind, Upper Blackrock Spire", "Bygg fire resistance till Onyxia", "PvP Rank 3 för en Legacy-poäng"],
    kop: ["Elemental Fire upp till 15 s, Dreamfoil upp till 20 s, 40 st var", "Heart of Fire upp till 40 s, 10 st"],
    salj: ["Flippa Scarce löpande under taket"],
    inte: ["Köp inte Gift of Galloping för 150 g före epic mount"],
  },
  {
    nar: "9 dec och framåt", titel: "Raids", tim: "Barrow Deeps, Hyjal, Onyxia",
    gor: ["Barrow Deeps 10, Hyjal 20, Onyxia 40", "Amuleten i väskan, den behöver inte bäras", "Raidklarningar ger Legacy-poäng"],
    salj: ["Fire-material och potions kvällarna före raid, 60 s och uppåt"],
    inte: ["Lagra inte fire-varor efter första veckorna"],
  },
];
