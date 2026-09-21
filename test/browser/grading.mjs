// The grading rules: the grade is always yours; later reviews run first.
//
// Run with `make e2e`, which expects:
//   - the backend on :1637          (make server-dev)
//   - the app on :4173              (make build, then make serve-dist)
//
// Three acts. The first encounter grades from the moment the drill opens,
// revealing the solution included. A later MANUAL reopen is practice and
// grades after a run, every loop. The scheduled study queue is the same: a
// run is required, and after it every grade stays on offer whatever the
// harness said and whatever was revealed.
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


// A browser with no stored preferences meets the first-run language picker
// before the study screen exists, and with nothing queued the picker hands off
// to the queue screen -- nothing is scheduled that was not put there. These
// suites are about what comes after both, so answer the picker with everything
// selected and queue one topic across every language: enough for a sitting,
// which is the state they were written against.
const answerPickerIfShown = async () => {
  await page.waitForSelector(".study-screen, .picker-screen, .queue-screen",
    { timeout: 20000 });
  if (await page.isVisible(".picker-screen")) {
    for (const n of [1, 2, 3, 4, 5]) {
      await page.click(`.picker-option:nth-child(${n})`);
      await page.waitForTimeout(120);
    }
    await page.click(".picker-start");
    // Wait for the handoff to actually render. `isVisible` on an element the
    // app has not drawn yet answers false, and the seeding below would be
    // skipped -- leaving the suite waiting for a study screen that is still
    // behind the queue.
    await page.waitForSelector(".study-screen, .queue-screen", { timeout: 20000 });
  }
  if (await page.isVisible(".queue-screen")) {
    await page.click('.queue-group:has(.queue-group-title:has-text("Arrays & Hashing")) .queue-group-add');
    await page.waitForTimeout(600);
    await page.click(".queue-header .link-button");
  }
  await page.waitForSelector(".study-screen", { timeout: 20000 });
};

/// A drill opens on its prompt page; the editor page is behind Enter.
const startCoding = async () => {
  await page.waitForSelector(".read-sheet", { timeout: 20000 });
  await page.click(".read-start");
  await page.waitForSelector(".run-bar", { timeout: 20000 });
  await page.evaluate(() => document.activeElement?.blur());
};

await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click("text=Save it to an account");
await page.waitForSelector(".auth-card");
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', "correct-horse-battery");
await page.click(".auth-submit");
await page.waitForSelector(".study-screen", { timeout: 20000 });

console.log("== first encounter: grading is free");
await page.click(".study-start");
await startCoding();
check("all four buttons from the moment the drill opens",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));

await page.keyboard.press("s");
await page.waitForTimeout(400);
check("revealing the solution does not collapse a first encounter",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await page.keyboard.press("s");
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
await answerPickerIfShown();
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
await startCoding();

check("a later review requires a run before grading",
  (await page.textContent(".grade-hint").catch(() => "")).includes("Run the tests"));

await runTests();
check("a failed manual run still offers every grade",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));

await typeSolution("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await runTests();
check("a passing manual run offers all four",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));

await page.keyboard.press("s");
await page.waitForTimeout(400);
check("revealing on a manual review keeps the choice",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await page.keyboard.press("s");
await page.waitForTimeout(400);

await page.click(".grade-good");
await page.waitForTimeout(2000);
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
const counts = await page.$$eval(".study-count-value", (n) => n.map((e) => e.textContent));
check("both reviews were recorded", counts[2] === "2", `reviews done = ${counts[2]}`);

console.log("== Elixir runs on the server for a signed-in user");
// No browser compiles Elixir; the API does, in a sandboxed subprocess, and
// the app grades the answer exactly as it grades a worker's.
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await page.click('.pane-item:text-is("Elixir")');
await page.waitForTimeout(300);
await page.click('.pane-item:text-is("Arrays & Hashing")');
await page.waitForTimeout(300);
await page.click('.pane-item:text-is("Contains Duplicate")');
await page.waitForTimeout(300);
await page.click("#startDrill");
await startCoding();
check("the Elixir starter is a module of todo stubs",
  (await page.$eval("gleam-editor", (el) => el.doc)).includes('raise "todo"'));
check("an Elixir first encounter grades freely before any run",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await runTests();
check("running the stub is a crash, reported as one",
  (await page.textContent(".results-summary")).includes("crashed"));
await typeSolution("defmodule Solution do\n  def contains_duplicate?(nums) do\n    IO.puts(\"checking\")\n    MapSet.size(MapSet.new(nums)) != length(nums)\n  end\nend\n");
await runTests();
check("a correct Elixir solution passes every case on the server",
  (await page.$$(".case.pass")).length === 4 && (await page.$$(".case.fail")).length === 0,
  `${(await page.$$(".case.pass")).length} passed`);
check("what the attempt printed comes back with it",
  (await page.textContent(".output-pane")).includes("checking"));
// A scratch run goes to the server the same way, through the same
// throttle: the code alone, its output back, no cases.
await typeSolution("IO.puts(\"scratch on the server\")\n\ndefmodule Solution do\n  def contains_duplicate?(_nums), do: false\nend\n");
await page.click(".scratch-button");
await page.waitForFunction(() => {
  const s = document.querySelector(".results-summary");
  return s && !s.classList.contains("running");
}, { timeout: 60000 });
check("a scratch run on the server reports it ran",
  (await page.textContent(".results-summary")).includes("Ran"),
  await page.textContent(".results-summary"));
check("and brings back what it printed, with no cases",
  (await page.textContent(".output-pane")).includes("scratch on the server") && (await page.$$(".case")).length === 0);
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });

console.log("== the study queue never takes a grade away");
// Sign out to guest and seed one card due in the past, so Study now serves a
// LATER review through the scheduled path.
await page.click("text=Sign out");
await page.waitForSelector(".guest-strip", { timeout: 10000 });
await page.evaluate(() => {
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  localStorage.setItem("gleamDrill.guest.cards.v1", JSON.stringify([{
    category: "NeetCode 150", subcategory: "Arrays & Hashing",
    title: "Contains Duplicate",
    state: 2, step: null, stability: 30, difficulty: 5,
    due: longAgo + 86400, lastReview: longAgo, introducedAt: longAgo,
    reps: 1, lapses: 0, suspended: false,
  }]));
});
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await page.waitForSelector(".study-screen", { timeout: 15000 });
await page.click(".study-start");
await startCoding();
await runTests();
check("a failed run in the study queue still offers every grade",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await typeSolution("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await runTests();
check("a passing study run offers every grade",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await page.keyboard.press("s");
await page.waitForTimeout(400);
check("revealing in the study queue keeps every grade",
  JSON.stringify(await labels()) === ALL_FOUR, JSON.stringify(await labels()));
await page.evaluate(() => localStorage.clear());

check("no uncaught JavaScript errors", errors.length === 0, errors.slice(0, 2).join(" | "));
await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
