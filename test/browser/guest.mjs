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
// A browser with no stored preferences meets the track switcher before any
// study screen exists: Study, Queue and Stats are all inside a track. These
// suites are about what comes after that, so enter the Python track and queue
// one topic -- enough for a sitting, which is the state they were written
// against.
const answerPickerIfShown = async () => {
  await page.waitForSelector(".study-screen, .tracks-screen, .queue-screen",
    { timeout: 20000 });
  if (await page.isVisible(".tracks-screen")) {
    await page.locator(".track-card", { hasText: "Python" }).first()
      .locator(".track-card-open").click();
    // Wait for the handoff to actually render. `isVisible` on an element the
    // app has not drawn yet answers false, and the seeding below would be
    // skipped -- leaving the suite waiting for a study screen that is still
    // behind the queue.
    await page.waitForSelector(".study-screen, .queue-screen", { timeout: 20000 });
  }
  if (await page.isVisible(".study-screen")
      && await page.isVisible(".study-starter")) {
    await page.click(".study-secondary");
    await page.waitForSelector(".queue-screen", { timeout: 20000 });
  }
  if (await page.isVisible(".queue-screen")) {
    await page.click('.queue-group:has(.queue-group-title:has-text("Arrays & Hashing")) .queue-group-add');
    await page.waitForTimeout(600);
    // Named, not positional: the nav gained a Tracks link at the front,
    // and ".link-button" would take that one instead.
    await page.click('.queue-header .nav-link:text-is("Study")');
  }
  await page.waitForSelector(".study-screen", { timeout: 20000 });
};

/// A drill opens with the prompt beside the editor and nothing focused.
const startCoding = async () => {
  await page.waitForSelector(".run-bar", { timeout: 20000 });
  await page.evaluate(() => document.activeElement?.blur());
};

await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
check("lands on the study screen, not a sign-in wall", true);
check("says where the data lives",
  (await page.textContent(".guest-strip-text")).includes("only in this browser"));
check("offers a way to sign in", await page.isVisible("text=Save it to an account"));
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
await startCoding();
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
check("grading advances to the next problem, prompt beside the editor", await page.isVisible(".prompt-side"));

console.log("== progress survives a reload");
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
const after = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("the review is still counted", after[2] === "1", `got ${after[2]}`);
check("the new-card budget went down", after[1] === "4", `got ${after[1]}`);
const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]"));
// Queued cards are stored too, so "one card" is now "one *answered* card":
// every other row is a placeholder waiting for its first outing.
const answered = stored.filter((c) => c.reps > 0);
check("exactly one card was answered", answered.length === 1, `got ${answered.length}`);
check("and the rest are queued, unanswered",
  stored.length > 1 && stored.every((c) => c.reps > 0 || c.stability === null),
  `${stored.length} stored`);
check("with the scheduling it earned",
  answered[0].stability === 2.3065 && answered[0].state === 1,
  JSON.stringify(answered[0]?.stability));
const guestStability = answered[0].stability;
const guestDue = answered[0].due;

