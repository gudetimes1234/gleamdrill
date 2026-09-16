// Renders the last tour (test/browser/tour.mjs) as one page: the headline
// screenshots first, then every act with its checks and images, in the order
// the tour walked them. Reads $SHOTS/tour.json, writes $SHOTS/index.html
// beside the PNGs, which it references by relative path so the page works
// from file://, from a static server, or published as-is with the images.
//
//     SHOTS=/tmp/gleamdrill-tour bun test/browser/report.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const SHOTS = process.env.SHOTS ?? "/tmp/gleamdrill-tour";
const source = join(SHOTS, "tour.json");
if (!existsSync(source)) {
  console.error(`no ${source}: run \`make tour\` first`);
  process.exit(2);
}
const tour = JSON.parse(readFileSync(source, "utf8"));

const git = (format) => {
  try { return execSync(`git log -1 --format=${format}`, { encoding: "utf8" }).trim(); }
  catch { return ""; }
};
const sha = git("%h");
const subject = git("%s");
const when = new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

const esc = (s) => String(s ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// --- shape the data ----------------------------------------------------------

const acts = [];
const byAct = new Map();
for (const row of tour.results) {
  if (!byAct.has(row.act)) {
    const entry = { id: row.act, checks: [], shots: [] };
    byAct.set(row.act, entry);
    acts.push(entry);
  }
  const entry = byAct.get(row.act);
  if (row.shot) entry.shots.push(row);
  else entry.checks.push(row);
}
const checks = tour.results.filter((r) => !r.shot);
const passed = checks.filter((r) => r.ok).length;
const failed = checks.length - passed;
const shots = tour.results.filter((r) => r.shot);
const highlights = shots.filter((r) => r.highlight);
const errors = tour.errors ?? [];
const green = failed === 0 && errors.length === 0;

// "04b-honesty" -> { code: "04b", name: "Honesty" }
const title = (id) => {
  const m = id.match(/^(\d+[a-z]?)-(.*)$/);
  const code = m ? m[1] : "";
  const name = (m ? m[2] : id).replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  return { code, name };
};

// --- render ------------------------------------------------------------------

const shotCard = (row, big = false) => `
  <figure class="shot${big ? " shot-big" : ""}">
    <a href="${esc(row.shot)}" data-lightbox aria-label="Open ${esc(row.note)} full size">
      <img src="${esc(row.shot)}" alt="${esc(row.note)}" loading="lazy">
    </a>
    <figcaption>${big ? `<strong>${esc(row.highlight)}</strong>` : ""}${esc(row.note)}</figcaption>
  </figure>`;

const checkRow = (row) => `
  <li class="check ${row.ok ? "ok" : "fail"}">
    <span class="mark" aria-hidden="true">${row.ok ? "✓" : "✗"}</span>
    <span class="check-text">${esc(row.name)}${!row.ok && row.detail ? `<span class="detail">${esc(row.detail)}</span>` : ""}</span>
  </li>`;

const actSection = (entry) => {
  const { code, name } = title(entry.id);
  const fails = entry.checks.filter((c) => !c.ok).length;
  const ordered = [...entry.checks].sort((a, b) => Number(a.ok) - Number(b.ok));
  return `
  <section class="act${fails ? " has-fail" : ""}" id="act-${esc(entry.id)}">
    <header class="act-head">
      <span class="act-code">${esc(code)}</span>
      <h2>${esc(name)}</h2>
      <span class="act-tally">${entry.checks.length - fails}/${entry.checks.length} checks · ${entry.shots.length} image${entry.shots.length === 1 ? "" : "s"}</span>
    </header>
    <div class="act-body">
      <ul class="checks">${ordered.map(checkRow).join("")}</ul>
      <div class="shots">${entry.shots.map((s) => shotCard(s)).join("")}</div>
    </div>
  </section>`;
};

const nav = acts.map((entry) => {
  const { code, name } = title(entry.id);
  const fails = entry.checks.filter((c) => !c.ok).length;
  return `<a href="#act-${esc(entry.id)}"${fails ? ' class="nav-fail"' : ""}><span class="act-code">${esc(code)}</span> ${esc(name)}</a>`;
}).join("");

const missed = (checks.find((c) => c.name.startsWith("every user-initiated message")) ?? {});

const html = `<title>GleamDrill Tour Report</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  /* One theme, deliberately: the screenshots are the app's dark UI, and a
     report that sat them on a light ground would lie about how it looks. */
  :root {
    --bg: #181825; --bg-raised: #11111b; --bg-panel: #1e1e2e; --border: #313244;
    --text: #cdd6f4; --muted: #bac2de; --dim: #6c7086; --accent: #89b4fa;
    --pass: #a6e3a1; --fail: #f38ba8;
    --sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
    --mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
    color-scheme: dark;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding-block: 0 48px; padding-inline: clamp(16px, 4vw, 40px);
    background: var(--bg); color: var(--text);
    font: 15px/1.5 var(--sans); font-variant-numeric: tabular-nums;
  }
  a { color: var(--accent); }
  h1, h2, h3 { margin: 0; text-wrap: balance; font-weight: 600; }
  .mono, .act-code, .act-tally, .meta, .nav a { font-family: var(--mono); }

  /* Header: the verdict is the page's first sentence. */
  .top {
    display: flex; flex-wrap: wrap; align-items: end; gap: 12px 32px;
    padding-block: 28px 20px; border-bottom: 1px solid var(--border);
  }
  .top h1 { font-size: 22px; letter-spacing: -0.01em; }
  .top h1 small { display: block; font: 500 11px/1.4 var(--mono); color: var(--dim); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
  .meta { color: var(--muted); font-size: 12.5px; display: grid; gap: 2px; }
  .meta b { color: var(--text); font-weight: 500; }
  .verdict {
    margin-left: auto; display: inline-flex; align-items: baseline; gap: 10px;
    padding: 8px 14px; border-radius: 4px; font-family: var(--mono);
    background: color-mix(in oklab, ${green ? "var(--pass)" : "var(--fail)"} 14%, transparent);
    border: 1px solid color-mix(in oklab, ${green ? "var(--pass)" : "var(--fail)"} 50%, transparent);
    color: ${green ? "var(--pass)" : "var(--fail)"};
  }
  .verdict strong { font-size: 20px; font-weight: 500; }
  .verdict span { color: var(--muted); font-size: 12.5px; }

  /* Highlights: the three answers, large. */
  .highlights { padding-block: 24px 8px; }
  .eyebrow { font: 500 11px/1.4 var(--mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--dim); margin-bottom: 12px; }
  .highlight-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
  .shot { margin: 0; display: grid; gap: 8px; align-content: start; }
  .shot a { display: block; background: var(--bg-raised); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
  .shot a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .shot img { display: block; width: 100%; height: auto; max-height: 420px; object-fit: contain; object-position: top; background: #000; }
  .shot-big img { height: 380px; max-height: none; }
  .shot figcaption { font-size: 12.5px; color: var(--muted); line-height: 1.4; }
  .shot figcaption strong { display: block; color: var(--text); font-weight: 600; font-size: 14px; margin-bottom: 2px; }

  /* Act navigation: sticky, one line per act, red where an act failed. */
  .nav {
    position: sticky; top: 0; z-index: 2; background: var(--bg);
    border-block: 1px solid var(--border); margin-top: 24px;
    display: flex; gap: 4px 14px; flex-wrap: wrap; padding-block: 10px; font-size: 12px;
  }
  .nav a { color: var(--muted); text-decoration: none; white-space: nowrap; }
  .nav a:hover, .nav a:focus-visible { color: var(--text); }
  .nav a .act-code { color: var(--dim); }
  .nav a.nav-fail { color: var(--fail); }

  /* Acts: checks on the left, images on the right. */
  .act { padding-block: 28px; border-bottom: 1px solid var(--border); scroll-margin-top: 48px; }
  .act.has-fail { box-shadow: inset 3px 0 0 var(--fail); padding-left: 14px; }
  .act-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px; margin-bottom: 16px; }
  .act-head h2 { font-size: 17px; }
  .act-code { color: var(--dim); font-size: 12px; }
  .act-tally { color: var(--dim); font-size: 12px; margin-left: auto; }
  .act-body { display: grid; grid-template-columns: minmax(260px, 1fr) 2.2fr; gap: 24px; align-items: start; }
  .checks { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; font-size: 13.5px; }
  .check { display: grid; grid-template-columns: 18px 1fr; gap: 8px; align-items: start; }
  .check .mark { font-family: var(--mono); line-height: 1.5; }
  .check.ok .mark { color: var(--pass); }
  .check.fail .mark { color: var(--fail); }
  .check.fail .check-text { color: var(--text); font-weight: 500; }
  .check .detail { display: block; font: 12px/1.4 var(--mono); color: var(--fail); margin-top: 2px; white-space: pre-wrap; word-break: break-word; }
  .shots { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; }
  .shots .shot img { max-height: 260px; }

  .errors { margin-top: 24px; padding: 14px 16px; border: 1px solid color-mix(in oklab, var(--fail) 50%, transparent); border-radius: 4px; }
  .errors h3 { color: var(--fail); font-size: 14px; margin-bottom: 8px; }
  .errors pre { margin: 0; font: 12px/1.5 var(--mono); white-space: pre-wrap; word-break: break-word; color: var(--muted); }

  /* Lightbox: the real image, at real size, on a click. */
  dialog.lightbox { border: 0; padding: 0; background: transparent; max-width: min(96vw, 1400px); max-height: 96vh; }
  dialog.lightbox::backdrop { background: rgb(10 12 20 / 0.85); }
  dialog.lightbox img { display: block; max-width: 96vw; max-height: 90vh; width: auto; height: auto; border: 1px solid var(--border); border-radius: 4px; background: #000; }
  dialog.lightbox figcaption { color: var(--muted); font-size: 13px; text-align: center; padding-top: 8px; font-family: var(--mono); }

  @media (max-width: 760px) {
    .act-body { grid-template-columns: 1fr; }
    .verdict { margin-left: 0; }
    .act.has-fail { padding-left: 12px; }
  }
  @media (prefers-reduced-motion: no-preference) {
    .shot a { transition: border-color 140ms; }
    .shot a:hover { border-color: var(--accent); }
  }
</style>

<header class="top">
  <h1><small>Browser tour</small>GleamDrill Tour Report</h1>
  <div class="meta">
    <span>${esc(when)}</span>
    <span>${sha ? `<b>${esc(sha)}</b> ${esc(subject)}` : "not in a git checkout"}</span>
    <span>${acts.length} acts · ${shots.length} screenshots · ${tour.covered?.length ?? 0} messages exercised</span>
  </div>
  <div class="verdict" role="status">
    <strong>${green ? "All green" : `${failed} failed`}</strong>
    <span>${passed}/${checks.length} checks${errors.length ? ` · ${errors.length} JS error${errors.length === 1 ? "" : "s"}` : ""}</span>
  </div>
</header>

${highlights.length ? `
<section class="highlights" aria-labelledby="hl">
  <div class="eyebrow" id="hl">What shipped, on screen</div>
  <div class="highlight-grid">${highlights.map((s) => shotCard(s, true)).join("")}</div>
</section>` : ""}

${errors.length ? `
<section class="errors"><h3>Uncaught errors</h3><pre>${esc(errors.join("\n"))}</pre></section>` : ""}
${missed.ok === false ? `
<section class="errors"><h3>Messages never exercised</h3><pre>${esc(missed.detail)}</pre></section>` : ""}

<nav class="nav" aria-label="Acts">${nav}</nav>

${acts.map(actSection).join("")}

<dialog class="lightbox" id="lightbox"><figure style="margin:0"><img alt=""><figcaption></figcaption></figure></dialog>
<script>
  const box = document.getElementById("lightbox");
  const img = box.querySelector("img");
  const cap = box.querySelector("figcaption");
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-lightbox]");
    if (link) {
      e.preventDefault();
      img.src = link.getAttribute("href");
      img.alt = link.querySelector("img").alt;
      cap.textContent = link.querySelector("img").alt;
      box.showModal();
    } else if (e.target === box) {
      box.close();
    }
  });
</script>
`;

writeFileSync(join(SHOTS, "index.html"), html);
console.log(`${join(SHOTS, "index.html")}: ${acts.length} acts, ${checks.length} checks (${failed} failed), ${shots.length} screenshots, ${highlights.length} highlights`);
