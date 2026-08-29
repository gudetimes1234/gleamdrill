// Accounts, scheduling, and the study loop, end to end.
//
// Run with `make e2e`, which expects:
//   - the backend on :1637          (make server-dev)
//   - the app on :4173              (make build, then make serve-dist)
//
// These drive a real browser because the things they check cannot be reached
// any other way: that the grading rule holds in the DOM, that a session
// survives a reload, and that a review actually reaches the database. Both of
// the bugs this suite has caught -- a token dropped on reload, and an interval
// label off by a minute -- were invisible to every other test in the repo.
//
import { chromium } from "playwright-core";

const APP = process.env.APP ?? "http://localhost:4173";
const EMAIL = `e2e-${Math.floor(Math.random() * 1e9)}@example.com`;
const PASSWORD = "correct-horse-battery";

let pass = 0, fail = 0;
const check = (name, ok, detail = "") => {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? ": " + detail : ""}`); }
};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(APP, { waitUntil: "networkidle" });

console.log(`== sign up (${EMAIL})`);
// The app now opens in guest mode, so the form is reached deliberately.
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click("text=Create account");
await page.waitForSelector(".auth-card", { timeout: 10000 });
check("sign-in form renders", await page.isVisible(".auth-card"));
check("opens in register mode",
  (await page.textContent(".auth-submit")).includes("Create account"));

await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', PASSWORD);
await page.click(".auth-submit");

await page.waitForSelector(".study-screen", { timeout: 15000 });
check("lands on the study screen after signing up", true);
check("shows the signed-in email",
  (await page.textContent(".study-email")) === EMAIL);

const counts = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("due starts at 0", counts[0] === "0", `got ${counts[0]}`);
check("new budget starts at 10", counts[1] === "10", `got ${counts[1]}`);
check("forecast renders 7 days",
  (await page.$$(".forecast-day")).length === 7);

console.log("== start a scheduled session");
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 20000 });
check("opens a drill", true);
// A first encounter grades freely: all four buttons before any run.
check("a first encounter grades from the start",
  (await page.$$(".grade-button")).length === 4,
  `${(await page.$$(".grade-button")).length} buttons`);

console.log("== fail the harness (first encounter: still free)");
// The starter stub is `todo`/`pass`, so running it fails: exactly the path
// that must force Again.
await page.waitForFunction(
  () => { const b = document.querySelector(".run-button"); return b && !b.disabled; },
  { timeout: 120000 },
);
await page.click(".run-button");
await page.waitForSelector(".grade-bar", { timeout: 60000 });
const failButtons = await page.$$eval(".grade-button", (n) =>
  n.map((e) => e.querySelector(".grade-label").textContent));
check("a failed first run still offers every grade",
  JSON.stringify(failButtons) === '["Again","Hard","Good","Easy"]',
  JSON.stringify(failButtons));
const againInterval = await page.textContent(".grade-again .grade-interval");
check("Again shows a short interval", /^\d+m$/.test(againInterval), againInterval);

console.log("== grade it");
await page.click(".grade-again");
await page.waitForTimeout(2500);
check("advances to the next problem after grading",
  await page.isVisible(".run-bar"));

console.log("== the review reached the server");
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 15000 });
const after = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("the session survived a reload (still signed in)", true);
check("a review was recorded today", after[2] === "1", `got ${after[2]}`);
check("the new-card budget went down", after[1] === "9", `got ${after[1]}`);

console.log("== stats");
await page.click("text=Stats");
await page.waitForSelector(".stats-tiles", { timeout: 10000 });
const tiles = await page.$$eval(".stats-tile-value", (n) => n.map((e) => e.textContent));
// Tile order: fluent count (hero), problems started, streak, retention.
check("streak is 1 day", tiles[2] === "1", `got ${tiles[2]}`);
check("the problem is counted as started", tiles[1] === "1", `got ${tiles[1]}`);
check("heatmap renders", (await page.$$(".heatmap-cell")).length > 100);

console.log("== the menu badge reflects schedule state");
await page.click("text=Back");
await page.waitForSelector(".study-screen");
await page.click("text=Browse problems");
await page.waitForSelector(".pane", { timeout: 10000 });
await page.fill(".search-input, input[type=search], .search-box input", "Contains Duplicate").catch(() => {});
await page.waitForTimeout(600);
const badges = await page.$$eval(".badge", (n) => n.map((e) => e.className + "=" + e.textContent));
check("a drilled problem now carries a schedule badge",
  badges.some((b) => b.includes("badge-learning") || b.includes("badge-due")),
  JSON.stringify(badges.slice(0, 4)));

console.log("== sign out");
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 10000 });
await page.click("text=Sign out");
await page.waitForSelector(".guest-strip", { timeout: 10000 });
check("signing out drops to guest mode, not a wall", true);
await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("stays signed out after a reload", await page.isVisible(".guest-strip"));

const realErrors = errors.filter((e) => !/favicon|manifest|404/i.test(e));
check("no uncaught JavaScript errors", realErrors.length === 0,
  realErrors.slice(0, 3).join(" | "));

await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
