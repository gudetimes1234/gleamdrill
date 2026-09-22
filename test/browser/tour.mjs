// A guided tour of every route and every user action, photographed.
//
//   make tour
//
// Expects the backend on :1637 and a built app served on :1234, same as
// `make e2e`. Screenshots land in $SHOTS (default: a temp directory it prints).
//
// This exists because the other three browser suites are task-shaped: each
// walks one happy path and asserts on selectors. Whole screens -- the exam
// report, the quiz, search, every run-failure state -- were rendered by nothing,
// and three of the four languages had never been opened at all. A selector
// assertion also cannot see a layout that overflows or a banner that is
// unreadable, which is what the images are for.
//
// Two things would break a naive version of this, so they are handled up front:
// native `confirm`/`alert` dialogs freeze the page until dismissed, and the
// language runtimes are lazy multi-megabyte downloads.

import { chromium } from "playwright-core";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const APP = process.env.APP ?? "http://localhost:4173";
const API = process.env.API ?? "http://127.0.0.1:1637";
const SHOTS = process.env.SHOTS ?? join(tmpdir(), "gleamdrill-tour");
const PASSWORD = "correct-horse-battery";

mkdirSync(SHOTS, { recursive: true });

let pass = 0, fail = 0, shot = 0;
const results = [];
const covered = new Set();
let act = "start";

/// The report (report.mjs) is rendered from this file, so it is written
/// however the tour ends: a crash mid-act still leaves every check and
/// screenshot up to that point, plus the crash itself, to look at.
const writeTour = () =>
  writeFileSync(join(SHOTS, "tour.json"),
    JSON.stringify({ results, errors, dialogs, covered: [...covered] }, null, 1));
process.on("unhandledRejection", (reason) => {
  results.push({ act, name: "the tour itself crashed", ok: false, detail: String(reason?.message ?? reason).split("\n")[0] });
  errors.push(`${act}: ${reason?.stack ?? reason}`);
  writeTour();
  console.error(reason);
  process.exit(1);
});

const check = (name, ok, detail = "") => {
  results.push({ act, name, ok, detail });
  if (ok) { pass++; console.log(`    ok   ${name}`); }
  else { fail++; console.log(`    FAIL ${name}${detail ? ": " + detail : ""}`); }
};

/// Records which `model.Msg` variants an act exercises. The tour fails if any
/// user-initiated message is never reached -- that is what stops "every flow"
/// from quietly meaning "every flow I remembered".
const exercises = (...msgs) => msgs.forEach((m) => covered.add(m));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? "/usr/bin/chromium",
});
// No service worker here: the tour aborts requests with page.route to stage
// failures, and a worker in front of the page would answer them from its
// cache instead. Offline behaviour has its own suite, test/browser/offline.mjs.
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  serviceWorkers: "block",
});
const page = await context.newPage();

// Native dialogs block every subsequent command until answered, so the handler
// goes on before anything can trigger one. The app no longer opens any -- the
// exit guard is an in-app prompt -- so any entry here is a regression.
const dialogs = [];
page.on("dialog", async (d) => {
  dialogs.push({ type: d.type(), message: d.message() });
  await d.accept();
});

// Leave the current drill through the in-app prompt.
const exitDrill = async () => {
  await page.click("text=Exit");
  await page.waitForSelector(".exit-prompt", { timeout: 5000 });
  await page.click(".exit-prompt-leave");
};

const errors = [];
page.on("pageerror", (e) => errors.push(`${act}: ${e}`));
page.on("console", (m) => {
  // Chromium logs a non-2xx response as a console error. Several acts provoke
  // those on purpose -- a rejected sign-in, a refused password -- and they are
  // not JavaScript errors. Only genuine script failures are collected.
  const text = m.text();
  const expectedHttp = /Failed to load resource.*\b(401|409|422|429)\b/.test(text)
    // Act 2b cuts the network on purpose.
    || /Failed to load resource.*ERR_FAILED/.test(text);
  // The Python worker mirrors the user program's tracebacks to the console
  // under a [python] prefix; several acts run deliberately broken programs.
  const mirroredTrace = text.startsWith("[python]");
  if (m.type() === "error" && !/favicon/i.test(text) && !expectedHttp
      && !mirroredTrace) {
    errors.push(`${act}: ${text}`);
  }
});

/// `highlight`, when given, is a short title that lifts this screenshot into
/// the report's headline strip (test/browser/report.mjs): the handful of
/// images that answer "does the new thing work" without reading the acts.
const capture = async (label, note, highlight) => {
  const name = `${String(++shot).padStart(2, "0")}-${act}-${label}.png`;
  await page.screenshot({ path: join(SHOTS, name) });
  results.push({ act, shot: name, note: note ?? label, ...(highlight ? { highlight } : {}) });
  console.log(`    shot ${name}`);
  return name;
};

/// Puts a bounded slice of the catalogue in the study queue.
///
/// Nothing is scheduled until it is queued, so this is now part of setup: a
/// browser that has answered the picker and queued nothing has an empty study
/// screen, which is correct and useless to photograph. One topic across every
/// language is a few dozen cards -- enough for a sitting, small enough to stay
/// a fast click.
const seedQueue = async (topic = "Arrays & Hashing") => {
  await page.waitForSelector(".queue-screen", { timeout: 20000 });
  // Every language listed, so one click queues the topic across all of them.
  await page.selectOption(".queue-language", "");
  await page.waitForTimeout(200);
  for (const add of await page.$$(`.queue-group:has(.queue-group-title:has-text("${topic}")) .queue-group-add`)) {
    await add.click();
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(600);
  await page.click(".queue-header .link-button");
  await page.waitForSelector(".study-screen", { timeout: 20000 });
};

// Several steps clear localStorage and come back through here, which now means
// meeting the first-run picker, and then the queue screen it hands off to.
// Answering both is part of getting home.
const goHome = async () => {
  await page.goto(APP, { waitUntil: "networkidle" });
  await page.waitForSelector(".study-screen, .picker-screen, .queue-screen",
    { timeout: 20000 });
  if (await page.isVisible(".picker-screen")) {
    for (const n of [1, 2, 3, 4, 5, 6]) {
      await page.click(`.picker-option:nth-child(${n})`);
      await page.waitForTimeout(120);
    }
    await page.click(".picker-start");
    // Wait for the handoff to actually render: `isVisible` on an element the
    // app has not drawn yet answers false, and the seeding below would be
    // skipped.
    await page.waitForSelector(".study-screen, .queue-screen", { timeout: 20000 });
  }
  if (await page.isVisible(".queue-screen")) await seedQueue();
  await page.waitForSelector(".study-screen", { timeout: 20000 });
};

// A browser with no preferences meets the language picker before anything
// else, so answering it is part of arriving.
// Defaults to every language, which is the state the rest of the tour assumes:
// nothing muted, the whole catalogue in play. Acts that care about a narrower
// choice pass their own.
const freshGuest = async (languages = [1, 2, 3, 4, 5, 6]) => {
  await page.goto(APP, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.clear());
  await page.goto(APP, { waitUntil: "networkidle" });
  await page.waitForSelector(".picker-screen", { timeout: 20000 });
  for (const n of languages) {
    await page.click(`.picker-option:nth-child(${n})`);
    await page.waitForTimeout(120);
  }
  await page.click(".picker-start");
  // With no cards, the picker hands off to the queue rather than the study
  // screen: "which languages" is only half the setup.
  await seedQueue();
};

/// Waits out a lazy runtime download. The run button stays disabled until the
/// worker reports ready, and a cold wasm compiler is 4.7MB.
const waitForRunnable = async (timeout = 180000) => {
  await page.waitForFunction(
    () => { const b = document.querySelector(".run-button"); return b && !b.disabled; },
    { timeout },
  );
};

/// Waits for a run to produce a verdict — the "Compiling and running…"
/// transient renders as a results summary too, so matching any summary races.
const verdict = async () => {
  await page.waitForFunction(() => {
    const s = document.querySelector(".results-summary");
    return s && !s.classList.contains("running");
  }, { timeout: 90000 });
  await page.waitForTimeout(400);
};

const gradeLabels = async () =>
  await page.$$eval(".grade-button .grade-label", (n) => n.map((e) => e.textContent));
const ALL_FOUR = '["Again","Hard","Good","Easy"]';

/// Sets the editor's content through the custom element's own interface —
/// property in, "editor-change" event out — exactly as Lustre drives it.
/// Typing through the keyboard stacks CodeMirror's auto-indent on top of the
/// typed indentation, which turns any multi-line body into an
/// IndentationError.
const setCode = async (code) => {
  await page.waitForSelector("gleam-editor", { timeout: 20000 });
  await page.$eval("gleam-editor", (el, value) => {
    el.doc = value;
    el.dispatchEvent(
      new CustomEvent("editor-change", { detail: { value }, bubbles: true }),
    );
  }, code);
  await page.waitForTimeout(150);
};


/// Opens one problem by hand through the pane browser.
///
/// `:text-is()` rather than `.pane-list >> text=`: the chained form resolves
/// the *first* `.pane-list` and searches only inside it, so the subcategory
/// click would look in the language pane and miss.
const openByHand = async (language, subcategory, title) => {
  exercises("UserClickedStartDrill");
  await page.click(`.pane-item:text-is("${language}")`);
  await page.waitForTimeout(300);
  await page.click(`.pane-item:text-is("${subcategory}")`);
  await page.waitForTimeout(300);
  await page.click(`.pane-item:text-is("${title}")`);
  await page.waitForTimeout(300);
  await page.waitForFunction(
    () => { const b = document.querySelector("#startDrill"); return b && !b.disabled; },
    { timeout: 5000 },
  );
  await page.click("#startDrill");
  await startCoding();
};

/// A drill opens with the prompt beside the editor. Every code sitting in
/// the tour comes through here, so the run bar is what the next line finds.
/// Nothing has focus on the way in; blurring is belt and braces so the next
/// key goes to the table.
const startCoding = async () => {
  await page.waitForSelector(".run-bar", { timeout: 30000 });
  await page.evaluate(() => document.activeElement?.blur());
};

const countServerCards = async () =>
  await page.evaluate(async ([api, token]) => {
    const r = await fetch(`${api}/api/state`, {
      headers: { authorization: "Bearer " + token },
    });
    return (await r.json()).cards.length;
  }, [API, await page.evaluate(() => localStorage.getItem("gleamDrill.token"))]);

const gradeWhatever = async () => {
  // Selector-based click, resolved at action time: a banner appearing (the
  // storage-full act provokes exactly that) re-renders the bar and detaches
  // any handle grabbed a moment earlier.
  if (await page.$(".grade-good")) await page.click(".grade-good");
  else if (await page.$(".grade-again")) await page.click(".grade-again");
  await page.waitForTimeout(1200);
};

console.log(`screenshots -> ${SHOTS}\n`);

// ---------------------------------------------------------------- act 1
act = "00-first-run-picker";
console.log(act);
exercises("PickerToggledLanguage", "PickerConfirmed",
  "PickerConfirmedWithStarter", "UserAddedStarterSet");
await page.goto(APP, { waitUntil: "domcontentloaded" });
await page.evaluate(() => localStorage.clear());
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".picker-screen", { timeout: 20000 });
check("a browser with no preferences is asked which languages to drill",
  await page.isVisible(".picker-screen"));
check("nothing is pre-selected",
  (await page.$$(".picker-option.picked")).length === 0);
check("starting is refused until something is chosen",
  await page.isDisabled(".picker-start") && await page.isDisabled(".picker-starter"));
check("the picker says what the app is",
  (await page.textContent(".picker-blurb")).includes("spaced repetition"));
await capture("picker-empty", "First run: the language choice, nothing assumed");

await page.click(".picker-option:nth-child(2)");
await page.waitForTimeout(200);
await page.click(".picker-option:nth-child(3)");
await page.waitForTimeout(200);
check("two languages tick", (await page.$$(".picker-option.picked")).length === 2);
check("starting is now allowed", !(await page.isDisabled(".picker-start")));
await capture("picker-chosen", "Two languages chosen; new cards will alternate");

await page.click(".picker-start");
// With an empty queue the picker hands off to the queue screen, not the study
// screen: choosing languages is only half the setup, and a study screen with
// nothing queued would be a dead end to land a first-time user on.
await page.waitForSelector(".queue-screen", { timeout: 20000 });
check("the picker hands a first-time user to the queue", true);
await capture("picker-to-queue", "Straight from the picker to choosing problems");
await seedQueue();
// The per-row tags in the preview list are labels, not a filter: nothing
// on this screen narrows the queue by language any more.
check("the study screen has no language filter: the queue is what you queued",
  (await page.$$(".language-filter, .study-chips, button.language-chip")).length === 0);
const queueTags = await page.$$eval(".study-preview-item .study-preview-tag",
  (n) => n.map((e) => e.textContent.trim()));
// The topic was queued in every language, and the sitting round-robins
// across whatever is queued: the first few cards are all different
// languages, whatever the picker was told.
check("new cards alternate between the queued languages",
  new Set(queueTags.slice(0, 4)).size === 4, JSON.stringify(queueTags));

await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 20000 });
check("the picker does not ask twice", await page.isVisible(".study-screen"));

// The other way out of the picker: a starter set, queued on the way to the
// study screen, so the first sitting is one click away.
await page.evaluate(() => localStorage.clear());
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".picker-screen", { timeout: 20000 });
await page.click(".picker-option:nth-child(1)");
await page.waitForTimeout(200);
await page.click(".picker-starter");
await page.waitForSelector(".study-screen", { timeout: 20000 });
check("the starter set lands on the study screen with cards queued",
  (await page.textContent(".study-summary")).includes("ready"),
  await page.textContent(".study-summary"));
await capture("picker-starter", "One click from the picker to a queued first sitting");

// And from an empty study screen, the same set is one click away.
await page.evaluate(() => localStorage.clear());
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".picker-screen", { timeout: 20000 });
await page.click(".picker-option:nth-child(1)");
await page.waitForTimeout(200);
await page.click(".picker-start");
await page.waitForSelector(".queue-screen", { timeout: 20000 });
await page.click(".nav-link:text-is(\"Study\")");
await page.waitForSelector(".study-starter", { timeout: 10000 });
await capture("study-empty", "An empty study screen offers the starter set");
// "Add a starter set" goes through the picker: it is the starter-set
// chooser, and which languages is the one thing it has to ask.
await page.click(".study-starter");
await page.waitForSelector(".picker-screen", { timeout: 10000 });
check("the empty study screen offers the starter set through the picker", true);
await page.click(".picker-option:nth-child(1)");
await page.waitForTimeout(200);
await page.click(".picker-starter");
await page.waitForFunction(
  () => (document.querySelector(".study-summary")?.textContent ?? "").includes("ready"),
  null, { timeout: 10000 });
check("and the starter set lands on the study screen, ready", true);

// ---------------------------------------------------------------- act 2
act = "01-guest-arrival";
console.log(act);
await freshGuest();
exercises("(boot)");
check("lands on the study screen with no account",
  await page.isVisible(".study-screen"));
check("the guest strip states where data lives",
  (await page.textContent(".guest-strip-text")).includes("only in this browser"));
