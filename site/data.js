// Legacy-data. Perkar och rang: Icy Veins, avstämt mot Zockify och warcraft.wiki.gg (2026-11-02, betadata).
// tree: A = Adventure, P = Professions, R = Resourcefulness.
// gate = poäng som måste vara spenderade i samma träd, needs = perk som måste vara full.
export const TREES = { A: "Adventure", P: "Professions", R: "Resourcefulness" };

export const PERKS = {
  "Well Rested": { tree: "A", ranks: 5, effect: "Rested XP byggs snabbare och taket höjs, +4 % per rang." },
  "Thrill of Adventure": { tree: "A", ranks: 5, effect: "1 % max HP och mana över 10 s per rang vid killing blow på icke-trivialt mål. Inte i instanser eller BG." },
  "High Alert": { tree: "A", ranks: 2, gate: 5, effect: "Ser stealth som om du var +1 nivå per rang. Inte i BG." },
  "Talented": { tree: "A", ranks: 5, gate: 5, needs: "Well Rested", effect: "Talangpoäng börjar på nivå 9, 8, 7, 6, 5 i stället för 10. Taket 51 är oförändrat, så värdet är noll på 60." },
  "Field Guide": { tree: "A", ranks: 3, gate: 5, effect: "Kortare cooldown på campingfunktioner: 8, 16, 25 %." },
  "Field Medicine": { tree: "A", ranks: 2, gate: 5, effect: "Recently Bandaged 5 eller 10 s kortare. Inte i instanser eller BG." },
  "Frequent Flier": { tree: "A", ranks: 1, gate: 10, needs: "Field Guide", effect: "50 % billigare flygningar, flygmount 20 % snabbare." },
  "Working Overtime": { tree: "P", ranks: 5, effect: "+4 % chans till skill-up per rang." },
  "Bountiful Harvest": { tree: "P", ranks: 5, effect: "+20 % Scarce-material per rang från Mining, Herbalism och Skinning." },
  "Bartering": { tree: "P", ranks: 2, gate: 5, effect: "Vendorpriser 5 eller 10 % lägre." },
  "Performance Bonus": { tree: "P", ranks: 3, gate: 5, needs: "Bountiful Harvest", effect: "5 % chans per rang till dubbel Merchant's Favor vid inlämning av lådor." },
  "Master Chef": { tree: "P", ranks: 5, gate: 10, effect: "+10 % chans per rang till extra matlagningsresultat." },
  "Dedicated Study": { tree: "P", ranks: 1, gate: 10, needs: "Bartering", effect: "+1 skill i lägsta yrket per dygn (23 h), eller 2 till 4 Elemental Essence när allt är maxat." },
  "Luremaster": { tree: "P", ranks: 2, gate: 10, effect: "25 eller 50 % extra fisk med bete." },
  "Gourmand": { tree: "R", ranks: 3, effect: "Matbuffar varar 33, 66 eller 100 % längre." },
  "The Quick and the Dead": { tree: "R", ranks: 2, effect: "Ghost 5 eller 10 % snabbare, gratis besvärjelser i 1 eller 2 min efter res." },
  "Reinforce": { tree: "R", ranks: 5, effect: "8 % mindre durability-förlust vid död per rang." },
  "For Great Honor": { tree: "R", ranks: 5, gate: 5, effect: "+2 % Honor per rang." },
  "Permanence": { tree: "R", ranks: 2, gate: 5, needs: "Gourmand", effect: "Långa grupp- och raidbuffar och camp-buffar varar 50 eller 100 % längre." },
  "Diplomat": { tree: "R", ranks: 5, gate: 5, effect: "+2 % reputation per rang." },
  "Reagent Economy": { tree: "R", ranks: 1, gate: 10, needs: "The Quick and the Dead", effect: "Klassförmågor kräver inga köpta reagenser." },
};

// Klasser där Reagent Economy ger något.
export const CLASSES = [
  { name: "Mage", reagents: true, note: "Thrill of Adventure först. Teleporter och portaler utan runor gör Reagent Economy till din bästa enskilda poäng på 60." },
  { name: "Hunter", reagents: false, note: "Thrill of Adventure sparar mana mellan pulls. Hunters har knappt några köpta reagenser, så hoppa över Reagent Economy." },
  { name: "Warrior", reagents: false, note: "Thrill of Adventure ersätter mat mellan striderna, och det är din största tidstjuv solo." },
  { name: "Rogue", reagents: false, note: "Thrill of Adventure ger liv mellan pulls. Hoppa över Reagent Economy." },
  { name: "Paladin", reagents: true, note: "Mana mellan pulls är det som bromsar en Ret. Symbols för stora buffar är Classic-reagensen Reagent Economy borde ta bort." },
  { name: "Priest", reagents: true, note: "Candles för Prayer of Fortitude och liknande gör Reagent Economy värd sin poäng i raid." },
  { name: "Druid", reagents: true, note: "Rebirth och Gift of the Wild är Classic-reagenserna. Reagent Economy lönar sig för en healer." },
  { name: "Shaman", reagents: true, note: "Ankh är Classic-reagensen. En självklar poäng om du raidar." },
  { name: "Warlock", reagents: false, note: "Soul Shards köps inte, så Reagent Economy ger lite. Thrill of Adventure kompletterar Life Tap." },
];

