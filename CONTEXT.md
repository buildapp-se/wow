# WoW Forever-ritningen

## Syfte

Privat samlingssida för oss som börjar spela WoW: Forever (släpp 5 november 2026 kl. 00:00 svensk tid). Tänkt adress `https://buildapp.se/wow/` (se HANDOFF för läget), med `noindex, nofollow`, utan länk från buildapp.se och utan rad i dess sitemap. Ingen inloggning: sidan är olistad, inte hemlig.

## Innehåll

Läget, Karaktärer, Legacy, Ekonomi, Addons, Faktakoll (Gemini-råden), Källor. Allt i `site/index.html`. Legacy-data och byggen i `site/data.js`.

## Regler för innehållet

- Forever är inte Classic. Inget Classic-minne utan märkning.
- Varje påstående har en säkerhetsmärkning: Officiell, Flera källor, En källa, Beta, Classic, Bedömning.
- Inga påhittade guldpriser. Köp- och säljregler är relativa tills det finns riktiga priser.
- Conquest Capped säljer boostar. Används för detaljer men märks.

## Teknik

Statisk sida på GitHub Pages utan byggsteg. `node site/test.mjs` (också i Actions) fäller publiceringen om ett Legacy-bygge inte går att köpa enligt grindarna, om summorna inte stämmer eller om `noindex` saknas. Tabellsortering kopierad från `elwyn-dash/public/sortable.js`. Bockar sparas i `localStorage`, per webbläsare.

## Audits

- UX: 2026-11-02, warn, 5 av 6 skriptkontroller gröna, kvar är radio- och kryssrutor under 44 px vars etiketter ger målytan. Navigationens 39 px rättades efter körningen. Breda tabeller scrollar i egen ruta på mobil.