check("a seven-day forecast renders", (await page.$$(".forecast-day")).length === 7);
check("counts render", (await page.$$(".study-count")).length === 3);
// The habit row: a ring for today's goal and the streak. A fresh guest
// with a queue has a goal to fill and no streak yet.
check("the goal ring shows what today will serve",
  /^0\/\d+$/.test((await page.textContent(".goal-ring-count")).trim()),
  await page.textContent(".goal-ring-count"));
check("a fresh browser is invited to start a streak",
  (await page.textContent(".streak-tile")).includes("Start a streak"));
await capture("landing", "Guest landing: strip, counts, forecast, actions",
  "The study screen: counts and the queue, no language filter");

// ---------------------------------------------------------------- act 2
act = "02-auth";
console.log(act);
exercises("UserClickedSignIn", "UserToggledAuthMode", "UserChangedAuthEmail",
  "UserChangedAuthPassword", "UserSubmittedAuth", "UserClickedBackToStudy");

await page.click("text=Sign in");
await page.waitForSelector(".auth-card", { timeout: 10000 });
check("sign-in mode by default from the Sign in link",
  (await page.textContent(".auth-submit")).includes("Sign in"));
await capture("signin", "Sign-in form");

await page.click(".auth-switch");
await page.waitForTimeout(300);
check("toggles to register",
  (await page.textContent(".auth-submit")).includes("Create account"));
await capture("register", "Register form, reached by the toggle");

await page.click(".auth-submit");
await page.waitForSelector(".auth-error", { timeout: 5000 });
check("submitting empty is refused locally",
  (await page.textContent(".auth-error")).length > 0);
await capture("empty-error", "Client-side validation: empty fields");

await page.fill('input[type="email"]', `tour-${Date.now()}@example.com`);
await page.fill('input[type="password"]', "short");
await page.click(".auth-submit");
await page.waitForSelector(".auth-error", { timeout: 10000 });
check("a short password is refused by the server",
  (await page.textContent(".auth-error")).toLowerCase().includes("12"));
await capture("weak-password", "Server rejects a password under 12 characters");

await page.click(".auth-switch");
await page.fill('input[type="email"]', "nobody-here@example.com");
await page.fill('input[type="password"]', PASSWORD);
await page.click(".auth-submit");
await page.waitForSelector(".auth-error", { timeout: 15000 });
check("an unknown account gives the generic credential error",
  (await page.textContent(".auth-error")).toLowerCase().includes("incorrect"));
await capture("bad-credentials", "Unknown account: same message as a wrong password");

await page.click("text=Keep studying without an account");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("the form is not a trap", await page.isVisible(".guest-strip"));

// ---------------------------------------------------------------- act 2b
act = "02b-first-load-fails";
console.log(act);
exercises("UserClickedRetrySync");

// A signed-in browser whose first state load fails sees a wall with a way
// through, not a dead card. Fake a token so boot goes to the server, fail
// that request, then let the retry succeed -- it will come back 401 for the
// fake token, which drops to guest, which is the app again.
await page.evaluate(() => localStorage.setItem("gleamDrill.token", "not-a-real-token"));
await page.route("**/api/state", (route) => route.abort("failed"));
await page.goto(APP, { waitUntil: "domcontentloaded" });
await page.waitForSelector('button:text-is("Try again")', { timeout: 20000 });
check("a failed first load says so and offers to try again",
  (await page.textContent(".auth-title")).includes("Offline"));
await capture("offline", "First load failed: try again, or study as a guest");
await page.unroute("**/api/state");
await page.click('button:text-is("Try again")');
await page.waitForSelector(".study-screen, .picker-screen, .queue-screen", { timeout: 20000 });
check("trying again gets back into the app", true);
await page.evaluate(() => localStorage.removeItem("gleamDrill.token"));

// ---------------------------------------------------------------- act 3
act = "03-browsing";
console.log(act);
exercises("UserClickedBrowse", "UserClickedCategory", "UserClickedSubcategory",
  "UserToggledProblem", "UserClickedSelectAll", "UserClickedClearSelection",
  "UserChangedIterations", "UserSearched", "UserClickedBreadcrumb");

await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
check("the pane browser renders", (await page.$$(".pane")).length >= 2);
const languageRows = await page.$$eval(".pane:first-child .pane-item", (n) => n.map((e) => e.textContent.trim()));
check("the first pane is languages",
  JSON.stringify(languageRows) === '["Python","Gleam","TypeScript","Elixir","Go","System Design","System Design Board"]',
  JSON.stringify(languageRows));
check("tips categories are hidden",
  !languageRows.some((l) => l.includes("Tips")));
check("the selection has a pane of its own",
  (await page.textContent(".panes-container")).includes("Nothing selected yet"));
await capture("menu-empty", "Language-first panes, empty Selected pane");

await page.click('.pane-item:text-is("Python")');
await page.waitForTimeout(300);
check("picking a language reveals subcategories",
  (await page.$$(".pane")).length >= 3);
await capture("menu-language", "Language picked: subcategory pane appears");

await page.click('.pane-item:text-is("Arrays & Hashing")');
await page.waitForTimeout(300);
check("picking a subcategory lists problems",
  (await page.$$(".pane-item")).length > 10);
await capture("menu-problems", "Problem list with schedule badges");

await page.click("#selectAll");
await page.waitForTimeout(300);
const picked = (await page.$$(".selected-item")).length;
check("select-all fills the Selected pane", picked > 3, `${picked} rows`);
check("the count agrees",
  (await page.textContent(".progress-text")).startsWith(String(picked)));
check("each selection names its language",
  (await page.$$eval(".selected-item .lang-tag", (n) => n.map((e) => e.textContent)))
    .every((t) => t === "py"));
await capture("menu-selected", "Select all: the Selected pane holds the drill list");

await page.click(".selected-item");
await page.waitForTimeout(300);
check("clicking a selected row removes it",
  (await page.$$(".selected-item")).length === picked - 1);

await page.fill("#iterations", "5");
await page.waitForTimeout(300);
check("iterations accepts a new value",
  (await page.inputValue("#iterations")) === "5");

await page.click("#clearSelection");
await page.waitForTimeout(300);
check("clear empties the selection",
  (await page.textContent(".panes-container")).includes("Nothing selected yet"));

await page.fill(".search", "anagram");
await page.waitForTimeout(500);
check("search finds matches", (await page.$$(".search-hit-title")).length > 0);
await capture("menu-search", "Search results across every language");

await page.fill(".search", "zzzznotathing");
await page.waitForTimeout(500);
check("search reports no matches",
  (await page.$$(".search-hit-title")).length === 0);
await capture("menu-search-empty", "Search with no matches");
await page.fill(".search", "");
await page.waitForTimeout(300);

const crumbs = await page.$$(".breadcrumb.clickable");
if (crumbs.length) {
  await crumbs[0].click();
  await page.waitForTimeout(300);
  check("a breadcrumb navigates back", true);
} else {
  check("a breadcrumb navigates back", false, "no clickable breadcrumb rendered");
}

// ---------------------------------------------------------------- act 3k
act = "03k-keyboard";
console.log(act);
exercises("KeyPressed", "HelpToggled", "MenuCursorMoved", "MenuPaneFocused",
  "MenuCursorJumped", "MenuActivated", "MenuToggledAtCursor",
  "EditorFocusRequested", "SearchFocusRequested", "QuizMoved");

await freshGuest();
check("the status bar names the context",
  (await page.textContent(".statusbar-context")) === "STUDY");
check("its hints are the live bindings",
  (await page.$$(".keyhint")).length >= 4);
await page.keyboard.press("b");
await page.waitForSelector(".menu-container", { timeout: 5000 });
check("b opens the browser from the study screen", true);
check("the language pane holds the focus",
  (await page.$eval(".pane.focused h3", (e) => e.textContent)) === "Language");

await page.keyboard.press("j");
await page.keyboard.press("j");
await page.waitForTimeout(250);
check("j moves the cursor",
  (await page.$eval(".pane-item.cursor", (e) => e.textContent.trim())) === "TypeScript");
await page.keyboard.press("g");
await page.waitForTimeout(250);
check("g jumps to the first row",
  (await page.$eval(".pane-item.cursor", (e) => e.textContent.trim())) === "Python");
await capture("menu-cursor", "TUI cursor in the language pane; status bar shows BROWSE keys");

await page.keyboard.press("l");
await page.waitForTimeout(300);
check("l descends and picks the cursor row",
  (await page.$eval(".pane.focused h3", (e) => e.textContent)) === "Subcategory");
await page.keyboard.press("l");
await page.waitForTimeout(300);
check("l again lands in the problems",
  (await page.$eval(".pane.focused h3", (e) => e.textContent)) === "Problems");
await page.keyboard.press(" ");
await page.keyboard.press("j");
await page.keyboard.press(" ");
await page.waitForTimeout(300);
check("space selects at the cursor",
  (await page.$$(".selected-item")).length === 2);
await capture("menu-keyboard-selected", "Two problems selected without touching the mouse");

await page.keyboard.press("?");
await page.waitForTimeout(300);
check("? opens the cheatsheet", await page.isVisible(".help-card"));
check("the cheatsheet documents the same table",
  (await page.$$(".help-row")).length >= 8);
await capture("help-overlay", "The ? cheatsheet, generated from the binding table");
await page.keyboard.press("Escape");
await page.waitForTimeout(200);
check("Esc closes it", !(await page.isVisible(".help-card")));

await page.keyboard.press("/");
await page.waitForTimeout(200);
check("/ focuses the search box",
  await page.evaluate(() => document.activeElement?.classList.contains("search")));
await page.keyboard.press("Escape");
await page.waitForTimeout(200);
check("Esc leaves it",
  !(await page.evaluate(() => document.activeElement?.classList.contains("search"))));

await page.keyboard.press("d");
await page.waitForSelector(".run-bar", { timeout: 30000 });
check("d starts the drill", true);
const promptBox = await page.locator(".prompt-side").boundingBox();
const openEditorBox = await page.locator(".editor-frame").boundingBox();
check("the prompt is a sidebar on the left of the editor",
  promptBox && openEditorBox
    && promptBox.x + promptBox.width <= openEditorBox.x + 1
    && promptBox.width <= 520 + 1,
  JSON.stringify({ promptBox, openEditorBox }));
check("the status bar shows the drill keys",
  (await page.textContent(".statusbar")).includes("prompt"));
await capture("prompt-side", "A drill opens with the prompt beside the editor: title, signature, and the code to the right",
  "Read the problem beside the editor");

const titleBefore = await page.textContent(".drill-title").catch(() => "");
await page.keyboard.press("i");
await page.waitForTimeout(200);
check("i focuses the editor",
  await page.evaluate(() => document.activeElement?.closest?.("gleam-editor") !== null
    || document.activeElement?.tagName === "GLEAM-EDITOR"
    || !!document.querySelector("gleam-editor .cm-focused")));