export const GOALS = {
  levla: {
    label: "Levla",
    build: { "Thrill of Adventure": 5, "Well Rested": 5, "Talented": 5, "Field Medicine": 1 },
    note: "Köp i den här ordningen. Talented kräver full Well Rested, så första tio poängen ger ingen extra talang. Byt bygge på 60: Talented gör ingenting där.",
  },
  crafta: {
    label: "Levla och crafta",
    build: { "Working Overtime": 5, "Thrill of Adventure": 5, "Field Guide": 3, "Field Medicine": 2, "Frequent Flier": 1 },
    note: "Passar om yrket ska upp under levlingen, till exempel Engineering.",
  },
  guld: {
    label: "Samla och tjäna guld",
    build: { "Bountiful Harvest": 5, "Bartering": 2, "Performance Bonus": 3, "Dedicated Study": 1, "Master Chef": 5 },
    note: "Köp i den här ordningen: Master Chef kräver 10 poäng i trädet.",
  },
  raid: {
    label: "Raid på 60",
    build: { "Reinforce": 5, "Gourmand": 3, "The Quick and the Dead": 2, "Permanence": 2, "Reagent Economy": 1, "Diplomat": 3 },
    swap: { "Reagent Economy": 0, "Diplomat": 4 },
    note: "Längre buffar och mat, billigare dödsfall, reputation kvar till övers. Börja bygga om inför 9 december.",
  },
  pvp: {
    label: "Battlegrounds",
    build: { "For Great Honor": 5, "Gourmand": 3, "The Quick and the Dead": 2, "Reagent Economy": 1, "Diplomat": 5 },
    swap: { "Reagent Economy": 0, "Reinforce": 1 },
    note: "High Alert, Field Medicine och Thrill fungerar inte i BG, så Adventure-trädet är tomt. Diplomat hjälper BG-reputationen.",
  },
  alt: {
    label: "Alt",
    build: { "Well Rested": 5, "Talented": 5, "Field Guide": 3, "Frequent Flier": 1, "Field Medicine": 2 },
    note: "När kontot redan har 16 poäng startar alten med allt det här. Då blir nivå 5 talanger och billigare flyg den stora skillnaden.",
  },
};

export const CHALLENGES = [
  { group: "Klasser", points: 27, grid: { rows: ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"], cols: ["25", "45", "60"] } },
  { group: "Yrken", points: 18, grid: { rows: ["Alchemy", "Blacksmithing", "Enchanting", "Engineering", "Leatherworking", "Tailoring"], cols: ["150", "225", "300"] } },
  { group: "PvP", points: 12, items: ["Rank 3", "Rank 7", "Rank 10", "Rank 13", "Rank 14", "Exalted, BG-fraktion 1", "Exalted, BG-fraktion 2", "Exalted, BG-fraktion 3", "Exalted, BG-fraktion 4", "Field of Honor, vecka 4", "Field of Honor, vecka 7", "Field of Honor, vecka 10"] },
  { group: "Äventyr", points: 2, items: ["Utforska hela världskartan", "Lord Valthalak-kedjan"] },
  { group: "Dungeons", points: 3, items: ["Novice Spelunker (6 dungeons)", "Experienced Spelunker (10 dungeons)", "Master Spelunker (17 dungeons)"] },
  { group: "Raids", points: 3, items: ["Onyxia", "Hyjal Summit, alla 13 bossar", "Barrow Deeps, alla 8 bossar"] },
];

export const REWARDS = [
  { at: 15, name: "Replica Ironforge Air Rifle" },
  { at: 25, name: "Spectral Bear Cub" },
  { at: 40, name: "Spectral Bear Tabard" },
  { at: 55, name: "Reins of the Spectral Bear" },
];

// Bygget för en klass: byter ut Reagent Economy om klassen inte har nytta av den.
export function buildFor(goal, cls) {
  const g = GOALS[goal];
  const build = { ...g.build };
  if (g.swap && !cls.reagents) {
    for (const [perk, ranks] of Object.entries(g.swap)) {
      if (ranks) build[perk] = ranks;
      else delete build[perk];
    }
  }
  return build;
}

// Finns det en köpordning som klarar alla grindar? Returnerar det första felet eller null.
export function buildError(build) {
  const total = Object.values(build).reduce((a, b) => a + b, 0);
  if (total !== 16) return `summan är ${total}, inte 16`;
  const spent = { A: 0, P: 0, R: 0 };
  const bought = {};
  for (const [perk, ranks] of Object.entries(build)) {
    if (!PERKS[perk]) return `okänd perk ${perk}`;
    if (ranks > PERKS[perk].ranks) return `${perk} har bara ${PERKS[perk].ranks} rang`;
  }
  let left = Object.keys(build);
  while (left.length) {
    const next = left.find((perk) => {
      const p = PERKS[perk];
      return (p.gate ?? 0) <= spent[p.tree] && (!p.needs || bought[p.needs] === PERKS[p.needs].ranks);
    });
    if (!next) return `kan inte köpa ${left.join(", ")}`;
    bought[next] = build[next];
    spent[PERKS[next].tree] += build[next];
    left = left.filter((perk) => perk !== next);
  }
  return null;
}
