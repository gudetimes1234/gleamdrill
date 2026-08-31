// Guest mode: real spaced repetition with no account, and the upgrade to one.
//
// Run with `make e2e`, which expects:
//   - the backend on :1637          (make server-dev)
//   - the app on :4173              (make build, then make serve-dist)
//
// The load-bearing check here is the last one: that a guest's card arrives on
// the server with the *same* stability and due date it had locally. Guest and
// account share one scheduler module precisely so that upgrading is not a
// reset, and nothing but a browser can prove the whole path.
import { chromium } from "playwright-core";

const APP = process.env.APP ?? "http://localhost:4173";
let pass = 0, fail = 0;
const check = (n, ok, d = "") => ok
  ? (pass++, console.log(`  ok   ${n}`))
  : (fail++, console.log(`  FAIL ${n}${d ? ": " + d : ""}`));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

// Run whatever is on screen and take whichever grade it offers. Used where
// the point is that a review gets recorded, not whether it passed -- the queue
// serves a different problem each time, so a hardcoded solution would only fit
// the first one.
const runAndGrade = async () => {
  await page.waitForFunction(
    () => { const b = document.querySelector(".run-button"); return b && !b.disabled; },
    { timeout: 120000 },
  );
  await page.click(".run-button");
  await page.waitForSelector(".grade-bar", { timeout: 60000 });
  const good = await page.$(".grade-good");
  await (good ?? await page.$(".grade-again")).click();
  await page.waitForTimeout(1500);
};

const solve = async () => {
  // Catalogue order puts Python's Contains Duplicate first.
  await page.waitForSelector(".cm-content", { timeout: 20000 });
  await page.click(".cm-content");
  await page.keyboard.press("Control+a");
  await page.keyboard.type("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
  await page.waitForFunction(
    () => { const b = document.querySelector(".run-button"); return b && !b.disabled; },
    { timeout: 120000 },
  );
  await page.click(".run-button");
  await page.waitForSelector(".grade-bar", { timeout: 60000 });
};

console.log("== no account required");
// A browser with no stored preferences meets the first-run language picker
// before the study screen exists. These suites are about what comes after it,
// so answer it with everything selected -- the state they were written against.
const answerPickerIfShown = async () => {
  await page.waitForSelector(".study-screen, .picker-screen", { timeout: 20000 });
  if (await page.isVisible(".picker-screen")) {
    for (const n of [1, 2, 3, 4, 5]) {
      await page.click(`.picker-option:nth-child(${n})`);
      await page.waitForTimeout(120);
    }
    await page.click(".picker-start");
    await page.waitForSelector(".study-screen", { timeout: 20000 });
  }
};

await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
check("lands on the study screen, not a sign-in wall", true);
check("says where the data lives",
  (await page.textContent(".guest-strip-text")).includes("only in this browser"));
check("offers a way to sign in", await page.isVisible("text=Create account"));
const counts = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
// The default new-card budget. Deliberately small: a card here is a problem
// typed from memory, so a flashcard-sized limit is a workload nobody clears.
check("new cards are available to a guest", counts[1] === "5", `got ${counts[1]}`);

console.log("== a guest can reach the form and come back");
await page.click("text=Sign in");
await page.waitForSelector(".auth-card", { timeout: 10000 });
check("the sign-in form is reachable", true);
await page.click("text=Keep studying without an account");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("and is not a trap", await page.isVisible(".guest-strip"));

console.log("== real scheduling, with no server");
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 20000 });
await solve();
const labels = await page.$$eval(".grade-button", (n) =>
  n.map((e) => e.querySelector(".grade-label").textContent));
check("a guest gets the full grading choice",
  JSON.stringify(labels) === '["Again","Hard","Good","Easy"]',
  JSON.stringify(labels));
const intervals = await page.$$eval(".grade-interval", (n) => n.map((e) => e.textContent));
console.log(`  (intervals: ${intervals.join(" / ")})`);
check("with real intervals", intervals[3] === "6d", intervals.join("/"));

await page.click(".grade-good");
await page.waitForTimeout(1200);
check("grading advances", await page.isVisible(".run-bar"));

console.log("== progress survives a reload");
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
const after = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("the review is still counted", after[2] === "1", `got ${after[2]}`);
check("the new-card budget went down", after[1] === "4", `got ${after[1]}`);
const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("algoDrill.guest.cards.v1") ?? "[]"));
check("exactly one card was stored", stored.length === 1, `got ${stored.length}`);
check("with the scheduling it earned",
  stored[0].stability === 2.3065 && stored[0].state === 1,
  JSON.stringify(stored[0]?.stability));
const guestStability = stored[0].stability;
const guestDue = stored[0].due;

console.log("== stats come from local data");
await page.click("text=Stats");
await page.waitForSelector(".stats-tiles", { timeout: 10000 });
const tiles = await page.$$eval(".stats-tile-value", (n) => n.map((e) => e.textContent));
// Tile order: fluent count (hero), problems started, streak, retention.
check("streak is 1 day", tiles[2] === "1", `got ${tiles[2]}`);
check("the problem is counted as started", tiles[1] === "1", `got ${tiles[1]}`);
check("heatmap renders", (await page.$$(".heatmap-cell")).length > 100);
await page.click("text=Back");
await page.waitForSelector(".study-screen");