console.log("== stats come from local data");
await page.click("text=Stats");
await page.waitForSelector(".stats-tiles", { timeout: 10000 });
const tiles = await page.$$eval(".stats-tile-value", (n) => n.map((e) => e.textContent));
// Tile order: fluent count (hero), problems started, streak, retention.
check("streak is 1 day", tiles[2] === "1", `got ${tiles[2]}`);
check("the problem is counted as started", tiles[1] === "1", `got ${tiles[1]}`);
check("heatmap renders", (await page.$$(".heatmap-cell")).length > 100);
await page.click('.nav-link:text-is("Study")');
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
  const cards = JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]");
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  for (let i = 0; i < 9; i++) {
    cards.push({
      ...cards[0],
      title: `Filler ${i}`,
      subcategory: "Arrays & Hashing",
      category: "NeetCode 150",
      state: 2, step: null, stability: 30, difficulty: 5,
      due: Math.floor(Date.now() / 1000) + 20 * 86400,
      lastReview: longAgo,
      introducedAt: longAgo,
      // Explicit: a card with no reviews is a *new* card now, not a scheduled
      // one, and spreading `cards[0]` could copy a queued-but-unanswered zero.
      reps: 1, lapses: 0, suspended: false,
    });
  }
  localStorage.setItem("gleamDrill.guest.cards.v1", JSON.stringify(cards));
});
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click(".study-start");
await startCoding();
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
// Counted before signing up: the upgrade clears local storage, and the check
// below needs to know how much was there to carry.
await page.evaluate(() => {
  window.__guestCardCount =
    JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]").length;
  // A named queue rides up with the cards. Seeded straight into the store:
  // this suite is about the upgrade, not the queue screen.
  const first = JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1"))[0];
  localStorage.setItem("gleamDrill.guest.queues.v1", JSON.stringify({
    queues: [{ name: "Carried", problems: [{ category: first.category, subcategory: first.subcategory, title: first.title }] }],
  }));
});
const EMAIL = `guest-${Math.floor(Math.random() * 1e9)}@example.com`;
await page.click(".upgrade-prompt-cta");
await page.waitForSelector(".auth-card", { timeout: 10000 });
check("creating an account is pre-selected",
  (await page.textContent(".auth-submit")).includes("Create account"));
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', "correct-horse-battery");
await page.click(".auth-submit");
await page.waitForSelector(".study-screen", { timeout: 20000 });
await page.waitForFunction(() =>
  document.querySelector(".study-email")?.textContent.includes("@") && !document.querySelector(".sync-bar"),
  { timeout: 25000 });

check("signed in", (await page.textContent(".study-email")) === EMAIL);
check("the guest strip is gone", !(await page.isVisible(".guest-strip")));
const local = await page.evaluate(() =>
  localStorage.getItem("gleamDrill.guest.cards.v1"));
check("the local copy was cleared", local === null || JSON.parse(local).length === 0,
  String(local).slice(0, 40));
check("and so was the local queue",
  (await page.evaluate(() => localStorage.getItem("gleamDrill.guest.queues.v1"))) === null);

// The decisive check: the server holds the card the guest actually earned.
const onServer = await page.evaluate(async (token) => {
  const r = await fetch("http://127.0.0.1:1637/api/state", {
    headers: { authorization: "Bearer " + token },
  });
  return (await r.json()).cards;
}, await page.evaluate(() => localStorage.getItem("gleamDrill.token")));
const queuesOnServer = await page.evaluate(async (token) => {
  const r = await fetch("http://127.0.0.1:1637/api/queues", {
    headers: { authorization: "Bearer " + token },
  });
  return (await r.json()).queues;
}, await page.evaluate(() => localStorage.getItem("gleamDrill.token")));
check("the named queue went up with the cards",
  queuesOnServer.length === 1 && queuesOnServer[0].name === "Carried" && queuesOnServer[0].problems.length === 1,
  JSON.stringify(queuesOnServer));

// Matched on category as well as title: the same problem exists once per
// language, and queueing a topic brings all of those copies along, so a
// title-only match can find a queued-but-unanswered twin instead of the card
// that was actually drilled.
const migrated = onServer.find((c) =>
  c.title === "Contains Duplicate" && c.category === "NeetCode 150");
check("the card reached the server", migrated !== undefined,
  `${onServer.length} cards on server`);
check("with the same stability the guest had",
  migrated?.stability === guestStability,
  `${migrated?.stability} vs ${guestStability}`);
check("and the same due date",
  Math.abs((migrated?.due ?? 0) - guestDue) < 1,
  `${migrated?.due} vs ${guestDue}`);
