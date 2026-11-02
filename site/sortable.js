// Excel-style sorting for any rendered <table data-sort-key="...">: click a header to sort
// by it, click again to reverse, blanks stay last both ways. One file with no imports, made
// to be copied into any project without a framework. Under React, sort the data instead,
// as flaskor src/sort.ts does: moving rows behind React's back breaks its reconciliation.
//
// Call initSortable() once, and sortable(table) after every render of a table.
// A cell sorts by data-sort-value if it has one (empty means blank), else a select's value,
// else its text. `<th data-sort-first="desc">` starts that column at the largest.
// A `<tr data-sort-divider>` splits the body: each part sorts on its own, tfoot stays put.
// Arrows are CSS: th[aria-sort="ascending"] button::after{content:" ▲"}, likewise ▼.

const collator = new Intl.Collator("sv", { numeric: true, sensitivity: "base" });
// In memory, so a re-render keeps the sort and a reload gives back the table's own order.
const remembered = new Map();

// Swedish numbers: "1 240", "27,5", "12 %". Anything else is text, so "33 öppna" is not a number.
export function numberOf(value) {
  const match = /^(-?\d+(?:\s\d{3})*(?:,\d+)?)\s*%?$/.exec(value);
  return match ? Number(match[1].replace(/\s/g, "").replace(",", ".")) : null;
}

export function cellValue(cell) {
  if (!cell) return "";
  const value = cell.dataset.sortValue ?? cell.querySelector("select")?.value ?? cell.textContent ?? "";
  const text = value.trim();
  return text === "·" ? "" : text;
}

export function compareValues(a, b, direction = 1) {
  if (!a || !b) return a === b ? 0 : a ? -1 : 1;
  const x = numberOf(a);
  const y = numberOf(b);
  return (x !== null && y !== null ? x - y : collator.compare(a, b)) * direction;
}

// Array.sort is stable, so ties keep the order the rows came in, as in Excel.
export function orderedRows(rows, index, direction) {
  const ordered = [];
  let part = [];
  const flush = () => {
    ordered.push(...part.map((row) => [row, cellValue(row.cells[index])]).sort(([, a], [, b]) => compareValues(a, b, direction)).map(([row]) => row));
    part = [];
  };
  for (const row of rows) {
    if (row.hasAttribute("data-sort-divider")) {
      flush();
      ordered.push(row);
    } else part.push(row);
  }
  flush();
  return ordered;
}

function apply(table) {
  const sort = remembered.get(table.dataset.sortKey);
  const headers = [...table.tHead.rows[0].cells];
  const index = sort ? headers.findIndex((th) => th.textContent.trim() === sort.label) : -1;
  headers.forEach((th, column) => th.setAttribute("aria-sort", column !== index ? "none" : sort.direction === 1 ? "ascending" : "descending"));
  if (index === -1) return;
  const body = table.tBodies[0];
  body.append(...orderedRows([...body.rows], index, sort.direction));
}

export function sortable(table) {
  // An empty table has no header yet.
  if (!table?.tHead?.rows[0]) return;
  for (const th of table.tHead.rows[0].cells) {
    if (th.textContent.trim() && !th.querySelector("button, input")) th.innerHTML = `<button type="button" class="sort-head">${th.innerHTML}</button>`;
  }
  apply(table);
}

export function initSortable(root = document) {
  root.addEventListener("click", (event) => {
    const th = event.target.closest("thead th");
    const table = th?.closest("table[data-sort-key]");
    if (!table || !event.target.closest("button")) return;
    const label = th.textContent.trim();
    const current = remembered.get(table.dataset.sortKey);
    const direction = current?.label === label ? -current.direction : th.dataset.sortFirst === "desc" ? -1 : 1;
    remembered.set(table.dataset.sortKey, { label, direction });
    apply(table);
  });
}
