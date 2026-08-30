// The grading rules: free on the first encounter, honest ever after.
//
// Run with `make e2e`, which expects:
//   - the backend on :1637          (make server-dev)
//   - the app on :4173              (make build, then make serve-dist)
//
// Three acts. The first encounter grades freely — all four buttons from the
// moment the drill opens, revealing the solution included. A later MANUAL
// reopen is practice and also grades freely (failed run and reveal included),
// every loop. The honesty rule lives in the scheduled study queue alone:
// there a failed run or reveal still forces a lone Again.
import { chromium } from "playwright-core";

const APP = process.env.APP ?? "http://localhost:4173";
const EMAIL = `pass-${Math.floor(Math.random() * 1e9)}@example.com`;
let pass = 0, fail = 0;
const check = (n, ok, d = "") => ok
  ? (pass++, console.log(`  ok   ${n}`))
  : (fail++, console.log(`  FAIL ${n}${d ? ": " + d : ""}`));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("dialog", (d) => d.accept());

const labels = async () =>
  await page.$$eval(".grade-button .grade-label", (n) => n.map((e) => e.textContent));
const ALL_FOUR = '["Again","Hard","Good","Easy"]';

const runTests = async () => {
  await page.waitForFunction(
    () => { const b = document.querySelector(".run-button"); return b && !b.disabled; },
    { timeout: 120000 },
  );
  await page.click(".run-button");
  // The "Compiling and running…" transient renders as a results summary too,
  // so wait for a summary that is a verdict, not the spinner.
  await page.waitForFunction(() => {
    const s = document.querySelector(".results-summary");
    return s && !s.classList.contains("running");
  }, { timeout: 90000 });
  await page.waitForTimeout(400);
};

/// Sets the editor's content through the custom element's own interface —
/// property in, "editor-change" event out — exactly as Lustre drives it.
/// Typing through the keyboard stacks CodeMirror's auto-indent on top of the
/// typed indentation, which turns any multi-line body into an
/// IndentationError.
const typeSolution = async (code) => {
  await page.waitForSelector("gleam-editor", { timeout: 20000 });
  await page.$eval("gleam-editor", (el, value) => {
    el.doc = value;
    el.dispatchEvent(
      new CustomEvent("editor-change", { detail: { value }, bubbles: true }),
    );
  }, code);
  await page.waitForTimeout(150);
};


await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click("text=Create account");
await page.waitForSelector(".auth-card");
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', "correct-horse-battery");
await page.click(".auth-submit");
await page.waitForSelector(".study-screen", { timeout: 20000 });

console.log("== first encounter: grading is free");
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 20000 });
check("all four buttons from the moment the drill opens",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));

await page.click(".solution-button");
await page.waitForTimeout(400);
check("revealing the solution does not collapse a first encounter",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await page.click(".solution-button");
await page.waitForTimeout(400);

await runTests();
check("a failed first run still grades freely",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));

await typeSolution("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await runTests();
const intervals = await page.$$eval(".grade-interval", (n) => n.map((e) => e.textContent));
console.log(`  (intervals: ${intervals.join(" / ")})`);
const seconds = (label) => {
  const m = (label ?? "").match(/^(\d+)(mo|m|h|d)$/);
  if (!m) return NaN;
  return { m: 60, h: 3600, d: 86400, mo: 2592000 }[m[2]] * Number(m[1]);
};
check("each grade carries an interval", intervals.every((i) => /\d/.test(i)));
check("Easy schedules no sooner than Good",
  seconds(intervals[3]) >= seconds(intervals[2]), intervals.join(" / "));
check("Good schedules no sooner than Hard",
  seconds(intervals[2]) >= seconds(intervals[1]), intervals.join(" / "));
await page.click(".grade-good");
await page.waitForTimeout(2000);

console.log("== second review, manual reopen: practice grades freely");
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await page.click('.pane-item:text-is("Python")');
await page.waitForTimeout(300);
await page.click('.pane-item:text-is("Arrays & Hashing")');
await page.waitForTimeout(300);
await page.click('.pane-item:text-is("Contains Duplicate")');
await page.waitForTimeout(300);
await page.click("#startDrill");
await page.waitForSelector(".run-bar", { timeout: 20000 });

check("a later review requires a run before grading",
  (await page.textContent(".grade-hint").catch(() => "")).includes("Run the tests"));

await runTests();
check("a failed manual run still offers every grade",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));

await typeSolution("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await runTests();
check("a passing manual run offers all four",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));

await page.click(".solution-button");
await page.waitForTimeout(400);
check("revealing on a manual review keeps the choice",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await page.click(".solution-button");
await page.waitForTimeout(400);

await page.click(".grade-good");
await page.waitForTimeout(2000);
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 15000 });
const counts = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("both reviews were recorded", counts[2] === "2", `reviews done = ${counts[2]}`);

console.log("== the study queue keeps the honesty rule");
// Sign out to guest and seed one card due in the past, so Study now serves a
// LATER review through the scheduled path (the only place coercion applies).
await page.click("text=Sign out");
await page.waitForSelector(".guest-strip", { timeout: 10000 });
await page.evaluate(() => {
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  localStorage.setItem("algoDrill.guest.cards.v1", JSON.stringify([{
    category: "NeetCode 150", subcategory: "Arrays & Hashing",
    title: "Contains Duplicate",
    state: 2, step: null, stability: 30, difficulty: 5,
    due: longAgo + 86400, lastReview: longAgo, introducedAt: longAgo,
    reps: 1, lapses: 0, suspended: false,
  }]));
});
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 20000 });
await runTests();
check("a failed run in the study queue forces Again",
  JSON.stringify(await labels()) === '["Again"]', JSON.stringify(await labels()));
await typeSolution("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await runTests();
check("a passing study run restores the choice",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await page.click(".solution-button");
await page.waitForTimeout(400);
check("revealing in the study queue collapses to Again",
  JSON.stringify(await labels()) === '["Again"]', JSON.stringify(await labels()));
await page.evaluate(() => localStorage.clear());

check("no uncaught JavaScript errors", errors.length === 0, errors.slice(0, 2).join(" | "));
await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