// Everything the guest held, queued cards included: the upgrade must carry
// the whole queue, not just the problems that happened to be answered.
const guestCards = await page.evaluate(() => window.__guestCardCount);
check("every guest card came across", onServer.length === guestCards,
  `${onServer.length} on server vs ${guestCards} local`);

console.log("== signing out returns to guest, empty");
await page.click("text=Sign out");
await page.waitForSelector(".study-screen", { timeout: 15000 });
check("back in guest mode", await page.isVisible(".guest-strip"));
const afterOut = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("with no leftover progress", afterOut[2] === "0", `reviews done = ${afterOut[2]}`);

// Signing out left an empty guest store, and nothing is scheduled until it is
// queued -- so the storage-full act below, which needs a drill to run, has to
// put something in the queue first. Before filling storage, obviously: a queue
// write into a full store is the very failure being staged.
await page.click('.study-account .link-button:text-is("Queue")');
await page.waitForSelector(".queue-screen", { timeout: 10000 });
await page.click('.queue-group:has(.queue-group-title:has-text("Arrays & Hashing")) .queue-group-add');
await page.waitForTimeout(600);
// Named, not positional: the nav gained a Tracks link at the front.
await page.click('.queue-header .nav-link:text-is("Study")');
await page.waitForSelector(".study-screen", { timeout: 10000 });

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
  await startCoding();
  await runAndGrade();
  await page.waitForSelector(".storage-warning", { timeout: 10000 })
    .then(() => check("a failed write raises a warning", true))
    .catch(() => check("a failed write raises a warning", false, "no .storage-warning"));
  check("and the warning cannot be dismissed away",
    (await page.$$(".storage-warning .notice-dismiss")).length === 0);
  check("the quiet guest strip yields to it",
    !(await page.isVisible(".guest-strip")));
}

// --- tracks -----------------------------------------------------------------
//
// Two things the guest store has to get right now that a browser holds more
// than one track: it has to adopt what the previous release wrote, and it has
// to stay whole while one track is being studied. The second is the dangerous
// one -- every save serialises the entire store, so a track-scoped *load*
// would mean one debounced draft write deleting every other track's cards.
console.log("== tracks");

const readKey = (key) => page.evaluate((key) => {
  const raw = localStorage.getItem(key);
  return raw === null ? null : JSON.parse(raw);
}, key);

await page.goto(APP, { waitUntil: "networkidle" });
// Exactly the shape the release before tracks wrote: one flat settings blob,
// one set of rollups, cards in two tracks, and a log that knows which is which.
await page.evaluate(() => {
  localStorage.clear();
  const now = Math.floor(Date.now() / 1000);
  const longAgo = now - 3 * 86400;
  localStorage.setItem("gleamDrill.prefs.v1",
    JSON.stringify({ editorKeymap: "default", languagesChosen: true }));
  localStorage.setItem("gleamDrill.guest.settings.v1", JSON.stringify({
    parameters: [0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001,
      1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629, 1.6483, 0.6014, 1.8729,
      0.5425, 0.0912, 0.0658, 0.1542],
    desiredRetention: 0.87, learningSteps: [1, 10], relearningSteps: [10],
    maximumInterval: 36500, enableFuzz: true, newPerDay: 7, reviewsPerDay: 120,
    dayStartHour: 3, timezone: "Europe/Lisbon", reminderHour: 9,
  }));
  // The first is due, so a sitting has something to serve; the second is not,
  // so it can only be touched by a write that reaches across tracks.
  const card = (category, title, due) => ({
    category, subcategory: "Arrays & Hashing", title,
    state: 2, step: null, stability: 12, difficulty: 5,
    due, lastReview: longAgo, introducedAt: longAgo,
    reps: 2, lapses: 0, suspended: false,
  });
  localStorage.setItem("gleamDrill.guest.cards.v1", JSON.stringify([
    card("NeetCode 150", "Contains Duplicate", now - 60),
    card("NeetCode 150 (Go)", "Two Sum", now + 86400),
  ]));
  const row = (category, title, at) => ({
    category, subcategory: "Arrays & Hashing", title, at,
    rating: 3, durationMs: 60000, revealed: false, autoFailed: false,
    stateBefore: 2, scheduledDays: 3, stabilityAfter: 12, recall: false,
  });
  localStorage.setItem("gleamDrill.guest.reviews.v1", JSON.stringify([
    row("NeetCode 150 (Go)", "Two Sum", longAgo + 120),
    row("NeetCode 150", "Contains Duplicate", longAgo + 60),
    row("NeetCode 150", "Contains Duplicate", longAgo),
  ]));
  localStorage.setItem("gleamDrill.guest.history.v1", JSON.stringify({
    totalReviews: 3, matureReviews: 3, matureCorrect: 3,
    days: [{ day: Math.floor(longAgo / 86400), total: 3, correct: 3 }],
  }));
});
await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 20000 });

