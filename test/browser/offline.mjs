// Offline guest mode, end to end: the service worker installs, the settings
// screen warms the runtime cache, and with the network switched off the app
// still opens and a Python drill still runs.
//
// Needs only dist/ served on :4173 (make build, then make serve-dist): a
// guest never talks to the backend. Served over localhost, which the browser
// treats as a secure context for service workers.

import { chromium } from "playwright-core";

const APP = process.env.APP ?? "http://localhost:4173";
let pass = 0, fail = 0;
const check = (n, ok, d = "") => ok
  ? (pass++, console.log(`  ok   ${n}`))
  : (fail++, console.log(`  FAIL ${n}${d ? ": " + d : ""}`));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/usr/bin/chromium" });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

console.log("== the worker installs and fills the cache");
await page.goto(APP, { waitUntil: "networkidle" });
await page.evaluate(() => {
  localStorage.clear();
  localStorage.setItem("gleamDrill.prefs.v1",
    JSON.stringify({ editorKeymap: "default", languagesChosen: true, mutedLanguages: [] }));
  const longAgo = Math.floor(Date.now() / 1000) - 3 * 86400;
  localStorage.setItem("gleamDrill.guest.cards.v1", JSON.stringify([{
    category: "NeetCode 150", subcategory: "Arrays & Hashing", title: "Contains Duplicate",
    state: 2, step: null, stability: 12, difficulty: 5,
    due: longAgo + 86400, lastReview: longAgo, introducedAt: longAgo,
    reps: 2, lapses: 0, suspended: false,
  }]));
});
await page.reload({ waitUntil: "networkidle" });
check("the service worker installs",
  await page.evaluate(() => navigator.serviceWorker.ready.then((r) => !!r.active)));
await page.click('button:text-is("Settings")');
await page.waitForSelector(".settings-warm", { timeout: 10000 });
const offlineHelp = () => page.textContent(".settings-row:has(.settings-warm) .settings-help");
check("settings says nothing is cached yet", (await offlineHelp()).includes("Nothing cached yet"));
await page.click(".settings-warm");
await page.waitForFunction(
  () => document.querySelector(".settings-warm") !== null && !document.querySelector(".settings-progress"),
  { timeout: 180000 });
// The size is measured after the download, by reading every entry back.
await page.waitForFunction(
  () => /\d+\.\d MB cached/.test(
    document.querySelector(".settings-row:has(.settings-warm) .settings-help")?.textContent ?? ""),
  { timeout: 30000 }).catch(() => {});
check("Download all fills the runtime cache", /\d+\.\d MB cached/.test(await offlineHelp()), await offlineHelp());
const cached = await page.evaluate(async () => (await (await caches.open("gleamdrill-runtime")).keys()).length);
check("with the compiler, its stdlib and Brython", cached >= 26, String(cached));

console.log("== with the network off");
await context.setOffline(true);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForSelector(".study-screen", { timeout: 20000 }).catch(() => {});
check("the app opens from the cache", await page.isVisible(".study-screen"));
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 20000 });
await page.waitForFunction(
  () => { const b = document.querySelector(".run-button"); return b && !b.disabled; },
  { timeout: 120000 });
check("the Python runtime loads offline", true);
await page.$eval("gleam-editor", (el, value) => {
  el.doc = value;
  el.dispatchEvent(new CustomEvent("editor-change", { detail: { value }, bubbles: true }));
}, "def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)\n");
await page.click(".run-button");
await page.waitForFunction(
  () => { const s = document.querySelector(".results-summary"); return s && !s.classList.contains("running"); },
  { timeout: 120000 });
const verdict = await page.textContent(".results-summary");
check("and a drill runs and passes", verdict.includes("3/3 passed"), verdict);
await page.click(".grade-good");
await page.waitForTimeout(1200);
check("and the review is kept locally",
  (await page.evaluate(() => JSON.parse(localStorage.getItem("gleamDrill.guest.reviews.v1") ?? "[]").length)) === 1);
await context.setOffline(false);

check("no uncaught JavaScript errors", errors.length === 0, errors.slice(0, 3).join(" | "));
console.log(`\n${pass} passed, ${fail} failed`);
await browser.close();
process.exit(fail ? 1 : 0);