console.log("== the prompt escalates with stake, not on review one");
check("no prompt yet at one card", !(await page.isVisible(".upgrade-prompt")));
// Seed nine more cards so the next answer crosses the threshold. Faster than
// drilling ten, and the threshold is what is under test, not the drilling.
//
// They are dated into the past deliberately: introducing nine cards *today*
// would exhaust the daily new-card budget and correctly disable "Study now",
// which is the app working, not a bug.
await page.evaluate(() => {
  const cards = JSON.parse(localStorage.getItem("algoDrill.guest.cards.v1") ?? "[]");
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  for (let i = 0; i < 9; i++) {
    cards.push({
      ...cards[0],
      title: `Filler ${i}`,
      subcategory: "Arrays & Hashing",
      category: "NeetCode 150 · Python",
      state: 2, step: null, stability: 30, difficulty: 5,
      due: Math.floor(Date.now() / 1000) + 20 * 86400,
      lastReview: longAgo,
      introducedAt: longAgo,
    });
  }
  localStorage.setItem("algoDrill.guest.cards.v1", JSON.stringify(cards));
});
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 20000 });
await runAndGrade();
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
check("the prompt appears once there is something to lose",
  await page.isVisible(".upgrade-prompt"));
check("and names the actual number",
  /\d+ cards scheduled/.test(await page.textContent(".upgrade-prompt-title")),
  await page.textContent(".upgrade-prompt-title").catch(() => ""));

console.log("== upgrading keeps the schedule");
const EMAIL = `guest-${Math.floor(Math.random() * 1e9)}@example.com`;
await page.click(".upgrade-prompt-cta");
await page.waitForSelector(".auth-card", { timeout: 10000 });
check("creating an account is pre-selected",
  (await page.textContent(".auth-submit")).includes("Create account"));
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', "correct-horse-battery");
await page.click(".auth-submit");
await page.waitForSelector(".study-screen", { timeout: 20000 });
await page.waitForTimeout(2500);

check("signed in", (await page.textContent(".study-email")) === EMAIL);
check("the guest strip is gone", !(await page.isVisible(".guest-strip")));
const local = await page.evaluate(() =>
  localStorage.getItem("algoDrill.guest.cards.v1"));
check("the local copy was cleared", local === null || JSON.parse(local).length === 0,
  String(local).slice(0, 40));

// The decisive check: the server holds the card the guest actually earned.
const onServer = await page.evaluate(async (token) => {
  const r = await fetch("http://127.0.0.1:1637/api/state", {
    headers: { authorization: "Bearer " + token },
  });
  return (await r.json()).cards;
}, await page.evaluate(() => localStorage.getItem("algoDrill.token")));

const migrated = onServer.find((c) => c.title === "Contains Duplicate");
check("the card reached the server", migrated !== undefined,
  `${onServer.length} cards on server`);
check("with the same stability the guest had",
  migrated?.stability === guestStability,
  `${migrated?.stability} vs ${guestStability}`);
check("and the same due date",
  Math.abs((migrated?.due ?? 0) - guestDue) < 1,
  `${migrated?.due} vs ${guestDue}`);
// Two problems were actually drilled, plus the nine seeded ones.
check("every guest card came across", onServer.length === 11, `got ${onServer.length}`);

console.log("== signing out returns to guest, empty");
await page.click("text=Sign out");
await page.waitForSelector(".study-screen", { timeout: 15000 });
check("back in guest mode", await page.isVisible(".guest-strip"));
const afterOut = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("with no leftover progress", afterOut[2] === "0", `reviews done = ${afterOut[2]}`);

console.log("== a full store is said out loud");
// The one failure mode that matters most to a guest: a write that quietly
// does nothing would leave them believing their progress was safe.
const filled = await page.evaluate(() => {
  // Fill with decreasing chunk sizes: Chromium refuses a 512KB write while
  // still accepting a few hundred bytes, so a single chunk size leaves enough
  // headroom for the app's own write to succeed and prove nothing.
  for (const size of [512 * 1024, 64 * 1024, 4 * 1024, 256, 16]) {
    const chunk = "x".repeat(size);
    for (let i = 0; ; i++) {
      try {
        localStorage.setItem(`filler_${size}_${i}`, chunk);
      } catch {
        break;
      }
    }
  }
  try {
    localStorage.setItem("probe", "x".repeat(200));
    localStorage.removeItem("probe");
    return false; // still room; the check below would prove nothing
  } catch {
    return true;
  }
});
check("localStorage could be filled for the test", filled);

if (filled) {
  await page.click(".study-start");
  await page.waitForSelector(".run-bar", { timeout: 20000 });
  await runAndGrade();
  await page.waitForSelector(".storage-warning", { timeout: 10000 })
    .then(() => check("a failed write raises a warning", true))
    .catch(() => check("a failed write raises a warning", false, "no .storage-warning"));
  check("and the warning cannot be dismissed away",
    (await page.$$(".storage-warning .notice-dismiss")).length === 0);
  check("the quiet guest strip yields to it",
    !(await page.isVisible(".guest-strip")));
}

check("no uncaught JavaScript errors", errors.length === 0, errors.slice(0, 3).join(" | "));
await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