const settings2 = await readKey("gleamDrill.guest.settings.v2");
check("the pre-tracks settings are adopted on first boot", settings2 !== null);
check("the account's half carries over whole",
  settings2?.account.timezone === "Europe/Lisbon"
    && settings2?.account.dayStartHour === 3
    && settings2?.account.reminderHour === 9,
  JSON.stringify(settings2?.account));
check("and the scheduler's half lands on every track with cards",
  Object.keys(settings2?.tracks ?? {}).sort().join("|")
    === "NeetCode 150|NeetCode 150 (Go)",
  JSON.stringify(Object.keys(settings2?.tracks ?? {})));
check("keeping the numbers the guest actually had",
  settings2?.tracks["NeetCode 150"].newPerDay === 7
    && settings2?.tracks["NeetCode 150 (Go)"].reviewsPerDay === 120);

// The rollups are rebuilt by replaying the log, which names a track per row.
// Written once, at boot: the log is a ring, so re-deriving it later would
// yield smaller numbers as old reviews fall off the end.
const history2 = await readKey("gleamDrill.guest.history.v2");
check("the rollups are split across the tracks the log names",
  Object.keys(history2 ?? {}).sort().join("|")
    === "NeetCode 150|NeetCode 150 (Go)",
  JSON.stringify(Object.keys(history2 ?? {})));
check("each track keeping its own reviews",
  history2?.["NeetCode 150"].totalReviews === 2
    && history2?.["NeetCode 150 (Go)"].totalReviews === 1,
  JSON.stringify(history2));
check("and v1 is left where it was, so a rollback still finds it",
  (await readKey("gleamDrill.guest.settings.v1")) !== null
    && (await readKey("gleamDrill.guest.history.v1")) !== null);
check("no card or review was touched by any of it",
  (await readKey("gleamDrill.guest.cards.v1")).length === 2
    && (await readKey("gleamDrill.guest.reviews.v1")).length === 3);

// Now the invariant. Study one track; the other's cards must survive every
// write a sitting makes.
const tracksHeld = () => page.evaluate(() => {
  const all = JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]");
  const by = {};
  for (const c of all) by[c.category] = (by[c.category] ?? 0) + 1;
  return Object.entries(by).sort().map(([k, v]) => `${k}=${v}`).join(",");
});
const bothTracks = await tracksHeld();
await page.click(".study-start");
await startCoding();
await page.keyboard.press("i");
// A comment: the point is that a draft write happens, and the harness still
// has to run afterwards.
await page.keyboard.type("# drafted\n");
await page.waitForTimeout(1200);
check("a draft write leaves the other track's cards alone",
  (await tracksHeld()) === bothTracks, await tracksHeld());
await page.evaluate(() => document.activeElement?.blur());
await runAndGrade();
await page.waitForTimeout(1200);
check("and so does a graded review", (await tracksHeld()) === bothTracks,
  await tracksHeld());

check("no uncaught JavaScript errors", errors.length === 0, errors.slice(0, 3).join(" | "));
await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