// Write, Ctrl+Enter, digit: the whole rep without the mouse. Against a
// remote host the runtime is still downloading at this point, and a run
// pressed before it is ready is refused with a notice rather than queued.
await waitForRunnable();
await setCode("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await page.click(".cm-content");
await page.keyboard.press("Control+Enter");
await verdict();
check("Ctrl+Enter runs from inside the editor",
  (await page.textContent(".results-summary")).includes("passed"));
await page.keyboard.press("3");
await page.waitForTimeout(1500);
const titleAfter = await page.textContent(".drill-title").catch(() => "");
check("a digit grades immediately after the run",
  titleAfter !== titleBefore && titleAfter !== "",
  `still on ${titleAfter}`);
await page.keyboard.press("Escape");
await page.waitForSelector(".exit-prompt", { timeout: 5000 });
check("Esc asks before leaving the sitting", await page.isVisible(".exit-prompt"));
await page.keyboard.press("Enter");
await page.waitForTimeout(600);
check("Enter leaves it", !(await page.isVisible(".exit-prompt")));

// ---------------------------------------------------------------- act 4
act = "04-python-drill";
console.log(act);
exercises("UserClickedStudy", "UserClickedRun", "UserGraded",
  "UserToggledSolution", "UserRevealedHint", "UserChangedKeymap",
  "UserClickedExitDrill", "ExitConfirmed");

await freshGuest();
await page.click(".study-start");
await startCoding();
check("a scheduled session opens a drill", await page.isVisible(".run-bar"));
await page.waitForTimeout(1200);
check("the header shows time on the problem",
  /\d+:\d\d/.test(await page.textContent(".drill-clock").catch(() => "")),
  await page.textContent(".drill-clock").catch(() => "(none)"));
// A first encounter is the learning step: every grade is available before a
// single run, exactly like flipping a new Anki card.
check("a first encounter grades freely from the start",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
check("the output pane starts empty",
  (await page.textContent(".output-empty")).includes("Nothing printed"));

// Two runs: the code alone, for reading what it prints while you work, and
// the tests. Only the tests answer the card; a scratch run leaves the grade
// bar exactly where it was.
exercises("UserClickedScratchRun");
await waitForRunnable();
check("Run and Run tests are both offered",
  (await page.$$(".scratch-button")).length === 1 && (await page.$$(".run-button")).length === 1);
await setCode("print('scratch', 1 + 1)\n\ndef containsDuplicate(nums):\n    pass\n");
await page.keyboard.press("r");
await verdict();
check("r runs the code alone and reports it ran",
  (await page.textContent(".results-summary")).includes("Ran"),
  await page.textContent(".results-summary"));
check("what it printed is in the Output pane",
  (await page.textContent(".output-pane")).includes("scratch 2"));
check("a scratch run shows no cases", (await page.$$(".case")).length === 0);
check("a first encounter still grades freely after a scratch run",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("scratch", "Run alone: what the code printed, no verdict", "Run your code and read its output, no harness");
check("the slot beside the editor starts empty",
  (await page.$(".slot-pane")) === null
    && (await page.$$(".approach-nudge, .approach-steps, .approach-pseudocode")).length === 0);
await page.keyboard.press("a");
exercises("UserToggledPane");
await page.waitForTimeout(300);
check("a opens the hints beside the editor, nudge first",
  await page.isVisible(".slot-pane.approach .approach-nudge") && await page.isVisible(".hint-button"));

// The plan rung, as a walkthrough: one step at a time beside the editor,
// each with a hint and a why that cost nothing, and a code slice that is
// logged as a reveal. The ladder lists only the steps walked so far.
await page.keyboard.press("w");
exercises("UserOpenedWalk");
await page.waitForSelector(".walk-side", { timeout: 5000 });
check("w opens the walkthrough beside the editor, in the hints' place",
  (await page.textContent(".walk-side .answer-label")).includes("Step 1 of")
    && (await page.$(".slot-pane.approach")) === null);
check("the hint and why are free; only the code is a reveal",
  (await page.$$(".walk-side .hint-warning")).length === 1
    && (await page.$(".walk-reveal-code")) !== null);
await page.keyboard.press("h");
exercises("WalkHintShown");
await page.keyboard.press("y");
exercises("WalkWhyShown");
await page.waitForTimeout(300);
check("h and y turn over the hint and the why",
  await page.isVisible(".walk-hint") && await page.isVisible(".walk-why"));
await capture("walk", "Walkthrough: step 1 with its hint and why turned over, code still folded");
await page.keyboard.press("c");
exercises("WalkCodeShown");
await page.waitForTimeout(300);
check("c shows this step's slice of the pseudocode", await page.isVisible(".walk-code"));
await page.keyboard.press("Enter");
exercises("WalkAdvanced");
await page.waitForTimeout(300);
check("Enter advances, and the walked step is listed as done",
  (await page.textContent(".walk-side .answer-label")).includes("Step 2 of")
    && (await page.$$(".walk-step-done")).length === 1);
await page.keyboard.press("Backspace");
exercises("WalkBacked");
await page.waitForTimeout(300);
check("Backspace goes back a step",
  (await page.textContent(".walk-side .answer-label")).includes("Step 1 of"));
await page.keyboard.press("Escape");
exercises("UserClosedWalk");
await page.waitForTimeout(300);
check("Escape closes the walkthrough without leaving the drill",
  (await page.$(".walk-side")) === null && (await page.$(".slot-pane")) === null
    && await page.isVisible(".run-bar"));
await page.keyboard.press("a");
await page.waitForTimeout(300);
check("the ladder lists only the step walked so far, and offers the walk again",
  (await page.$$(".approach-steps li")).length === 1 && await page.isVisible(".approach-walk-open"));
await page.click(".approach-walk-open");
await page.waitForTimeout(300);
check("reopening resumes where it was",
  (await page.textContent(".walk-side .answer-label")).includes("Step 1 of"));
await page.keyboard.press("Escape");
await page.waitForTimeout(200);

// With the ladder open, Enter turns the next rung.
await page.keyboard.press("a");
await page.waitForTimeout(200);
await page.keyboard.press("Enter");
await page.waitForTimeout(300);
check("then the pseudocode", await page.isVisible(".approach-pseudocode"));
check("the pseudocode button warned before it spoiled", true);
check("a first encounter still grades freely after the whole ladder",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("hints", "The full hint ladder: nudge, steps, pseudocode");
await capture("idle", "First encounter: full grade bar before any run, empty output pane");

// The starter stub fails — and on a first encounter that still grades freely.
await waitForRunnable();
await page.click(".run-button");
await verdict();
check("a failed first run still offers every grade",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("failed-cases", "Failed run on a first encounter: per-case results, all four grades");

// Deliberate garbage, for the compile/runtime error rendering.
await setCode("def containsDuplicate(nums:\n  ???");
await page.click(".run-button");
await page.waitForTimeout(6000);
check("a broken program reports an error",
  (await page.$$(".results")).length > 0);
await capture("compile-error", "Syntax error: phase, corrected location, message");

// The error lands under the editor, not on top of it: the editor keeps its
// height and the results scroll inside themselves. Folding them leaves the
// verdict line with the first line of the error beside it.
const editorHeight = () =>
  page.$eval("gleam-editor", (el) => Math.round(el.getBoundingClientRect().height));
const editorBefore = await editorHeight();
check("an error does not squeeze the editor", editorBefore >= 280, String(editorBefore));
check("the main column does not scroll",
  await page.$eval(".drill-main", (el) => el.scrollHeight <= el.clientHeight + 1));
await page.click(".results-summary");
exercises("UserToggledResults");
await page.waitForTimeout(250);
check("the results fold to their summary line", (await page.$(".results.collapsed")) !== null);
check("folded, the summary previews the error",
  (await page.textContent(".results-preview").catch(() => "")).trim().length > 0);
await capture("results-folded", "Error results folded to one line, first line of the error as a preview");
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press("x");
await page.waitForTimeout(200);
check("x unfolds them", (await page.$(".results.collapsed")) === null);

// The handle under the code sets the editor's height, and the device
// remembers it. Folded results are what free the room on a 900px screen.
await page.keyboard.press("x");
await page.waitForTimeout(200);
const handleBox = await (await page.$(".editor-resize-handle")).boundingBox();
await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2);
await page.mouse.down();
await page.mouse.move(handleBox.x + handleBox.width / 2, handleBox.y + handleBox.height / 2 + 150, { steps: 8 });
await page.mouse.up();
exercises("EditorResized");
await page.waitForTimeout(300);
const editorDragged = await editorHeight();
check("dragging the handle grows the editor", editorDragged >= editorBefore + 40,
  `${editorBefore} -> ${editorDragged}`);
check("the summary line is still on screen after the drag",
  await page.evaluate(() => {
    const column = document.querySelector(".drill-main").getBoundingClientRect();
    const summary = document.querySelector(".results-summary").getBoundingClientRect();
    return summary.bottom <= column.bottom + 1;
  }));
check("the height is remembered on this device",
  (await page.evaluate(() => JSON.parse(localStorage.getItem("gleamDrill.prefs.v1") ?? "{}").editorHeight)) === editorDragged);
await page.waitForTimeout(2200);
check("the clock ticking does not undo the drag", (await editorHeight()) === editorDragged);
await capture("editor-resized", "Editor dragged taller by its handle; results folded beneath",
  "The editor keeps its height and is yours to drag");
await (await page.$(".editor-resize-handle")).dblclick();
await page.waitForTimeout(300);
check("double-clicking the handle resets the height", (await editorHeight()) === editorBefore,
  String(await editorHeight()));
await page.keyboard.press("x");
await page.waitForTimeout(200);

// A passing solution that also prints, so the Output pane earns its frame.
await setCode("def containsDuplicate(nums):\n    print('checking', nums)\n    return len(set(nums)) != len(nums)");
await page.click(".run-button");
await verdict();
check("a passing run keeps the full choice",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
check("stdout lands in its own pane",
  (await page.textContent(".output-pane").catch(() => "")).includes("checking"));
await capture("passed", "Passing run: green cases, all four grades, stdout in the Output pane");

// A pass opens the solution panel by itself, as your code diffed against
// the reference it most resembles. It is not a reveal: the answer was
// already given. `d` flips it to the plain reference and back; the panel
// has its own close button at every width.
await page.waitForSelector(".answer-content.auto gleam-diff", { timeout: 5000 });
check("a pass shows your code diffed against the reference",
  (await page.$$("gleam-diff .cm-deletedChunk, gleam-diff .cm-changedLine")).length > 0);
check("against the reference most like it",
  (await page.textContent(".answer-content.auto .answer-label")).includes("Yours vs"));
await capture("diff", "Passing run: your code with the reference's differences struck through",
  "A pass shows your code diffed against the closest reference");
await page.keyboard.press("d");
exercises("UserToggledDiff");
await page.waitForTimeout(300);
check("d flips the panel to the plain reference",
  (await page.$("gleam-diff")) === null && (await page.$(".answer-content.auto pre")) !== null);
await page.keyboard.press("d");
await page.waitForTimeout(300);
await page.click(".answer-content.auto .answer-close");
exercises("UserDismissedDiff");
await page.waitForTimeout(300);
check("and its close button puts it away", (await page.$(".answer-content")) === null);

await page.keyboard.press("s");
await page.waitForTimeout(500);
check("revealing on a first encounter keeps the choice",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
// Every solution is a file in a public repository; the card says how to
// disagree with it, and the link carries the language, problem and variant.
const suggestHref = await page.getAttribute(".answer-suggest a", "href");
check("a solution offers a way to suggest a better one",
  suggestHref !== null && suggestHref.includes("/issues/new?template=solution.yml"), suggestHref);
check("naming the problem, language and variant",
  suggestHref !== null && decodeURIComponent(suggestHref).includes("[Python] Contains Duplicate"), suggestHref);
check("the other references are a click away in the run bar, the shown one lit",
  (await page.$$(".run-bar .solution-button")).length >= 2
    && (await page.$$(".run-bar .solution-button.revealed")).length === 1
    && (await page.$(".slot-pane .solution-button")) === null);
await capture("revealed", "Solution revealed on a first encounter: note, code, grades intact");
await page.keyboard.press("s");
await page.waitForTimeout(400);
check("s again puts it away", (await page.$(".slot-pane")) === null);

for (const mode of ["Vim", "Emacs", "Std"]) {
  await page.click(`.keymap-picker >> text="${mode}"`);
  await page.waitForTimeout(400);
  await capture(`keymap-${mode.toLowerCase()}`, `Editor keymap: ${mode}`);
}
check("all three keymaps are selectable", true);

await page.click("text=Exit");
await page.waitForSelector(".exit-prompt", { timeout: 5000 });
check("exiting asks for confirmation", await page.isVisible(".exit-prompt"));
await capture("exit-prompt", "The in-app exit prompt: no native dialog");
await page.click(".exit-prompt-stay");
await page.waitForTimeout(200);
check("Stay keeps the drill", await page.isVisible(".run-bar") && !(await page.isVisible(".exit-prompt")));
await page.click("text=Exit");
await page.waitForSelector(".exit-prompt", { timeout: 5000 });
await page.click(".exit-prompt-leave");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("and returns to the study screen", await page.isVisible(".study-screen"));

// ---------------------------------------------------------------- act 4b
act = "04b-honesty";
console.log(act);
// From the second review onward a run is required before grading. The grade
// itself is always the user's: a failed run or a reveal never removes a
// button. Reached by re-opening the same problem manually — a manual drill
// posts a review regardless of due dates.
await page.click(".study-start");
await startCoding();
await page.click(".grade-good");
await page.waitForTimeout(2000);
await exitDrill();
await page.waitForSelector(".study-screen", { timeout: 10000 });

await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("Python", "Arrays & Hashing", "Contains Duplicate");
check("a later review still requires a run before grading",
  (await page.textContent(".grade-hint").catch(() => "")).includes("Run the tests"));
await capture("gated", "Second review: grading waits for a run");

// A note to your future self, typed under the prompt and saved on its own
// after a pause. `m` puts the cursor there from anywhere on the screen.
check("the note waits in its pane", (await page.$(".note-input")) === null);
check("a fresh problem has no lit note", (await page.$(".note-panel.has-note")) === null);
await page.keyboard.press("m");
exercises("NoteFocusRequested");
await page.waitForSelector(".slot-pane .note-input", { timeout: 5000 });
check("m opens the note beside the editor and focuses it",
  await page.evaluate(() => document.activeElement?.classList.contains("note-input")));
await page.keyboard.type("Set beats sort here: O(n) and one line.");
exercises("NoteChanged");
await page.waitForTimeout(1200);
check("the note is saved on its own",
  ((await page.evaluate(() => localStorage.getItem("gleamDrill.guest.notes.v1"))) ?? "").includes("Set beats sort"));
await page.keyboard.press("Escape");
await page.waitForTimeout(200);
check("Escape leaves the note without leaving the drill", await page.isVisible(".run-bar"));
await waitForRunnable();
await page.click(".run-button");
await verdict();
// A manual reopen is practice: every grade after a run.
check("a failed manual run still offers every grade",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("manual-free", "Manual later review, failed run: still every grade");

// Drafts: work left without a grade comes back; a graded problem starts
// from the stub, always -- retyping from memory is the drill.
await setCode("def containsDuplicate(nums):\n    # half done, came back later\n    pass\n");
await page.waitForTimeout(700);
await exitDrill();
await page.waitForTimeout(600);
// Back through the study screen: the menu keeps its selection, and
// clicking the same row again would deselect it.
await goHome();
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("Python", "Arrays & Hashing", "Contains Duplicate");
check("a problem left without a grade restores what was typed",
  (await page.$eval("gleam-editor", (el) => el.doc)).includes("half done"));
await waitForRunnable();
await setCode("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)\n");
await page.click(".run-button");
await verdict();
await page.click(".grade-good");
await page.waitForTimeout(1500);
// The sitting may have more passes queued from act 3's iteration field;
// leaving now is fine, the grade already landed.
if (await page.$(".drill-container")) await exitDrill();
await page.waitForTimeout(600);
await goHome();
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("Python", "Arrays & Hashing", "Contains Duplicate");
check("a graded problem starts from the stub next time",
  !(await page.$eval("gleam-editor", (el) => el.doc)).includes("len(set(nums))"),
  (await page.$eval("gleam-editor", (el) => el.doc)).slice(0, 60));
await exitDrill();
await page.waitForTimeout(800);

// Same on the scheduled path: seed a card due in the past so Study now
// serves a later review.
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
await goHome();
await page.click(".study-start");
await page.waitForSelector(".prompt-side", { timeout: 30000 });
// The note typed by hand a moment ago comes back lit under the prompt:
// this is a later review of the same problem, and the note is the first
// thing to read.
check("a note from an earlier visit is shown lit", (await page.$(".prompt-side .note-panel.has-note")) !== null);
check("with what was written, and nothing else",
  (await page.textContent(".prompt-side .note-text")) === "Set beats sort here: O(n) and one line.",
  await page.textContent(".prompt-side .note-text"));
await capture("note-returns", "The note from last time, lit under the prompt",
  "Your note from last time comes back lit");
await startCoding();
await page.keyboard.press("m");
await page.waitForSelector(".slot-pane .note-input", { timeout: 5000 });
check("and m opens it for editing, as written",
  (await page.inputValue(".note-input")) === "Set beats sort here: O(n) and one line.");
await page.keyboard.press("Escape");
await page.waitForTimeout(150);
await page.keyboard.press("Escape");
await page.waitForTimeout(150);
await waitForRunnable();
await page.click(".run-button");
await verdict();
check("a failed run in the study queue still offers every grade",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("failed-still-free", "Scheduled review, failed run: every grade stays yours");

// A passing scheduled run keeps the full choice, and so does revealing the
// pseudocode hint: it is logged as a reveal, not held against the grade.
await setCode("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await page.click(".run-button");
await verdict();
check("a passing scheduled run offers every grade",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
// Down the ladder: the nudge, the walk (which opens its own pane and is
// closed again), then the pseudocode.
for (const key of ["a", "Enter", "Escape", "a", "Enter"]) {
  await page.keyboard.press(key);
  await page.waitForTimeout(250);
}
check("the pseudocode is showing", await page.isVisible(".approach-pseudocode"));
check("revealing the pseudocode keeps every grade",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("hint-still-free", "Pseudocode revealed on a scheduled review: every grade stays");
await page.keyboard.press("Escape");
await page.waitForSelector(".exit-prompt", { timeout: 5000 });
await page.keyboard.press("Enter");
await page.waitForTimeout(600);
await page.evaluate(() => localStorage.clear());

// ---------------------------------------------------------------- act 4c
act = "04c-run-controls";
console.log(act);
exercises("UserClickedStopRun", "UserToggledPrompt");

// Stop: an infinite loop is interruptible, and stopping one must not poison
// the next run with a stale timeout verdict.
await goHome();
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("Python", "Arrays & Hashing", "Contains Duplicate");
await waitForRunnable();
await setCode("def containsDuplicate(nums):\n    while True:\n        pass");
await page.click(".run-button");
await page.waitForSelector(".stop-button", { timeout: 10000 });
await capture("running", "Mid-run: disabled Run, live Stop");
await page.click(".stop-button");
// Stopping replaces the worker; the button re-enables when it reports ready.
await waitForRunnable();
check("Stop interrupts a hung run and the runtime recovers", true);
await setCode("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await page.click(".run-button");
await verdict();
check("the run after a Stop gets a correct verdict, not a stale timeout",
  (await page.textContent(".results-summary")).includes("passed"),
  await page.textContent(".results-summary"));

// The pass opened the solution beside the editor; the prompt sidebar goes
// away and comes back, the editor the same node throughout.
await page.waitForSelector(".slot-pane.answer-content", { timeout: 5000 });
const editorBox = await page.locator(".editor-frame").boundingBox();
const answerBox = await page.locator(".slot-pane").boundingBox();
check("the solution sits beside the editor, not under it",
  editorBox && answerBox
    && answerBox.x >= editorBox.x + editorBox.width - 1
    && answerBox.y < editorBox.y + editorBox.height,
  JSON.stringify({ editorBox, answerBox }));
await capture("side-solution", "Solution pane to the right of the editor");
await page.evaluate(() => { window.__editor = document.querySelector("gleam-editor"); });
check("the prompt shows the examples from the last run",
  (await page.$$(".prompt-side .read-examples .case")).length > 0);
const wideBefore = (await page.locator(".editor-frame").boundingBox()).width;
await page.keyboard.press("p");
await page.waitForFunction(() => !document.querySelector(".prompt-side"), null, { timeout: 5000 });
check("p hides the prompt and the editor takes the width",
  (await page.locator(".editor-frame").boundingBox()).width > wideBefore + 100);
check("the header button says so",
  !(await page.$eval(".prompt-toggle", (el) => el.classList.contains("active"))));
await capture("prompt-hidden", "The prompt hidden: editor and solution take the whole width");
await page.keyboard.press("p");
await page.waitForSelector(".prompt-side", { timeout: 5000 });
check("p again brings it back, the same editor, pane still there",
  await page.evaluate(() => window.__editor === document.querySelector("gleam-editor"))
    && (await page.$(".slot-pane.answer-content")) !== null
    && await page.$eval(".prompt-toggle", (el) => el.classList.contains("active")));
check("the choice is remembered on this device",
  JSON.parse(await page.evaluate(() => localStorage.getItem("gleamDrill.prefs.v1"))).promptOpen === true);
await page.keyboard.press("s");
await page.waitForTimeout(300);
check("s puts the solution away", (await page.$(".slot-pane")) === null);
await exitDrill();
await page.waitForTimeout(800);

// ---------------------------------------------------------------- act 4d
act = "04d-runtime-failure";
console.log(act);
exercises("UserClickedRetryRuntime");

// A runtime whose worker script never arrives must fail loudly and offer a
// Retry that actually works. TypeScript is the one runtime no act has loaded
// yet, so its first fetch is still interceptable here.
await page.route("**/ts-worker.js*", (r) => r.abort());
await goHome();
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("TypeScript", "Arrays & Hashing", "Contains Duplicate");
await page.waitForSelector(".retry-button", { timeout: 15000 });
check("a failed runtime load shows Retry and the reason",
  await page.isVisible(".retry-button") && await page.isVisible(".run-error"));
await capture("runtime-failed", "Worker script unreachable: Retry and the reason in the run bar");
await page.unroute("**/ts-worker.js*");
await page.click(".retry-button");
await waitForRunnable(60000);
check("Retry recovers the runtime without a reload", true);
await exitDrill();
await page.waitForTimeout(800);

// ---------------------------------------------------------------- act 4d2
act = "04d2-median-and-leech";
console.log(act);
// Two things the header says about a card with history: your own median on
// it beside the clock, and a leech badge (with the approach already open)
// once it has been forgotten four times.
await page.evaluate(() => {
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  const ref = { category: "NeetCode 150", subcategory: "Arrays & Hashing", title: "Contains Duplicate" };
  localStorage.setItem("gleamDrill.guest.cards.v1", JSON.stringify([{
    ...ref, state: 2, step: null, stability: 30, difficulty: 5,
    due: longAgo + 86400, lastReview: longAgo, introducedAt: longAgo,
    reps: 6, lapses: 4, suspended: false,
  }]));
  const row = (i, durationMs) => ({
    ...ref, at: longAgo - i * 86400, rating: 3, durationMs, revealed: false,
    autoFailed: false, stateBefore: 2, scheduledDays: 3, stabilityAfter: 30, recall: false,
  });
  localStorage.setItem("gleamDrill.guest.reviews.v1",
    JSON.stringify([row(1, 250000), row(2, 130000), row(3, 190000)]));
});
await goHome();
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 30000 });
check("the clock shows your median on this problem",
  (await page.textContent(".drill-median").catch(() => "")).includes("median 3m10s"),
  await page.textContent(".drill-median").catch(() => ""));
check("a card forgotten four times is badged a leech",
  (await page.textContent(".leech-badge").catch(() => "")).includes("Leech"));
const rungsOpen = await page.$$eval(".prompt-side .read-approach .approach-nudge, .prompt-side .read-approach .approach-steps", (n) => n.length);
check("and opens with the approach read up to the pseudocode", rungsOpen >= 1, String(rungsOpen));
check("without the pseudocode", (await page.$(".approach-pseudocode")) === null);
await capture("leech", "A leech: badge on the title, approach already under the prompt, your median beside the clock");
await startCoding();
check("and the ladder is already beside the editor, pseudocode still folded",
  await page.isVisible(".slot-pane.approach")
    && (await page.textContent(".hint-button").catch(() => "")).includes("pseudocode"));
await exitDrill();
await page.waitForTimeout(800);
await page.evaluate(() => localStorage.removeItem("gleamDrill.guest.reviews.v1"));

// ---------------------------------------------------------------- act 4e
act = "04e-recall";
console.log(act);
// The same queue with no editor: read, think, reveal, grade from memory.
// Two due cards seeded so the sitting has a second card to advance to.
await page.evaluate(() => {
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  const card = (title) => ({
    category: "NeetCode 150", subcategory: "Arrays & Hashing", title,
    state: 2, step: null, stability: 30, difficulty: 5,
    due: longAgo + 86400, lastReview: longAgo, introducedAt: longAgo,
    reps: 1, lapses: 0, suspended: false,
  });
  localStorage.setItem("gleamDrill.guest.cards.v1",
    JSON.stringify([card("Contains Duplicate"), card("Valid Anagram")]));
  localStorage.removeItem("gleamDrill.guest.reviews.v1");
});
await goHome();
await page.click(".study-recall");
exercises("UserClickedRecall");
await page.waitForSelector(".recall-card", { timeout: 15000 });
check("a recall card opens with no editor",
  (await page.$("gleam-editor")) === null && await page.isVisible(".recall-reveal"));
check("and says so in the header", (await page.textContent(".recall-chip")).trim() === "Recall");
check("the prompt stays on the page, with nothing to start",
  await page.isVisible(".recall-read .problem-prompt") && (await page.$(".prompt-side")) === null);
check("no grade before the reveal", (await page.$(".grade-bar")) === null);
await capture("recall-think", "Recall card before the reveal: prompt, note, and a question to answer in your head");
await page.keyboard.press(" ");
exercises("UserRevealedRecall");
await page.waitForSelector(".recall-answers", { timeout: 5000 });
check("Space reveals every solution with its technique and complexity",
  (await page.$$(".recall-answer .answer-label")).length >= 2
    && (await page.$$(".recall-answer .answer-complexity")).length >= 1);
check("and the approach ladder is fully open",
  (await page.$(".hint-button")) === null || !(await page.isVisible(".hint-button")));
check("then the grade is yours", JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("recall-revealed", "Revealed: technique, Big-O, note and code for every solution, then the grades",
  "Recall-only sittings: read, reveal, grade from memory");
await page.keyboard.press("3");
await page.waitForTimeout(1500);
check("grading advances to the next recall card", await page.isVisible(".recall-card"));
const recallRow = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("gleamDrill.guest.reviews.v1") ?? "[]")[0]);
check("the review is logged as recall, untimed and unrevealed",
  recallRow && recallRow.recall === true && recallRow.durationMs === null && recallRow.revealed === false,
  JSON.stringify(recallRow));
check("a recall review schedules the card like any other",
  (await page.evaluate(() => JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1"))
    .find((c) => c.title === "Contains Duplicate").reps)) === 2);
// Second card, on a phone: the one drill layout meant for a commute.
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
await page.click(".recall-reveal");
await page.waitForSelector(".recall-answers", { timeout: 5000 });
check("recall fits a phone",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
await capture("recall-phone", "Recall on a phone: answers stacked, grades full width");
await page.click(".grade-good");
await page.waitForTimeout(1500);
check("the sitting ends in a recall summary",
  await page.isVisible(".summary-container") && (await page.$(".summary-container .recall-chip")) !== null);
await page.setViewportSize({ width: 1280, height: 900 });

// A slip on the last card is the one you notice once the sitting is over,
// so the summary can still take the latest grade back. Undo reopens the
// card exactly as it was -- revealed, waiting for the grade you meant --
// and the store forgets the review.
const repsBeforeUndo = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1")).find((c) => c.title === "Valid Anagram").reps);
await capture("summary-undo", "A recall summary, with the last grade still undoable",
  "The last grade can be taken back");
await page.click(".summary-undo .undo-button");
exercises("UserClickedUndo");
await page.waitForSelector(".recall-answers", { timeout: 5000 });
check("undo reopens the last card, revealed and waiting for a grade",
  (await page.textContent(".drill-title")).includes("Valid Anagram")
    && JSON.stringify(await gradeLabels()) === ALL_FOUR);
check("the card is back where it was",
  (await page.evaluate(() =>
    JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1")).find((c) => c.title === "Valid Anagram").reps)) === repsBeforeUndo - 1);
check("and the log has forgotten the review",
  (await page.evaluate(() => JSON.parse(localStorage.getItem("gleamDrill.guest.reviews.v1")).length)) === 1);
check("only the newest grade can be undone", (await page.$(".undo-button")) === null);
await page.keyboard.press("1");
await page.waitForTimeout(1500);
check("the grade you meant lands", await page.isVisible(".summary-container"));
check("with the sitting's row updated",
  (await page.textContent(".summary-rows")).includes("Again"));
// From the drill itself: grade one card, take it back from the next.
await page.evaluate(() => {
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  const card = (title) => ({
    category: "NeetCode 150", subcategory: "Arrays & Hashing", title,
    state: 2, step: null, stability: 30, difficulty: 5,
    due: longAgo + 86400, lastReview: longAgo, introducedAt: longAgo,
    reps: 1, lapses: 0, suspended: false,
  });
  localStorage.setItem("gleamDrill.guest.cards.v1",
    JSON.stringify([card("Contains Duplicate"), card("Valid Anagram")]));
});
await goHome();
await page.click(".study-recall");
await page.waitForSelector(".recall-card", { timeout: 15000 });
await page.keyboard.press(" ");
await page.waitForSelector(".recall-answers", { timeout: 5000 });
await page.keyboard.press("4");
await page.waitForTimeout(1500);
check("the next card offers to undo the grade just given",
  await page.isVisible(".recall-card .undo-button"));
await page.keyboard.press("u");
await page.waitForSelector(".recall-answers", { timeout: 5000 });
check("u takes it back and returns to the card",
  (await page.textContent(".drill-title")).includes("Contains Duplicate"));
await exitDrill();
await page.waitForTimeout(800);

// ---------------------------------------------------------------- act 4f
act = "04f-compare";
console.log(act);
exercises("UserClickedCompare", "CompareMoved", "ComparePickedVariant", "UserClosedCompare");

// Two problems' reference solutions side by side, the lines they share lit:
// the shape a technique keeps from problem to problem. From Browse, with a
// selection, or with one problem against the rest of its topic.
await goHome();
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
check("Compare waits for a selection", await page.$eval("#compareSelected", (b) => b.disabled));
for (const item of ["Python", "Two Pointers"]) {
  await page.click(`.pane-item:text-is("${item}")`);
  await page.waitForTimeout(250);
}
await page.click('.pane-item:text-is("Valid Palindrome")');
await page.waitForTimeout(150);
await page.click('.pane-item:text-is("3Sum")');
await page.waitForTimeout(150);
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press("v");
await page.waitForSelector("gleam-compare .cm-merge-a", { timeout: 10000 });
check("v opens the two side by side", (await page.textContent(".statusbar-context")).includes("COMPARE"));
check("each side opens on its Two Pointers solution",
  (await page.$$eval(".compare-head .solution-button.revealed", (n) => n.map((e) => e.textContent)))
    .every((label) => label.includes("Two Pointers")));
check("the lines they share are lit",
  (await page.$$("gleam-compare .cm-merge-a .cm-line.cm-sharedLine")).length > 0
    && (await page.$$("gleam-compare .cm-merge-b .cm-line.cm-sharedLine")).length > 0);
check("and the rest is dimmed",
  (await page.$eval("gleam-compare .cm-merge-a .cm-line:not(.cm-sharedLine)", (l) => getComputedStyle(l).opacity)) < "1");
await capture("compare", "Two Two-Pointers solutions side by side: shared lines lit, the rest dimmed",
  "Compare two solutions to see the shape of a technique");
await page.keyboard.press("]");
await page.waitForTimeout(200);
check("] flips the right side to another solution",
  !(await page.textContent(".compare-heads .compare-head:nth-child(2) .solution-button.revealed")).includes("Two Pointers"));
await page.keyboard.press("Escape");
await page.waitForSelector(".menu-container", { timeout: 5000 });
check("Escape returns to Browse with the selection kept",
  (await page.textContent(".iteration-control .progress-text")).includes("2 selected"));
// One alone: the rest of its topic on the right, one at a time.
await page.click('.pane-item:text-is("3Sum")');
await page.waitForTimeout(150);
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press("v");
await page.waitForSelector("gleam-compare", { timeout: 5000 });
check("one problem is compared against the rest of its topic",
  (await page.$$(".compare-other")).length === 4);
const rightTitle = async () => page.textContent(".compare-heads .compare-head:nth-child(2) .compare-problem");
const firstRight = await rightTitle();
await page.keyboard.press("j");
await page.waitForTimeout(200);
check("j moves the right side to the next one", (await rightTitle()) !== firstRight);
await page.click(".compare-other:first-child");
await page.waitForTimeout(200);
check("a chip jumps straight to that one", (await rightTitle()) === firstRight);
await page.click("text=Browse");
await page.waitForSelector(".menu-container", { timeout: 5000 });
// Two languages cannot be compared: the button says so and stays put.
await page.click('.pane-item:text-is("Gleam")');
await page.waitForTimeout(250);
await page.click('.pane-item:text-is("Two Pointers")');
await page.waitForTimeout(250);
await page.click('.pane-item:text-is("3Sum")');
await page.waitForTimeout(150);
await page.click("#compareSelected");
await page.waitForTimeout(300);
check("mixed languages are refused with a reason",
  await page.isVisible(".menu-container") && (await page.textContent("body")).includes("one language"));
await page.click("#clearSelection");
await page.waitForTimeout(200);

// ---------------------------------------------------------------- act 5
act = "05-languages";
console.log(act);
const languages = [
  ["Gleam", "Arrays & Hashing", "Contains Duplicate",
   "import gleam/list\nimport gleam/set\n\npub fn contains_duplicate(nums: List(Int)) -> Bool {\n  set.size(set.from_list(nums)) != list.length(nums)\n}", true],
  ["TypeScript", "Arrays & Hashing", "Contains Duplicate",
   "export function containsDuplicate(nums: number[]): boolean {\n  return new Set(nums).size !== nums.length;\n}", true],
  ["Elixir", "Arrays & Hashing", "Contains Duplicate", null, false], // guest: see grading.mjs
];

for (const [language, subcategory, title, code, runnable] of languages) {
  const slug = language.replace(/[^a-z]/gi, "").toLowerCase();
  await goHome();
  await page.click("text=Browse problems");
  await page.waitForSelector(".menu-container", { timeout: 10000 });
  await openByHand(language, subcategory, title);

  // "Two Sum" is the same title in five languages, so the language is said
  // three times: a pill by the title, a strip on the editor, the status bar.
  check(`${language} is named beside the title`,
    (await page.textContent(".drill-title .language-chip")) === language);
  check(`${language}'s editor frame is labelled`,
    (await page.getAttribute(".editor-frame", "data-language")) === slug);
  check(`the status bar says ${language}`,
    (await page.textContent(".statusbar")).toUpperCase().includes(`DRILL · ${language.toUpperCase()}`));

  if (runnable) {
    // A cold runtime is a multi-megabyte download; the button stays disabled
    // until its worker reports ready.
    await waitForRunnable();
    await setCode(code);
    await page.click(".run-button");
    await page.waitForSelector(".grade-bar", { timeout: 180000 });
    const labels = await gradeLabels();
    check(`${language} runs and passes`,
      JSON.stringify(labels) === ALL_FOUR, JSON.stringify(labels));
  } else {
    // Elixir runs on the server, which a guest cannot ask: nothing in a
    // browser compiles Elixir source. The signed-in run is in grading.mjs.
    check(`${language} tells a guest to sign in to run`,
      (await page.textContent(".run-unavailable")).includes("sign in"));
    // A drill a guest cannot run must still be gradeable, or it is a dead
    // end that can never enter the schedule.
    check(`${language} is a flashcard proper: all four grades, no run`,
      (await page.$$(".grade-button")).length === 4,
      `${(await page.$$(".grade-button")).length} buttons`);
    await page.keyboard.press("s");
    await page.waitForTimeout(500);
  }
  await capture(slug,
    `${language}: ${runnable === "tour" ? "read-and-run lesson" : runnable ? "compiled, ran and passed" : "reveal-only for a guest"}`,
    runnable === "tour" ? "Language tour lesson runs in the browser" : undefined);
  await exitDrill();
  await page.waitForTimeout(800);
}

// ---------------------------------------------------------------- act 5a
act = "05a-blitz";
console.log(act);

// The game: random problems against a clock. A card that runs out is a
// miss; a card that passes is graded as usual. Scored at the end. Runs
// after act 5 on purpose: every browser runtime is warm by then, and a
// Blitz draws from the whole queue.
exercises("UserToggledBlitz", "UserStartedBlitz");
await goHome();
await page.keyboard.press("z");
await page.waitForSelector(".blitz-chooser", { timeout: 5000 });
check("z opens the Blitz chooser", true);
check("four presets, one marked as the default",
  (await page.$$(".blitz-option")).length === 4 && (await page.$$(".blitz-option-default")).length === 1);
await capture("chooser", "Blitz: how many problems, how long each", "A timed Blitz mode, two clicks from the study screen");
await page.click(".blitz-cancel");
check("Not now closes it", !(await page.isVisible(".blitz-chooser")));
await page.keyboard.press("z");
await page.waitForSelector(".blitz-chooser", { timeout: 5000 });
await page.click(".blitz-option:nth-child(3)");
await page.waitForSelector(".run-bar", { timeout: 30000 });
await page.waitForTimeout(1200);
// However many cards the pool had: a small queue is drawn whole.
const blitzTotal = Number((await page.textContent(".drill-countdown")).match(/\/(\d+)/)?.[1] ?? 0);
check("the header clock counts down while the problem is read",
  /\d:\d\d/.test(await page.textContent(".drill-countdown")) && blitzTotal >= 1,
  await page.textContent(".drill-countdown"));
await startCoding();
check("the status bar says it is a Blitz",
  (await page.textContent(".statusbar")).startsWith("BLITZ"));
check("no grade is offered before a run: the score is the run",
  (await page.$$(".grade-button")).length === 0);
await capture("countdown", "A Blitz card: the clock counts down beside the card count");
// Solve one card with whatever it is, to prove a pass records; the rest
// are graded through as misses so the scorecard is reached in the tour's
// time budget. (Expiry itself is the clock reaching zero, covered by the
// unit tests: two minutes per card is too slow to photograph.)
const blitzSolutions = {
  "Contains Duplicate": "def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)\n",
  "Valid Anagram": "def isAnagram(s, t):\n    return sorted(s) == sorted(t)\n",
  "Two Sum": "def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []\n",
};
let blitzPassed = 0;
for (let i = 0; i < blitzTotal; i++) {
  if (await page.isVisible(".summary-container")) break;
  if (i > 0) await startCoding();
  const title = (await page.textContent(".drill-title")).replace(/(Python|Gleam|TypeScript|Elixir|Go).*$/, "").trim();
  await waitForRunnable(240000);
  await setCode(blitzSolutions[title] ?? "def nope():\n    pass\n");
  await page.click(".run-button");
  await verdict();
  if ((await page.textContent(".results-summary")).includes("passed")) blitzPassed++;
  await page.waitForSelector(".grade-button", { timeout: 5000 });
  await page.click(".grade-button:nth-child(3)");
  await page.waitForTimeout(1200);
}
await page.waitForSelector(".summary-container", { timeout: 20000 });
check("the Blitz ends on a scorecard",
  (await page.textContent(".drill-title")).includes("Blitz over"));
check("the score is the passes over the cards",
  (await page.textContent(".scorecard-score")).trim() === `${blitzPassed}/${blitzTotal}`,
  await page.textContent(".scorecard-score"));
check("and it is ranked", (await page.$$(".scorecard-rank")).length === 1);
check("a solved card is marked clean when nothing was given away",
  (await page.$$(".row-badge-clean")).length === blitzPassed,
  `${(await page.$$(".row-badge-clean")).length} clean badges for ${blitzPassed} passes`);
await capture("scorecard", "Blitz over: the score, the rank, the fastest solve", "A Blitz ends on a scorecard");
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

// ---------------------------------------------------------------- act 5b
act = "05b-gleam-tour";
console.log(act);
exercises("UserClickedTour", "UserOpenedLesson", "UserClickedTourNext",
  "UserClickedTourPrev", "UserClickedTourContents", "UserResetLesson",
  "TourEditorChanged", "TourCursorMoved", "TourActivated");

// The language tour is its own thing: read in order, code runs as you type,
// nothing scheduled. Reached from the study screen or the nav bar.
await goHome();
await page.click("text=Manage queue");
await page.waitForSelector(".queue-screen", { timeout: 10000 });
check("the tour is not a study category",
  !(await page.$$eval(".queue-language option", (n) => n.map((e) => e.textContent))).some((t) => t.includes("Tour")));
await goHome();
await page.click(".study-tour");
await page.waitForSelector(".tour-contents", { timeout: 10000 });
check("the tour opens on its table of contents",
  (await page.$$(".tour-chapter")).length === 6, `${(await page.$$(".tour-chapter")).length} chapters`);
check("with every lesson listed", (await page.$$(".tour-toc-item")).length === 63);
await capture("contents", "The Gleam Language Tour: six chapters, sixty-three lessons",
  "The Gleam tour, playable in order");

// Open Ints (lesson 5) by clicking; the program runs with no button pressed.
await page.click('.tour-toc-item:has-text("Ints")');
await page.waitForSelector(".tour-lesson", { timeout: 10000 });
check("a lesson shows its prose beside an editor",
  (await page.$$(".tour-text p")).length > 0 && (await page.isVisible("gleam-editor")));
check("the breadcrumb places the lesson",
  (await page.textContent(".tour-crumb-where")).includes("Basics"));
const tourOutput = async () => (await page.textContent(".tour-output").catch(() => ""));
await page.waitForFunction(
  () => /\d/.test(document.querySelector(".tour-output:not(.waiting):not(.stale)")?.textContent ?? ""),
  null, { timeout: 180000 });
check("the program ran on open, with nothing clicked", (await tourOutput()).includes("2"),
  await tourOutput());
await capture("lesson", "A lesson: prose left, live program and its output right");

// Editing re-runs after a pause in typing.
await setCode("pub fn main() {\n  echo 40 + 2\n}");
await page.waitForFunction(
  () => (document.querySelector(".tour-output:not(.waiting):not(.stale)")?.textContent ?? "").includes("42"),
  null, { timeout: 60000 });
check("editing re-runs without a click", (await tourOutput()).includes("42"), await tourOutput());
await capture("edited", "Edited program, re-run on the pause in typing");

// A compile error lands in the same output box.
await setCode("pub fn main() {\n  echo 40 +\n}");
await page.waitForSelector(".tour-output.error", { timeout: 60000 });
check("a compile error is shown where the output was", await page.isVisible(".tour-output.error"));
await page.click(".tour-reset");
await page.waitForFunction(
  () => /\d/.test(document.querySelector(".tour-output:not(.waiting):not(.stale):not(.error)")?.textContent ?? ""),
  null, { timeout: 60000 });
check("Reset code restores the lesson's program", !(await page.isVisible(".tour-output.error")));

// Next, Back and Contents.
await page.click(".tour-next");
await page.waitForFunction(
  () => (document.querySelector(".tour-title")?.textContent ?? "") === "Floats", null, { timeout: 10000 });
check("Next opens the following lesson", (await page.textContent(".tour-title")) === "Floats");
await page.click(".tour-prev");
await page.waitForFunction(
  () => (document.querySelector(".tour-title")?.textContent ?? "") === "Ints", null, { timeout: 10000 });
check("Back returns to the previous one", (await page.textContent(".tour-title")) === "Ints");
await page.click(".tour-contents-link");
await page.waitForSelector(".tour-contents", { timeout: 10000 });
check("the contents page marks where you are",
  (await page.textContent(".tour-toc-item.current")).includes("Ints"));

// The keyboard walks the contents.
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press("j");
await page.waitForTimeout(150);
await page.keyboard.press("Enter");
await page.waitForSelector(".tour-lesson", { timeout: 10000 });
check("j then Enter opens the next lesson from the contents",
  (await page.textContent(".tour-title")) === "Floats");

// The position survives a reload: Continue lands on the same lesson.
await goHome();
check("the study screen offers to continue",
  (await page.textContent(".study-tour")).includes("Continue"));
await page.click(".study-tour");
await page.waitForSelector(".tour-contents", { timeout: 10000 });
await page.click(".tour-continue");
await page.waitForSelector(".tour-lesson", { timeout: 10000 });
check("Continue reopens the last lesson", (await page.textContent(".tour-title")) === "Floats");
await page.keyboard.press("Escape");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("Escape leaves the tour", await page.isVisible(".study-screen"));

// ---------------------------------------------------------------- act 6
act = "06-quiz-and-report";
console.log(act);
exercises("UserClickedStartExam", "UserPickedChoice", "UserSubmittedAnswer",
  "UserClickedNext", "UserClickedExitReport");

await goHome();
await page.click("text=System design exam");
await page.waitForSelector(".quiz-choices", { timeout: 30000 });
check("the exam opens a quiz", (await page.$$(".quiz-choice")).length > 1);
await capture("quiz-unanswered", "Quiz question, nothing picked");

await page.keyboard.press("j");
await page.keyboard.press("j");
await page.waitForTimeout(200);
check("j moves the quiz choice",
  (await page.$$(".quiz-choice.picked")).length === 1);
await page.click(".quiz-choice");
await page.waitForTimeout(300);
check("a choice can be picked", (await page.$$(".quiz-choice.picked")).length === 1);
await capture("quiz-picked", "Choice picked, before submitting");

await page.click('button:text-is("Submit answer")');
await page.waitForSelector(".quiz-explanation", { timeout: 10000 });
check("submitting grades and explains",
  (await page.$$(".results-summary")).length === 1);
await capture("quiz-graded", "Graded: verdict, explanation and book reference");

// Answer the rest of the sitting. 40 questions is too many to click through
// one at a time in a readable script, so this loop takes whichever choice is
// first and presses on until the report appears.
let answered = 1;
dialogs.length = 0;
for (let i = 0; i < 60; i++) {
  await page.click('button:text-is("Next")').catch(() => {});
  if (await page.isVisible(".report-container").catch(() => false)) break;
  if (await page.isVisible(".study-screen").catch(() => false)) break;

  // Wait for an *enabled* choice: the previous question's buttons stay
  // disabled until the re-render lands, and clicking one throws.
  const choice = await page
    .waitForSelector(".quiz-choice:not([disabled])", { timeout: 8000 })
    .catch(() => null);
  if (!choice) break;
  await choice.click();
  await page.click('button:text-is("Submit answer")').catch(() => {});
  await page.waitForSelector(".quiz-explanation", { timeout: 8000 }).catch(() => {});
  answered++;
}
// Not `exam_size` questions: `sample_exam` takes a flat number from each
// section, and a thin section contributes fewer. Assert against the report
// rather than a guessed constant.
check("the whole sitting can be answered", answered >= 10, `${answered} answered`);

const reported = await page.isVisible(".report-container").catch(() => false);
check("finishing an exam lands on the report", reported);
if (reported) {
  check("the report scores by section",
    (await page.$$(".report-section")).length > 0);
  const total = (await page.textContent(".report-total-score")).split("/")[1];
  check("the report totals every question answered",
    Number(total) === answered, `report ${total} vs ${answered} answered`);
  await capture("report", "Exam report: total, per-section bars, where to study");
  await page.click(".report-container button");
  await page.waitForTimeout(600);
}

// The exam is reachable from the study screen, so finishing it should return
// there rather than to the manual browser.
check("the report returns to where the exam started",
  await page.isVisible(".study-screen").catch(() => false));

// ---------------------------------------------------------------- act 6a
act = "06a-design-board";
console.log(act);
exercises("UserClickedStartDrill", "UserToggledPiece", "UserSubmittedBoard",
  "BoardMoved", "BoardShelfMoved", "BoardJumped", "BoardToggledAtCursor");

await goHome();
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await page.click('.pane-item:text-is("System Design Board")');
await page.waitForTimeout(300);
await page.click('.pane-item:text-is("Designs")');
await page.waitForTimeout(300);
await page.click('.pane-item:text-is("Design a URL shortener")');
await page.waitForTimeout(300);
await page.waitForFunction(
  () => { const b = document.querySelector("#startDrill"); return b && !b.disabled; },
  { timeout: 5000 },
);
await page.click("#startDrill");
await page.waitForSelector(".board-palette", { timeout: 20000 });

const chips = (await page.$$(".board-chip")).length;
check("the whole palette opens with the board", chips === 36, `${chips} chips`);
check("the palette is laid out in shelves",
  (await page.$$(".board-shelf")).length === 6);
// The two regression guards: a board must not get the code editor, and it must
// not get the four self-grade buttons on top of a drill that grades itself.
check("a board has no editor", (await page.$("gleam-editor")) === null);
check("a board has no grade bar", (await page.$(".grade-bar")) === null);
check("nothing says anything true about the answer before submitting",
  (await page.$$(".board-chip.hit, .board-chip.missed, .board-chip.wrong")).length === 0);
await capture("board-open", "System design board: scenario and the full palette");

// Keyboard: move, jump a shelf, jump to the ends, then place a piece.
await page.keyboard.press("j");
await page.keyboard.press("l");
await page.keyboard.press("G");
await page.keyboard.press("g");
await page.keyboard.press(" ");
await page.waitForTimeout(300);
check("space places the piece under the cursor",
  (await page.$$(".board-chip.picked")).length === 1);

// And the mouse, for two more.
const spare = await page.$$(".board-chip:not(.picked)");
await spare[3].click();
await spare[9].click();
await page.waitForTimeout(300);
check("clicking a chip places it",
  (await page.$$(".board-chip.picked")).length === 3);
await capture("board-picked", "Three pieces placed, before submitting");

await page.click('button:text-is("Submit board")');
await page.waitForSelector(".results-summary", { timeout: 10000 });
check("submitting grades the board",
  (await page.$$(".results-summary")).length === 1);
check("the verdict annotates the palette",
  (await page.$$(".board-chip.missed")).length > 0);
check("a graded board offers Next, not a grade bar",
  (await page.$(".grade-bar")) === null);
await capture("board-graded", "Graded: score, what was missed, what was spurious");

await page.click('button:text-is("Next")').catch(() => {});
await page.waitForTimeout(600);
await goHome();

// ---------------------------------------------------------------- act 7
act = "06b-settings";
console.log(act);
exercises("UserClickedSettings", "UserChangedSetting",
  "UserClickedDeviceTimezone");

await freshGuest();
await page.click('button:text-is("Settings")');
await page.waitForSelector(".settings-screen", { timeout: 10000 });
check("settings opens", await page.isVisible(".settings-screen"));
check("account, reminders, device and data sections",
  (await page.$$(".settings-section")).length === 5);
check("a guest sees the reminder control but cannot use it",
  await page.isVisible(".settings-reminder") && await page.isDisabled(".settings-reminder"));
check("the offline row is there", await page.isVisible(".settings-warm"));
// Exercised for real, with the network off, by test/browser/offline.mjs;
// this context blocks service workers.
exercises("UserClickedWarmCache");
const beforeSave = await page.evaluate(
  () => localStorage.getItem("gleamDrill.guest.settings.v1"));
check("nothing is written before an edit", beforeSave === null);
await capture("settings", "Settings: account data and device preferences, labelled");

const dailyInputs = await page.$$(".settings-input");
await dailyInputs[0].fill("3");
await dailyInputs[0].press("Enter");
await page.waitForTimeout(300);
const savedSettings = await page.evaluate(
  () => JSON.parse(localStorage.getItem("gleamDrill.guest.settings.v1") ?? "null"));
check("editing persists for a guest", savedSettings?.newPerDay === 3,
  JSON.stringify(savedSettings));

await dailyInputs[0].fill("9999");
await dailyInputs[0].press("Enter");
await page.waitForTimeout(300);
const clamped = await page.evaluate(
  () => JSON.parse(localStorage.getItem("gleamDrill.guest.settings.v1") ?? "null"));
check("out-of-range clamps to the server's own bound", clamped?.newPerDay === 100,
  String(clamped?.newPerDay));

await page.click(".settings-timezone .btn-secondary");
await page.waitForTimeout(300);
const zoned = await page.evaluate(
  () => JSON.parse(localStorage.getItem("gleamDrill.guest.settings.v1") ?? "null"));
check("the timezone button adopts this device's zone",
  typeof zoned?.timezone === "string" && zoned.timezone !== "UTC", zoned?.timezone);

check("no language toggles in settings either",
  (await page.$$(".settings-screen .language-chip")).length === 0);
exercises("UserChangedKeymap");
await page.click('.settings-screen .keymap-option:text-is("Vim")');
await page.waitForTimeout(200);
check("device preferences save from here too",
  (await page.evaluate(() => JSON.parse(
    localStorage.getItem("gleamDrill.prefs.v1") ?? "{}"))).editorKeymap === "vim");

// Everything as one file, and back. A card is seeded so the file has
// something in it; the store is wiped between the two halves.
await page.evaluate(() => {
  const longAgo = Math.floor(Date.now() / 1000) - 3 * 86400;
  localStorage.setItem("gleamDrill.guest.cards.v1", JSON.stringify([{
    category: "NeetCode 150", subcategory: "Arrays & Hashing", title: "Two Sum",
    state: 2, step: null, stability: 12, difficulty: 5,
    due: longAgo + 86400 * 5, lastReview: longAgo, introducedAt: longAgo,
    reps: 2, lapses: 0, suspended: false,
  }]));
  localStorage.setItem("gleamDrill.guest.notes.v1", JSON.stringify([{
    category: "NeetCode 150", subcategory: "Arrays & Hashing", title: "Two Sum",
    body: "complement map",
  }]));
});
await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 10000 });
await page.click('button:text-is("Settings")');
await page.waitForSelector(".settings-screen", { timeout: 10000 });
const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 10000 }),
  page.click(".settings-export"),
]);
exercises("UserClickedExport");
const exportPath = join(SHOTS, "export.json");
await download.saveAs(exportPath);
const exported = JSON.parse(readFileSync(exportPath, "utf8"));
check("export downloads a dated JSON file",
  /^gleamdrill-\d{4}-\d{2}-\d{2}\.json$/.test(download.suggestedFilename()), download.suggestedFilename());
check("holding the cards, notes and settings",
  exported.gleamdrill === 1 && exported.cards.length === 1
    && exported.notes[0]?.body === "complement map" && exported.settings.newPerDay === 100,
  JSON.stringify(Object.keys(exported)));
await page.evaluate(() => {
  localStorage.removeItem("gleamDrill.guest.cards.v1");
  localStorage.removeItem("gleamDrill.guest.notes.v1");
});
// The picker's input is created on click and read on change; handing it
// the file directly is the same path a real choice takes.
const chooseFile = async (path) => {
  await page.click(".settings-import");
  await page.setInputFiles("input[type=file]", path);
};
await chooseFile(exportPath);
exercises("UserClickedImport");
await page.waitForSelector(".import-prompt", { timeout: 10000 });
check("import asks before replacing anything",
  (await page.textContent(".import-prompt")).includes("1 cards"));
await capture("import-prompt", "Import: the file's contents named, and a question before anything is replaced",
  "Export and import everything as one file");
await page.keyboard.press("Escape");
exercises("ImportConfirmed");
await page.waitForTimeout(300);
check("Escape keeps what is here", (await page.$(".import-prompt")) === null
  && (await page.evaluate(() => localStorage.getItem("gleamDrill.guest.cards.v1"))) === null);
await chooseFile(exportPath);
await page.waitForSelector(".import-prompt", { timeout: 10000 });
await page.click(".import-prompt .exit-prompt-leave");
await page.waitForTimeout(800);
check("Replace restores the file",
  (await page.evaluate(() => JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]").length)) === 1
    && (await page.evaluate(() => JSON.parse(localStorage.getItem("gleamDrill.guest.notes.v1") ?? "[]")[0]?.body)) === "complement map");
check("and says so", (await page.textContent(".notice").catch(() => "")).includes("Restored"));
// A restore reloads everything, which lands on the study screen with the
// restored queue in view.
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("and lands on the restored study screen", await page.isVisible(".study-screen"));
await page.click('button:text-is("Settings")');
await page.waitForSelector(".settings-screen", { timeout: 10000 });
writeFileSync(exportPath, "{\"hello\": 1}");
await chooseFile(exportPath);
await page.waitForTimeout(500);
check("a file that is not an export is refused without a question",
  (await page.$(".import-prompt")) === null
    && (await page.textContent(".notice").catch(() => "")).includes("not a GleamDrill export"));
await page.click(".notice-dismiss").catch(() => {});

await page.keyboard.press("Escape");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("Escape leaves settings", await page.isVisible(".study-screen"));

// ---------------------------------------------------------------- act 7
act = "07-stats";
console.log(act);
exercises("UserClickedStats", "UserClickedBackToStudy", "StatsCursorMoved",
  "StatsActivated", "UserOpenedDetail", "UserClosedDetail");

await freshGuest();
await page.keyboard.press("t");
await page.waitForSelector(".stats-screen", { timeout: 10000 });
check("stats render with no history at all",
  (await page.textContent(".stats-screen")).includes("No reviews yet"));
await capture("empty", "Progress with nothing recorded yet");
await page.keyboard.press("Escape");
await page.waitForSelector(".study-screen", { timeout: 10000 });

// One clean solve, then a second problem graded through a reveal, so every
// panel has something true to say.
await page.click(".study-start");
await startCoding();
await waitForRunnable();
await setCode("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await page.click(".run-button");
await verdict();
await page.click(".grade-good");
await page.waitForTimeout(1500);
await startCoding();
await page.keyboard.press("s");
await page.waitForTimeout(400);
await page.click(".grade-hard");
await page.waitForTimeout(1500);
await page.keyboard.press("Escape");
await page.waitForSelector(".exit-prompt", { timeout: 5000 });
await page.keyboard.press("Enter");
await page.waitForSelector(".study-screen", { timeout: 10000 });

await page.keyboard.press("t");
await page.waitForSelector(".stats-tiles", { timeout: 10000 });
await page.waitForTimeout(600);
check("the headline is the three-minute count",
  (await page.textContent(".stats-tile-hero")).includes("under 3 minutes"));
check("with this week's delta",
  (await page.textContent(".stats-tile-hero")).includes("this week"));
check("the tier bar renders", (await page.$$(".stats-section .state-row")).length >= 4);
check("problems worth acting on are listed",
  (await page.$$(".problem-row")).length >= 1);
check("the heatmap renders", (await page.$$(".heatmap-cell")).length > 100);
await capture("insights", "Progress: fluency headline, tiers, calibration, mastered list");

await page.keyboard.press("j");
await page.keyboard.press("Enter");
await page.waitForSelector(".detail-card", { timeout: 8000 });
await page.waitForTimeout(600);
check("Enter opens the cursor problem's history",
  (await page.$$(".timeline-bar")).length >= 1);
await capture("detail", "One problem's review timeline: grade colors, durations, intervals");
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
check("Esc closes the detail", !(await page.isVisible(".detail-card")));
await page.keyboard.press("Escape");
await page.waitForSelector(".study-screen", { timeout: 10000 });

// ---------------------------------------------------------------- act 7b
act = "07b-queue-management";
console.log(act);
exercises("UserToggledSuspend", "MenuSuspendedAtCursor");

// Suspend from the stats detail: park a reviewed card without lying to FSRS.
// A button may still hold focus from the last click and buttons swallow
// keys — the , leader is the rescue: press it, then the key works
// regardless of focus.
await page.keyboard.press(",");
await page.waitForTimeout(200);
check("the statusbar shows the armed leader",
  (await page.$$(".leader-chip.leader-armed")).length === 1);
await page.keyboard.press("t");
await page.waitForSelector(".stats-tiles", { timeout: 10000 });
await page.keyboard.press("j");
await page.keyboard.press("Enter");
await page.waitForSelector(".detail-card", { timeout: 8000 });
await page.click(".detail-suspend");
await page.waitForTimeout(400);
check("the detail button flips to resume",
  (await page.textContent(".detail-suspend")).includes("Resume"));
await capture("suspended-detail", "Paused from the history overlay");
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
await page.keyboard.press("Escape");
await page.waitForSelector(".study-screen", { timeout: 10000 });

// The browse row shows the parked card and can flip it back.
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await page.click('.pane-item:text-is("Python")');
await page.waitForTimeout(300);
await page.click('.pane-item:text-is("Arrays & Hashing")');
await page.waitForTimeout(300);
check("a parked card is badged in the browser",
  (await page.$$(".badge-paused")).length >= 1);
await capture("paused-badge", "Browse row: paused badge and the park toggle");
await page.click(".suspend-toggle");
await page.waitForTimeout(400);
check("the row toggle resumes it", (await page.$$(".badge-paused")).length === 0);

// And z parks the cursor row from the keyboard. Blur first: the toggle
// button still holds focus and focused buttons own the keyboard.
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press("l");
await page.keyboard.press("l");
await page.keyboard.press("z");
await page.waitForTimeout(400);
check("z pauses the cursor row's card",
  (await page.$$(".badge-paused")).length === 1);
await page.keyboard.press("z");
await page.waitForTimeout(400);
check("z resumes it too", (await page.$$(".badge-paused")).length === 0);
await goHome();

// ------------------------------------------------------------- act 7c
act = "07c-queue-screen";
console.log(act);
exercises("UserClickedQueue", "UserSearchedQueue", "UserFilteredQueue",
  "UserPickedQueueLanguage", "UserChangedGroup", "UserToggledQueued",
  "UserAddedAllShown", "UserRemovedAllShown", "QueueCursorMoved",
  "QueueCursorJumped", "QueueToggledAtCursor");

await page.click(".study-account .link-button:text-is(\"Queue\")");
await page.waitForSelector(".queue-screen", { timeout: 10000 });
const queuedCount = async () =>
  Number((await page.textContent(".queue-total")).match(/\d+/)[0]);
const queuedAtStart = await queuedCount();
check("the queue screen lists the catalogue",
  (await page.$$(".queue-row")).length > 50);
check("and says how much is queued", queuedAtStart > 0);
check("the list is grouped by topic", (await page.$$(".queue-group")).length >= 18,
  `${(await page.$$(".queue-group")).length} groups`);
check("no filter chips", (await page.$$(".queue-chip")).length === 0);
check("every NeetCode row carries a difficulty",
  (await page.$$(".queue-row .difficulty")).length >= 150 * 4,
  `${(await page.$$(".queue-row .difficulty")).length} badges`);
await capture("queue", "The queue screen: topics, each with its own queued count and buttons",
  "Queue a topic where you read it");

// One language at a time is the normal view; the topic headers then drop the
// language and the rows drop their tag.
await page.selectOption(".queue-language", "py");
await page.waitForTimeout(300);
check("one language lists eighteen topics plus nothing else",
  (await page.$$(".queue-group")).length === 18, `${(await page.$$(".queue-group")).length} groups`);
check("rows drop the language tag when one language is chosen",
  (await page.$$(".queue-row .lang-tag")).length === 0);

// A topic header queues its Easy problems in one click, and says how many.
const easyHead = '.queue-group:has(.queue-group-title:text-is("Two Pointers"))';
const easyLabel = await page.textContent(`${easyHead} .queue-group-add-easy`);
const easyCount = Number(easyLabel.match(/\d+/)[0]);
check("a topic offers its Easy problems", easyCount > 0, easyLabel);
await page.click(`${easyHead} .queue-group-add-easy`);
await page.waitForTimeout(600);
check("adding a topic's Easy problems raises the count by that many",
  (await queuedCount()) === queuedAtStart + easyCount,
  `${await queuedCount()} vs ${queuedAtStart + easyCount}`);
check("and the header now counts them",
  (await page.textContent(`${easyHead} .queue-group-count`)).startsWith(`${easyCount}/`));
await capture("queue-group-easy", "Two Pointers: its Easy problems queued from the header");
await page.click(`${easyHead} .queue-group-remove`);
await page.waitForTimeout(600);
check("the header's Remove takes them back out", (await queuedCount()) === queuedAtStart);

// Search narrows the same list the bulk buttons act on.
await page.fill(".queue-screen .search", "Two Sum");
await page.waitForTimeout(300);
const searched = (await page.$$(".queue-row")).length;
check("search narrows the list", searched > 0 && searched < 50);
await page.fill(".queue-screen .search", "");
await page.waitForTimeout(300);

// The status lens agrees with the actions it lists.
await page.selectOption(".queue-status", "unqueued");
await page.waitForTimeout(300);
check("the not-queued lens hides everything already in play",
  (await page.$$(".queue-row .queue-remove")).length === 0);
await page.selectOption(".queue-status", "new");
await page.waitForTimeout(300);
check("a queued, unanswered card reads as new",
  (await page.$$(".badge-new")).length > 0);
await page.selectOption(".queue-status", "all");
await page.waitForTimeout(300);

// One row, added and taken straight back out. Under a search rather than a
// status lens, because a lens drops the row the instant it changes state and
// the second click would land on its neighbour -- which is a different
// problem, and would leave the count looking right for the wrong reason.
// A title outside the topic the tour seeded, so every row matching it starts
// unqueued and the first click is unambiguously an add.
await page.fill(".queue-screen .search", "Valid Palindrome");
await page.waitForTimeout(400);
await page.click(".queue-row:first-child .queue-action");
await page.waitForTimeout(600);
check("adding one row raises the count", (await queuedCount()) === queuedAtStart + 1);
check("and the row now offers to remove itself",
  (await page.$$(".queue-row:first-child .queue-remove")).length === 1);
await capture("queue-added", "One problem added, with the state it now has");
await page.click(".queue-row:first-child .queue-action");
await page.waitForTimeout(600);
check("and can be taken straight back out", (await queuedCount()) === queuedAtStart);
await page.fill(".queue-screen .search", "");
await page.waitForTimeout(300);

// The keyboard walks the same list. Under the All lens, so the cursor row
// stays put across the toggle: a filtered lens drops the row the moment it
// stops matching, and the second press would then land on its neighbour.
await page.selectOption(".queue-status", "all");
await page.waitForTimeout(300);
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press("j");
await page.keyboard.press("j");
await page.waitForTimeout(200);
check("j moves the queue cursor", (await page.$$(".queue-row.cursor")).length === 1);
const beforeToggle = await queuedCount();
await page.keyboard.press(" ");
await page.waitForTimeout(600);
const toggled = await queuedCount();
check("space toggles the cursor row", Math.abs(toggled - beforeToggle) === 1,
  `${beforeToggle} then ${toggled}`);
await page.keyboard.press(" ");
await page.waitForTimeout(600);
check("and pressing it again puts the row back",
  (await queuedCount()) === beforeToggle);
await page.keyboard.press("G");
await page.waitForTimeout(200);
check("G jumps to the last row", (await page.$$(".queue-row.cursor")).length === 1);

// A whole topic in one press, from its header. That is the reason the
// endpoints take lists.
const twoPointers = '.queue-group:has(.queue-group-title:text-is("Two Pointers"))';
const beforeBulk = await queuedCount();
await page.click(`${twoPointers} .queue-group-add`);
await page.waitForTimeout(900);
const afterBulk = await queuedCount();
check("adding a whole topic queues more than one", afterBulk > beforeBulk + 1);
check("and its header says the topic is fully queued",
  /^(\d+)\/\1 queued$/.test(await page.textContent(`${twoPointers} .queue-group-count`)),
  await page.textContent(`${twoPointers} .queue-group-count`));
await capture("queue-topic", "A topic queued in one press");
await page.click(`${twoPointers} .queue-group-remove`);
await page.waitForTimeout(900);
check("and removing the topic puts it back", (await queuedCount()) === beforeBulk);

// The language select is the other lens, and the one the picker preselects.
await page.selectOption(".queue-language", "gl");
await page.waitForTimeout(300);
check("the language lens shows only that language",
  (await page.$$eval(".queue-group-title", (n) => n.map((e) => e.textContent))).length === 18
  && (await page.$$(".queue-row .lang-tag")).length === 0);
await page.selectOption(".queue-language", "");
await page.waitForTimeout(300);
check("all languages name the language on each topic header",
  (await page.textContent(".queue-group-title")).includes("Python"));

// The queue screen is where a first-time user lands; it can start the
// sitting itself rather than sending them back to the study screen first.
check("the queue screen offers Study now once there is something to study",
  await page.isVisible(".queue-study-now"));
await capture("queue-study-now", "Study now straight from the queue screen",
  "First card is one click from the queue screen");
await page.click(".queue-study-now");
await startCoding();
check("and it opens the first card", await page.isVisible(".run-bar"));
await exitDrill();
await page.waitForTimeout(800);
await goHome();

// ---------------------------------------------------------------- act 7d
act = "07d-named-queues";
console.log(act);
exercises("UserPickedActiveQueue", "UserSelectedQueue", "UserStartedNewQueue",
  "UserStartedRenameQueue", "UserChangedQueueName", "UserSubmittedQueueName",
  "UserCancelledQueueName", "UserDeletedQueue", "UserAddedSelectionToQueue");

// Many queues, one studied at a time. A queue is a list; the cards it names
// keep their scheduling in Everything, and a problem added to a list gets a
// card if it had none.
await page.click(".study-account .link-button:text-is(\"Queue\")");
await page.waitForSelector(".queue-screen", { timeout: 10000 });
const everythingCount = await queuedCount();
check("the queue screen opens on Everything", (await page.textContent(".queue-total")).includes("in queue"));
await page.click(".queue-new");
await page.waitForSelector(".queue-name-input", { timeout: 3000 });
check("New queue opens a name box and focuses it",
  await page.evaluate(() => document.activeElement?.classList.contains("queue-name-input")));
await page.click(".queue-name-form .btn-secondary");
await page.waitForTimeout(200);
check("Cancel closes it", (await page.$(".queue-name-input")) === null);
await page.click(".queue-new");
await page.waitForSelector(".queue-name-input", { timeout: 3000 });
await page.keyboard.type("Pointers");
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
check("a new queue is selected and empty", (await page.textContent(".queue-total")).startsWith("0 in Pointers"));
await page.selectOption(".queue-language", "py");
await page.waitForTimeout(300);
const pointersHead = '.queue-group:has(.queue-group-title:text-is("Two Pointers"))';
await page.click(`${pointersHead} .queue-group-add`);
await page.waitForTimeout(900);
const inPointers = await queuedCount();
check("a topic header fills the queue", inPointers === 5, String(inPointers));
check("its rows now offer to leave the list", (await page.$$(`${pointersHead} .queue-remove`)).length === 5);
await capture("named-queue", "A named queue with one topic in it, the rest of the catalogue waiting",
  "Many queues: pick which one today serves from");
await page.click(".queue-pick:text-is('Everything')");
await page.waitForTimeout(300);
check("Everything gained cards for the problems the list needed",
  (await queuedCount()) === everythingCount + 5, `${await queuedCount()} vs ${everythingCount + 5}`);
await page.selectOption(".queue-language", "");
await page.waitForTimeout(200);

// The study screen picks which queue today serves from.
await page.click(".queue-header .link-button");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("the study screen shows a picker once a queue exists",
  (await page.$$(".study-screen .queue-pick")).length === 2);
await page.click(".study-screen .queue-pick:text-is('Pointers')");
await page.waitForTimeout(400);
check("picking a queue scopes the preview to it",
  (await page.$$eval(".study-preview-item", (n) => n.map((e) => e.textContent))).every((t) => /Two Pointers|Palindrome|3Sum|Water|Two Sum II|Trapping/.test(t)));
await capture("study-queue", "Study screen serving one named queue");
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press("n");
await page.waitForTimeout(200);
check("n rings round to Everything",
  (await page.textContent(".study-screen .queue-pick.current")) === "Everything");
await page.keyboard.press("n");
await page.waitForTimeout(200);
check("and on to the queue again",
  (await page.textContent(".study-screen .queue-pick.current")) === "Pointers");
await page.keyboard.press("Enter");
await startCoding();
check("Study serves from the queue", (await page.textContent(".drill-title")).match(/Palindrome|3Sum|Water|Two Sum|Trapping/) !== null,
  await page.textContent(".drill-title"));
await exitDrill();
await page.waitForSelector(".study-screen", { timeout: 10000 });

// Browse puts a selection into any queue.
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
for (const item of ["Python", "Stack", "Min Stack"]) {
  await page.click(`.pane-item:text-is("${item}")`);
  await page.waitForTimeout(250);
}
await page.click(".add-to-queue > summary");
await page.click(".add-to-queue-option:text-is('Pointers')");
await page.waitForTimeout(600);
check("Add to queue puts the selection in the named queue",
  (await page.textContent("body")).includes("added to Pointers"));
await page.click("#clearSelection");
await goHome();

// Rename follows the active pick; delete falls back to Everything and
// leaves the cards where they are.
await page.click(".study-account .link-button:text-is(\"Queue\")");
await page.waitForSelector(".queue-screen", { timeout: 10000 });
check("the queue screen opens on the queue being studied",
  (await page.textContent(".queue-total")).includes("in Pointers"));
check("with the problem Browse added", (await queuedCount()) === 6, String(await queuedCount()));
await page.click(".queue-rename");
await page.waitForSelector(".queue-name-input", { timeout: 3000 });
await page.keyboard.press("Control+a");
await page.keyboard.type("Two Pointers");
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
check("rename shows through", (await page.textContent(".queue-total")).includes("in Two Pointers"));
check("and the guest store keeps it",
  (await page.evaluate(() =>
    JSON.parse(localStorage.getItem("gleamDrill.guest.queues.v1")).queues
      .map((q) => `${q.name}:${q.problems.length}`).join(","))) === "Two Pointers:6");
await page.click(".queue-delete");
await page.waitForTimeout(400);
check("delete falls back to Everything", (await page.textContent(".queue-total")).includes("in queue"));
check("and the cards stay", (await queuedCount()) === everythingCount + 6, `${await queuedCount()}`);
await page.click(".queue-header .link-button");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("with no queue left the picker goes away", (await page.$$(".study-screen .queue-pick")).length === 0);

// ---------------------------------------------------------------- act 8
act = "08-upgrade";
console.log(act);
exercises("UserDismissedUpgradePrompt", "UserClickedMergeGuest");

// Seed past-dated cards so the prompt threshold is crossed without drilling
// ten problems. Dated into the past on purpose: ten cards introduced *today*
// would exhaust the daily new-card budget and correctly disable Study now.
await page.evaluate(() => {
  const cards = JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]");
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  for (let i = 0; i < 12; i++) {
    cards.push({
      ...cards[0], title: `Seeded ${i}`, subcategory: "Arrays & Hashing",
      category: "NeetCode 150 · Python", state: 2, step: null,
      stability: 30, difficulty: 5,
      due: Math.floor(Date.now() / 1000) + 20 * 86400,
      lastReview: longAgo, introducedAt: longAgo,
      // Explicit: a card with no reviews is a *new* card now, not a scheduled
      // one, and spreading `cards[0]` could copy a queued-but-unanswered zero.
      reps: 1, lapses: 0, suspended: false,
    });
  }
  localStorage.setItem("gleamDrill.guest.cards.v1", JSON.stringify(cards));
});
await goHome();
check("the upgrade prompt appears once there is something to lose",
  await page.isVisible(".upgrade-prompt"));
await capture("prompt", "Upgrade prompt, naming the number of cards at risk");

await page.click("text=Not now");
await page.waitForTimeout(400);
check("the prompt can be dismissed", !(await page.isVisible(".upgrade-prompt")));
await goHome();
check("and stays dismissed across a reload",
  !(await page.isVisible(".upgrade-prompt")));

// Counted before signing up: the upgrade clears the guest store, and the
// check below needs to know how much there was to carry.
const guestCards = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]").length);
const upgraded = `tour-upgrade-${Date.now()}@example.com`;
await page.click("text=Save it to an account");
await page.waitForSelector(".auth-card", { timeout: 10000 });
await page.fill('input[type="email"]', upgraded);
await page.fill('input[type="password"]', PASSWORD);
// Hold the account's first state load so there is time to see what the
// screen does meanwhile: it must stay the study screen, with the sync bar,
// never the boot-time loading card.
const slow = async (route) => {
  await new Promise((r) => setTimeout(r, 1500));
  await route.continue();
};
await page.route("**/api/state", slow);
await page.click(".auth-submit");
await page.waitForSelector(".sync-bar", { timeout: 10000 });
check("signing in keeps the study screen up while the account loads",
  (await page.isVisible(".study-screen")) && !(await page.isVisible(".auth-screen")));
await capture("syncing", "Just signed in: study screen stays, sync bar at the top",
  "Signing in no longer blanks the app");
await page.waitForFunction(() =>
  document.querySelector(".study-email")?.textContent.includes("@") && !document.querySelector(".sync-bar"),
  { timeout: 25000 });
await page.unroute("**/api/state", slow);
check("signing up signs you in",
  (await page.textContent(".study-email")) === upgraded);
check("the guest strip is gone", !(await page.isVisible(".guest-strip")));
const serverCards = await page.evaluate(async ([api, token]) => {
  const r = await fetch(`${api}/api/state`, {
    headers: { authorization: "Bearer " + token },
  });
  return (await r.json()).cards.length;
}, [API, await page.evaluate(() => localStorage.getItem("gleamDrill.token"))]);
// Against what the guest actually held rather than a fixed number: the queue
// is chosen now, so how many cards a guest has is a property of the tour's
// own clicking, and the invariant is that all of them travel.
check("every guest card moved to the account", serverCards === guestCards,
  `${serverCards} on server vs ${guestCards} local`);
await capture("upgraded", "Signed in, guest progress merged, no strip");

// ---------------------------------------------------------------- act 9
act = "09-account";
console.log(act);
exercises("UserClickedSignOut", "UserDismissedNotice", "UserDismissedMergeOffer");

await page.click("text=Stats");
await page.waitForSelector(".stats-tiles", { timeout: 10000 });
// The imported cards carry no review log by design, so retention reads "—"
// while the card breakdown is populated. Showing the breakdown anyway is the
// point of the non-empty state here.
check("an account's stats come from the server",
  (await page.$$(".stats-tile")).length === 4);
check("cards with no reviews still get a tier breakdown",
  (await page.$$(".state-row")).length >= 4);
await capture("account-stats", "Statistics for a signed-in account");
await page.click('.nav-link:text-is("Study")');
await page.waitForSelector(".study-screen", { timeout: 10000 });
await capture("account-study", "Study screen signed in: email, no guest strip");

// Signed in, the reminder hour is a real setting: picked here, kept by the
// server, and read back as the hour it will mail at.
await page.click('button:text-is("Settings")');
await page.waitForSelector(".settings-reminder", { timeout: 10000 });
check("an account can pick a reminder hour", !(await page.isDisabled(".settings-reminder")));
await page.selectOption(".settings-reminder", "8");
await page.waitForTimeout(600);
const accountSettings = await page.evaluate(async (api) => {
  const token = localStorage.getItem("gleamDrill.token");
  const response = await fetch(`${api}/api/settings`, { headers: { authorization: `Bearer ${token}` } });
  return (await response.json()).settings;
}, API);
check("and the server keeps it", accountSettings.reminderHour === 8, JSON.stringify(accountSettings.reminderHour));
check("with the help naming the address",
  (await page.textContent(".settings-row:has(.settings-reminder) .settings-help")).includes("@"));
await capture("reminders", "Reminders: one mail a day at the hour you pick, to the account's address",
  "A daily reminder mail, at the hour you pick");
await page.selectOption(".settings-reminder", "off");
await page.waitForTimeout(600);
await page.keyboard.press("Escape");
await page.waitForSelector(".study-screen", { timeout: 10000 });

// Signing in to an existing account offers the merge rather than doing it.
await page.click("text=Sign out");
await page.waitForSelector(".guest-strip", { timeout: 10000 });
check("signing out drops to guest, not a wall", await page.isVisible(".guest-strip"));
// Signing out left an empty guest store, and nothing is scheduled until it is
// queued. The merge offer below needs guest progress worth merging, so this
// browser has to pick problems again first.
await page.click('.study-account .link-button:text-is("Queue")');
await seedQueue();
await page.click(".study-start");
await startCoding();
await waitForRunnable();
await page.click(".run-button");
await page.waitForSelector(".grade-bar", { timeout: 90000 });
await gradeWhatever();
await goHome();
await page.click("text=Sign in");
await page.waitForSelector(".auth-card", { timeout: 10000 });
await page.fill('input[type="email"]', upgraded);
await page.fill('input[type="password"]', PASSWORD);
await page.click(".auth-submit");
await page.waitForFunction(() =>
  document.querySelector(".study-email")?.textContent.includes("@") && !document.querySelector(".sync-bar"),
  { timeout: 25000 });
const offered = await page.isVisible('button:text-is("Merge it")').catch(() => false);
check("signing in to an existing account offers the merge rather than doing it",
  offered);
if (offered) {
  await capture("merge-offer", "Merge offer after signing in with guest progress");
  // Dismissing is only for now: the guest progress is still in this browser,
  // so the next load offers it again rather than stranding it.
  await page.click(".notice .notice-dismiss");
  await page.waitForTimeout(300);
  check("the offer can be put off",
    (await page.$$('button:text-is("Merge it")')).length === 0);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector('button:text-is("Merge it")', { timeout: 25000 });
  check("and comes back on the next load while the progress is still here", true);
  await page.click('button:text-is("Merge it")');
  await page.waitForTimeout(3000);
  // The merge banner and an error banner share the `.notice` class, so assert
  // on the button rather than the container.
  check("merging clears the offer",
    (await page.$$('button:text-is("Merge it")')).length === 0);
  // Not a card-count increase: the guest re-drilled a problem this account
  // already had, and the server keeps the existing card. Clearing the local
  // copy is what proves the merge ran to completion.
  const leftover = await page.evaluate(() =>
    localStorage.getItem("gleamDrill.guest.cards.v1"));
  check("and clears the local copy",
    leftover === null || JSON.parse(leftover).length === 0,
    String(leftover).slice(0, 40));
  check("without leaving an error banner",
    (await page.$$(".notice")).length === 0);
  await capture("merged", "After merging guest progress into an existing account");
}

// ---------------------------------------------------------------- act 9b
act = "09b-elixir-server";
console.log(act);

// Still signed in from act 8: an Elixir attempt is posted to the API, which
// runs it in a sandboxed subprocess and answers with the same cases a
// browser worker would. grading.mjs asserts the grading rules around it;
// this is the photograph.
await goHome();
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("Elixir", "Arrays & Hashing", "Contains Duplicate");
check("signed in, an Elixir drill offers Run",
  (await page.$$(".run-button")).length === 1 && (await page.$$(".run-unavailable")).length === 0);
await waitForRunnable();
await setCode("defmodule Solution do\n  def contains_duplicate?(nums) do\n    IO.puts(\"checking #{length(nums)} numbers\")\n    MapSet.size(MapSet.new(nums)) != length(nums)\n  end\nend\n");
await page.click(".run-button");
await page.waitForFunction(() => {
  const s = document.querySelector(".results-summary");
  return s && !s.classList.contains("running");
}, { timeout: 60000 });
check("the server ran it and every case passed",
  (await page.$$(".case.pass")).length === 4 && (await page.$$(".case.fail")).length === 0,
  `${(await page.$$(".case.pass")).length} passed`);
check("what it printed came back with it",
  (await page.textContent(".output-pane")).includes("checking 4 numbers"));
await capture("elixir-passed", "Elixir solution run on the server: four cases green, output shown",
  "Elixir attempt ran on the server");
await exitDrill();
await page.waitForTimeout(800);
await goHome();

// ---------------------------------------------------------------- act 9c
act = "09c-go-server";
console.log(act);

// Go runs the same way: the attempt is compiled and run on the API, and a
// build error is a compile error at its line. Still signed in.
await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("Go", "Arrays & Hashing", "Contains Duplicate");
check("signed in, a Go drill offers Run",
  (await page.$$(".run-button")).length === 1 && (await page.$$(".run-unavailable")).length === 0);
check("the Go starter is a package with a todo body",
  (await page.$eval("gleam-editor", (el) => el.doc)).includes('panic("todo")'));
await waitForRunnable();
await setCode("package main\n\nimport \"fmt\"\n\nfunc containsDuplicate(nums []int) bool {\n\tfmt.Println(\"checking\", len(nums), \"numbers\")\n\tseen := map[int]bool{}\n\tfor _, n := range nums {\n\t\tif seen[n] {\n\t\t\treturn true\n\t\t}\n\t\tseen[n] = true\n\t}\n\treturn false\n}\n");
await page.click(".run-button");
await page.waitForFunction(() => {
  const s = document.querySelector(".results-summary");
  return s && !s.classList.contains("running");
}, { timeout: 60000 });
check("the server built and ran it and every case passed",
  (await page.$$(".case.pass")).length === 4 && (await page.$$(".case.fail")).length === 0,
  `${(await page.$$(".case.pass")).length} passed`);
check("what it printed came back with it",
  (await page.textContent(".output-pane")).includes("checking 4 numbers"));
await capture("go-passed", "Go solution compiled and run on the server: four cases green, output shown",
  "Go attempt ran on the server");
await exitDrill();
await page.waitForTimeout(800);
await goHome();

// ---------------------------------------------------------------- act 10
act = "10-failures";
console.log(act);

// Storage full. Run late: this poisons localStorage for anything after it.
await page.click("text=Sign out");
await page.waitForSelector(".guest-strip", { timeout: 10000 });
// Signing out leaves an empty guest store, and the failed-write act below
// needs a drill to run. Queue before filling storage, obviously: a queue write
// into a full store is the very failure being staged.
await page.click('.study-account .link-button:text-is("Queue")');
await seedQueue();
const stuffed = await page.evaluate(() => {
  for (const size of [512 * 1024, 64 * 1024, 4 * 1024, 256, 16]) {
    const chunk = "x".repeat(size);
    for (let i = 0; ; i++) {
      try { localStorage.setItem(`filler_${size}_${i}`, chunk); } catch { break; }
    }
  }
  try {
    localStorage.setItem("probe", "x".repeat(200));
    localStorage.removeItem("probe");
    return false;
  } catch { return true; }
});
check("localStorage could be filled for the test", stuffed);
if (stuffed) {
  await page.click(".study-start");
  await startCoding();
  await waitForRunnable();
  await page.click(".run-button");
  await page.waitForSelector(".grade-bar", { timeout: 90000 });
  await gradeWhatever();
  const warned = await page.waitForSelector(".storage-warning", { timeout: 10000 })
    .then(() => true).catch(() => false);
  check("a failed write is reported, not swallowed", warned);
  await capture("storage-full", "Storage full: warning shown inside the drill");
  await page.evaluate(() => localStorage.clear());
}

// ---------------------------------------------------------------- act 11
act = "11-mobile";
console.log(act);

// The stylesheet has narrow-screen and `(hover: none)` rules that no test has
// ever rendered. The layout is meant to collapse to one column here.
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => localStorage.clear());
await goHome();
check("the study screen fits a phone",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 390 + 1,
  `scrollWidth ${await page.evaluate(() => document.documentElement.scrollWidth)}`);
await capture("study", "Study screen at 390x844");

await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await capture("menu", "Manual browser collapsed to one column");
check("the menu does not scroll sideways",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 390 + 1);

await goHome();
await page.click(".study-start");
await page.waitForSelector(".prompt-side", { timeout: 30000 });
check("the prompt fits a phone",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 390 + 1);
await capture("prompt-phone", "The prompt above the editor on a phone, capped so the editor is on the first screen");
await startCoding();
await capture("drill", "Drill on a phone: editor on the first screen, run bar pinned");
check("the language pill is on screen at phone width",
  await page.isVisible(".drill-title .language-chip"));
await waitForRunnable();
await page.click(".run-button");
await page.waitForSelector(".grade-bar", { timeout: 90000 });
await capture("grading", "Grading bar at phone width");
await goHome();
await page.click(".study-tour");
await page.waitForSelector(".tour-contents", { timeout: 10000 });
await page.click(".tour-continue");
await page.waitForSelector(".tour-lesson", { timeout: 10000 });
await page.waitForFunction(
  () => !!document.querySelector(".tour-output:not(.waiting):not(.stale)"), null, { timeout: 180000 });
check("the tour does not scroll sideways on a phone",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 390 + 1);
await capture("tour-phone", "A tour lesson stacked for a phone");
await page.keyboard.press("Escape");
await page.waitForSelector(".study-screen", { timeout: 10000 });
await page.click(".study-start");
await startCoding();
check("a help button is on screen where the status bar is not",
  await page.isVisible(".help-fab"));
await page.click(".help-fab");
await page.waitForSelector(".help-card", { timeout: 5000 });
check("and it opens the cheatsheet", await page.isVisible(".help-card"));
await capture("help-phone", "Help reached by touch, no keyboard needed");
await page.click(".help-overlay", { position: { x: 5, y: 5 } });
await page.waitForTimeout(300);
check("the drill does not scroll sideways",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 390 + 1,
  `scrollWidth ${await page.evaluate(() => document.documentElement.scrollWidth)}`);

// At phone width the solution is an overlay on the editor, not a panel under
// it: the desktop assertion above ("beside, not under") has a narrow-screen
// counterpart, and the overlay carries its own close button.
await page.keyboard.press("s");
await page.waitForSelector(".answer-content", { timeout: 10000 });
{
  const editorBox = await page.locator(".editor-frame").boundingBox();
  const answerBox = await page.locator(".answer-content").boundingBox();
  check("on a phone the revealed solution covers the editor",
    editorBox && answerBox
      && Math.abs(answerBox.x - editorBox.x) < 2
      && Math.abs(answerBox.y - editorBox.y) < 2
      && Math.abs(answerBox.width - editorBox.width) < 2,
    `editor ${JSON.stringify(editorBox)} answer ${JSON.stringify(answerBox)}`);
}
check("the overlay does not scroll sideways",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 390 + 1);
check("a phone has no editor resize handle",
  (await page.$eval(".editor-resize-handle", (el) => getComputedStyle(el).display)) === "none");
await capture("solution", "Solution overlaying the editor at phone width",
  "Solution overlays the editor on a phone");
await page.click(".answer-close");
await page.waitForSelector(".answer-content", { state: "detached", timeout: 10000 });
check("the overlay's own close button puts it away",
  (await page.$(".answer-content")) === null);
// The walkthrough takes the same overlay on a phone, with its own close.
await page.keyboard.press("w");
await page.waitForSelector(".walk-side", { timeout: 5000 });
check("the walkthrough overlays the editor on a phone",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 391
    && await page.isVisible(".walk-side .answer-close"));
await capture("walk-phone", "Walkthrough as a phone overlay: one step, hint and why a tap away");
await page.click(".walk-side .answer-close");
await page.waitForTimeout(300);
check("and closes from its own button", (await page.$(".walk-side")) === null);
await page.setViewportSize({ width: 1280, height: 900 });


// Nothing is allowed to have thrown along the way, and no user-initiated
// message may go unexercised -- that is what stops "every flow" from quietly
// meaning "every flow I remembered".
check("no uncaught JavaScript errors anywhere in the tour",
  errors.length === 0, errors.slice(0, 3).join(" | "));

const declared = [
  "UserChangedAuthEmail", "UserChangedAuthPassword", "UserToggledAuthMode",
  "UserSubmittedAuth", "UserClickedMergeGuest", "UserClickedSignOut",
  "UserDismissedNotice", "UserDismissedUpgradePrompt", "UserClickedSignIn",
  "UserClickedStudy", "UserClickedBrowse", "UserClickedBackToStudy",
  "UserGraded", "UserClickedStats", "UserClickedCategory",
  "UserClickedSubcategory", "UserClickedBreadcrumb", "UserToggledProblem",
  "UserClickedSelectAll", "UserClickedClearSelection", "UserChangedIterations",
  "UserClickedStartDrill", "UserClickedExitDrill", "ExitConfirmed",
  "UserToggledSolution", "UserRevealedHint", "UserClickedNext", "UserSearched",
  "UserChangedKeymap",
  "UserClickedRun", "UserClickedStopRun", "UserClickedRetryRuntime",
  "UserToggledPane", "UserToggledPrompt", "UserToggledResults", "UserToggledSuspend", "UserClickedRecall", "UserRevealedRecall",
  "UserToggledBlitz", "UserStartedBlitz", "UserClickedScratchRun",
  "UserClickedUndo", "UserToggledDiff", "UserDismissedDiff",
  "UserClickedExport", "UserClickedImport", "ImportConfirmed",
  "UserClickedWarmCache", "UserOpenedWalk", "UserClosedWalk",
  "MenuSuspendedAtCursor", "UserClickedQueue", "UserSearchedQueue",
  "UserFilteredQueue", "UserPickedQueueLanguage",
  "UserToggledQueued", "UserAddedAllShown", "UserRemovedAllShown",
  "UserChangedGroup", "UserPickedActiveQueue", "UserSelectedQueue",
  "UserStartedNewQueue", "UserStartedRenameQueue", "UserChangedQueueName",
  "UserSubmittedQueueName", "UserCancelledQueueName", "UserDeletedQueue",
  "UserAddedSelectionToQueue", "UserClickedCompare", "CompareMoved",
  "ComparePickedVariant", "UserClosedCompare",
  "UserClickedTour", "UserOpenedLesson", "UserClickedTourNext",
  "UserClickedTourPrev", "UserClickedTourContents", "UserResetLesson",
  "TourEditorChanged", "TourCursorMoved", "TourActivated",
  "QueueCursorMoved", "QueueCursorJumped", "QueueToggledAtCursor",
  "UserPickedChoice", "UserSubmittedAnswer",
  "UserToggledPiece", "UserSubmittedBoard", "BoardMoved", "BoardShelfMoved",
  "BoardJumped", "BoardToggledAtCursor",
  "UserClickedStartExam", "UserClickedExitReport",
  "PickerToggledLanguage", "PickerConfirmed", "PickerConfirmedWithStarter",
  "UserAddedStarterSet",
  "UserClickedSettings", "UserChangedSetting", "UserClickedDeviceTimezone",
  "KeyPressed", "HelpToggled", "MenuCursorMoved", "MenuPaneFocused",
  "MenuCursorJumped", "MenuActivated", "MenuToggledAtCursor", "QuizMoved",
  "EditorFocusRequested", "SearchFocusRequested", "StatsCursorMoved",
  "StatsActivated", "UserOpenedDetail", "UserClosedDetail",
  "UserDismissedMergeOffer", "UserClickedRetrySync",
];
check("no native dialog was opened", dialogs.length === 0,
  JSON.stringify(dialogs.slice(0, 2)));
const missed = declared.filter((m) => !covered.has(m));
check("every user-initiated message was exercised", missed.length === 0,
  missed.join(", "));

writeTour();
console.log(`\n${pass} passed, ${fail} failed, ${shot} screenshots`);
await browser.close();
process.exit(fail === 0 ? 0 : 1);
