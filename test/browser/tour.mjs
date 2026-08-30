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
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const APP = process.env.APP ?? "http://localhost:4173";
const API = process.env.API ?? "http://127.0.0.1:1637";
const SHOTS = process.env.SHOTS ?? join(tmpdir(), "algodrill-tour");
const PASSWORD = "correct-horse-battery";

mkdirSync(SHOTS, { recursive: true });

let pass = 0, fail = 0, shot = 0;
const results = [];
const covered = new Set();
let act = "start";

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
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Native dialogs block every subsequent command until answered, so the handler
// goes on before anything can trigger one. `confirm` backs the exit-drill guard
// and `alert` announces the end of a session.
const dialogs = [];
page.on("dialog", async (d) => {
  dialogs.push({ type: d.type(), message: d.message() });
  await d.accept();
});

const errors = [];
page.on("pageerror", (e) => errors.push(`${act}: ${e}`));
page.on("console", (m) => {
  // Chromium logs a non-2xx response as a console error. Several acts provoke
  // those on purpose -- a rejected sign-in, a refused password -- and they are
  // not JavaScript errors. Only genuine script failures are collected.
  const text = m.text();
  const expectedHttp = /Failed to load resource.*\b(401|409|422|429)\b/.test(text);
  // The Python worker mirrors the user program's tracebacks to the console
  // under a [python] prefix; several acts run deliberately broken programs.
  const mirroredTrace = text.startsWith("[python]");
  if (m.type() === "error" && !/favicon/i.test(text) && !expectedHttp
      && !mirroredTrace) {
    errors.push(`${act}: ${text}`);
  }
});

const capture = async (label, note) => {
  const name = `${String(++shot).padStart(2, "0")}-${act}-${label}.png`;
  await page.screenshot({ path: join(SHOTS, name) });
  results.push({ act, shot: name, note: note ?? label });
  console.log(`    shot ${name}`);
  return name;
};

const goHome = async () => {
  await page.goto(APP, { waitUntil: "networkidle" });
  await page.waitForSelector(".study-screen", { timeout: 20000 });
};

const freshGuest = async () => {
  await page.goto(APP, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.clear());
  await goHome();
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
  await page.waitForSelector(".run-bar", { timeout: 30000 });
};

const countServerCards = async () =>
  await page.evaluate(async (token) => {
    const r = await fetch("http://127.0.0.1:1637/api/state", {
      headers: { authorization: "Bearer " + token },
    });
    return (await r.json()).cards.length;
  }, await page.evaluate(() => localStorage.getItem("algoDrill.token")));

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
await capture("landing", "Guest landing: strip, counts, forecast, actions");

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
  JSON.stringify(languageRows) === '["Python","Gleam","TypeScript","Elixir","System Design"]',
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
check("the status bar switched to drill keys",
  (await page.textContent(".statusbar")).includes("again"));

const titleBefore = await page.textContent(".drill-title").catch(() => "");
await page.keyboard.press("i");
await page.waitForTimeout(200);
check("i focuses the editor",
  await page.evaluate(() => document.activeElement?.closest?.("gleam-editor") !== null
    || document.activeElement?.tagName === "GLEAM-EDITOR"
    || !!document.querySelector("gleam-editor .cm-focused")));

// Write, Ctrl+Enter, digit: the whole rep without the mouse.
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
dialogs.length = 0;
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
check("Esc exits the sitting (with the confirm)", dialogs.length > 0);

// ---------------------------------------------------------------- act 4
act = "04-python-drill";
console.log(act);
exercises("UserClickedStudy", "UserClickedRun", "UserGraded",
  "UserToggledSolution", "UserRevealedHint", "UserChangedKeymap",
  "UserClickedExitDrill", "ExitConfirmed");

await freshGuest();
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 30000 });
check("a scheduled session opens a drill", await page.isVisible(".run-bar"));
// A first encounter is the learning step: every grade is available before a
// single run, exactly like flipping a new Anki card.
check("a first encounter grades freely from the start",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
check("the output pane starts empty",
  (await page.textContent(".output-empty")).includes("Nothing printed"));
check("the approach starts unrevealed",
  (await page.$$(".approach-nudge, .approach-steps, .approach-pseudocode")).length === 0
    && await page.isVisible(".hint-button"));
await page.keyboard.press("a");
await page.waitForTimeout(300);
check("a reveals the nudge first", await page.isVisible(".approach-nudge"));
await page.keyboard.press("a");
await page.waitForTimeout(300);
check("then the steps, as a list", (await page.$$(".approach-steps li")).length >= 3);
check("the pseudocode button warns before it spoils",
  await page.isVisible(".hint-warning"));
await page.keyboard.press("a");
await page.waitForTimeout(300);
check("then the pseudocode", await page.isVisible(".approach-pseudocode"));
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

await page.click(".solution-button");
await page.waitForTimeout(500);
check("revealing on a first encounter keeps the choice",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
await capture("revealed", "Solution revealed on a first encounter: note, code, grades intact");
await page.click(".solution-button");
await page.waitForTimeout(400);

for (const mode of ["Vim", "Emacs", "Std"]) {
  await page.click(`.keymap-picker >> text="${mode}"`);
  await page.waitForTimeout(400);
  await capture(`keymap-${mode.toLowerCase()}`, `Editor keymap: ${mode}`);
}
check("all three keymaps are selectable", true);

const before = dialogs.length;
await page.click("text=Exit");
await page.waitForSelector(".study-screen", { timeout: 10000 });
check("exiting asks for confirmation", dialogs.length > before,
  `${dialogs.length - before} dialogs`);
check("and returns to the study screen", await page.isVisible(".study-screen"));

// ---------------------------------------------------------------- act 4b
act = "04b-honesty";
console.log(act);
// From the second review onward the rules tighten: a run is required, and a
// failed run leaves exactly one honest answer. Reached by re-opening the same
// problem manually — a manual drill posts a review regardless of due dates.
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 30000 });
await page.click(".grade-good");
await page.waitForTimeout(2000);
dialogs.length = 0;
await page.click("text=Exit");
await page.waitForSelector(".study-screen", { timeout: 10000 });

await page.click("text=Browse problems");
await page.waitForSelector(".menu-container", { timeout: 10000 });
await openByHand("Python", "Arrays & Hashing", "Contains Duplicate");
check("a later review requires a run before grading",
  (await page.textContent(".grade-hint").catch(() => "")).includes("Run the tests"));
await capture("gated", "Second review: grading waits for a run");
await waitForRunnable();
await page.click(".run-button");
await verdict();
check("a failed later run offers only Again",
  JSON.stringify(await gradeLabels()) === '["Again"]',
  JSON.stringify(await gradeLabels()));
await capture("forced-again", "Second review, failed run: the one honest answer");

// A passing later run keeps the full choice — until the pseudocode hint is
// revealed, which counts as seeing the answer.
await setCode("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await page.click(".run-button");
await verdict();
check("a passing later run offers every grade",
  JSON.stringify(await gradeLabels()) === ALL_FOUR,
  JSON.stringify(await gradeLabels()));
for (let i = 0; i < 3; i++) {
  await page.keyboard.press("a");
  await page.waitForTimeout(200);
}
check("revealing the pseudocode leaves the one honest answer",
  JSON.stringify(await gradeLabels()) === '["Again"]',
  JSON.stringify(await gradeLabels()));
await capture("hint-honesty", "Pseudocode revealed on a later review: Again only");
dialogs.length = 0;
await page.click("text=Exit");
await page.waitForTimeout(800);

// ---------------------------------------------------------------- act 4c
act = "04c-run-controls";
console.log(act);
exercises("UserClickedStopRun", "UserToggledSide");

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

// Collapsible prompt + the solution panel beside the editor.
await page.keyboard.press("p");
await page.waitForTimeout(400);
check("p collapses the prompt column to the toggle rail",
  (await page.$$(".drill-side .panel")).length === 0
    && await page.isVisible(".side-toggle"));
await capture("collapsed", "Prompt collapsed: editor takes the width");
await page.click(".solution-button");
await page.waitForTimeout(500);
const editorBox = await page.locator(".editor-frame").boundingBox();
const answerBox = await page.locator(".answer-content").boundingBox();
check("the revealed solution sits beside the editor, not under it",
  editorBox && answerBox
    && answerBox.x >= editorBox.x + editorBox.width - 1
    && answerBox.y < editorBox.y + editorBox.height,
  JSON.stringify({ editorBox, answerBox }));
await capture("side-solution", "Solution panel to the right of the editor");
await page.click(".solution-button");
await page.click(".side-toggle");
await page.waitForTimeout(300);
check("the toggle restores the prompt column",
  (await page.$$(".drill-side .panel")).length > 0);
dialogs.length = 0;
await page.click("text=Exit");
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
dialogs.length = 0;
await page.click("text=Exit");
await page.waitForTimeout(800);

// ---------------------------------------------------------------- act 5
act = "05-languages";
console.log(act);
const languages = [
  ["Gleam", "Arrays & Hashing", "Contains Duplicate",
   "import gleam/list\nimport gleam/set\n\npub fn contains_duplicate(nums: List(Int)) -> Bool {\n  set.size(set.from_list(nums)) != list.length(nums)\n}", true],
  ["TypeScript", "Arrays & Hashing", "Contains Duplicate",
   "export function containsDuplicate(nums: number[]): boolean {\n  return new Set(nums).size !== nums.length;\n}", true],
  ["Elixir", "Arrays & Hashing", "Contains Duplicate", null, false],
];

for (const [language, subcategory, title, code, runnable] of languages) {
  const slug = language.replace(/[^a-z]/gi, "").toLowerCase();
  await goHome();
  await page.click("text=Browse problems");
  await page.waitForSelector(".menu-container", { timeout: 10000 });
  await openByHand(language, subcategory, title);

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
    // Elixir ships no harness: nothing in a browser compiles Elixir source.
    check(`${language} says checking is unavailable`,
      (await page.textContent(".run-unavailable")).length > 0);
    // A drill with no harness must still be gradeable, or it is a dead end
    // that can never enter the schedule.
    check(`${language} is a flashcard proper: all four grades, no run`,
      (await page.$$(".grade-button")).length === 4,
      `${(await page.$$(".grade-button")).length} buttons`);
    await page.click(".solution-button");
    await page.waitForTimeout(500);
  }
  await capture(slug, `${language}: ${runnable ? "compiled, ran and passed" : "reveal-only, no harness"}`);
  dialogs.length = 0;
  await page.click("text=Exit");
  await page.waitForTimeout(800);
}

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
await page.waitForSelector(".run-bar", { timeout: 30000 });
await waitForRunnable();
await setCode("def containsDuplicate(nums):\n    return len(set(nums)) != len(nums)");
await page.click(".run-button");
await verdict();
await page.click(".grade-good");
await page.waitForTimeout(1500);
await page.click(".solution-button");
await page.waitForTimeout(400);
await page.click(".grade-hard");
await page.waitForTimeout(1500);
dialogs.length = 0;
await page.keyboard.press("Escape");
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
exercises("UserToggledLanguage", "UserToggledSuspend", "MenuSuspendedAtCursor");

// The language filter: chips on the study screen gate what a sitting serves.
check("five language chips render", (await page.$$(".language-chip")).length === 5);
await page.click('.language-chip:text-is("TypeScript")');
await page.waitForTimeout(300);
check("a muted chip shows it", (await page.$$(".language-chip.muted")).length === 1);
for (const label of ["Python", "Gleam", "Elixir", "System Design"]) {
  await page.click(`.language-chip:text-is("${label}")`);
  await page.waitForTimeout(150);
}
check("muting every language empties the queue",
  await page.$eval(".study-start", (b) => b.disabled));
await capture("all-muted", "Every language muted: nothing to study, honestly");
for (const label of ["Python", "Gleam", "TypeScript", "Elixir", "System Design"]) {
  await page.click(`.language-chip:text-is("${label}")`);
  await page.waitForTimeout(150);
}
check("unmuting restores the queue",
  !(await page.$eval(".study-start", (b) => b.disabled)));

// Suspend from the stats detail: park a reviewed card without lying to FSRS.
// The last chip click left a button focused, and focused buttons own the
// keyboard; hand it back before pressing t.
await page.evaluate(() => document.activeElement?.blur());
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

// ---------------------------------------------------------------- act 8
act = "08-upgrade";
console.log(act);
exercises("UserDismissedUpgradePrompt", "UserClickedMergeGuest");

// Seed past-dated cards so the prompt threshold is crossed without drilling
// ten problems. Dated into the past on purpose: ten cards introduced *today*
// would exhaust the daily new-card budget and correctly disable Study now.
await page.evaluate(() => {
  const cards = JSON.parse(localStorage.getItem("algoDrill.guest.cards.v1") ?? "[]");
  const longAgo = Math.floor(Date.now() / 1000) - 10 * 86400;
  for (let i = 0; i < 12; i++) {
    cards.push({
      ...cards[0], title: `Seeded ${i}`, subcategory: "Arrays & Hashing",
      category: "NeetCode 150 · Python", state: 2, step: null,
      stability: 30, difficulty: 5,
      due: Math.floor(Date.now() / 1000) + 20 * 86400,
      lastReview: longAgo, introducedAt: longAgo,
    });
  }
  localStorage.setItem("algoDrill.guest.cards.v1", JSON.stringify(cards));
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

const upgraded = `tour-upgrade-${Date.now()}@example.com`;
await page.click("text=Create account");
await page.waitForSelector(".auth-card", { timeout: 10000 });
await page.fill('input[type="email"]', upgraded);
await page.fill('input[type="password"]', PASSWORD);
await page.click(".auth-submit");
await page.waitForSelector(".study-screen", { timeout: 25000 });
await page.waitForTimeout(2500);
check("signing up signs you in",
  (await page.textContent(".study-email")) === upgraded);
check("the guest strip is gone", !(await page.isVisible(".guest-strip")));
const serverCards = await page.evaluate(async (token) => {
  const r = await fetch("http://127.0.0.1:1637/api/state", {
    headers: { authorization: "Bearer " + token },
  });
  return (await r.json()).cards.length;
}, await page.evaluate(() => localStorage.getItem("algoDrill.token")));
check("every guest card moved to the account", serverCards === 14,
  `${serverCards} on server`);
await capture("upgraded", "Signed in, guest progress merged, no strip");

// ---------------------------------------------------------------- act 9
act = "09-account";
console.log(act);
exercises("UserClickedSignOut", "UserDismissedNotice");

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
await page.click("text=Back");
await page.waitForSelector(".study-screen", { timeout: 10000 });
await capture("account-study", "Study screen signed in: email, no guest strip");

// Signing in to an existing account offers the merge rather than doing it.
await page.click("text=Sign out");
await page.waitForSelector(".guest-strip", { timeout: 10000 });
check("signing out drops to guest, not a wall", await page.isVisible(".guest-strip"));
await page.click(".study-start");
await page.waitForSelector(".run-bar", { timeout: 30000 });
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
await page.waitForSelector(".study-screen", { timeout: 25000 });
await page.waitForTimeout(2000);
const offered = await page.isVisible('button:text-is("Merge it")').catch(() => false);
check("signing in to an existing account offers the merge rather than doing it",
  offered);
if (offered) {
  await capture("merge-offer", "Merge offer after signing in with guest progress");
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
    localStorage.getItem("algoDrill.guest.cards.v1"));
  check("and clears the local copy",
    leftover === null || JSON.parse(leftover).length === 0,
    String(leftover).slice(0, 40));
  check("without leaving an error banner",
    (await page.$$(".notice")).length === 0);
  await capture("merged", "After merging guest progress into an existing account");
}

// ---------------------------------------------------------------- act 10
act = "10-failures";
console.log(act);

// Storage full. Run late: this poisons localStorage for anything after it.
await page.click("text=Sign out");
await page.waitForSelector(".guest-strip", { timeout: 10000 });
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
  await page.waitForSelector(".run-bar", { timeout: 30000 });
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
await page.waitForSelector(".run-bar", { timeout: 30000 });
await capture("drill", "Drill on a phone: editor on the first screen, run bar pinned");
await waitForRunnable();
await page.click(".run-button");
await page.waitForSelector(".grade-bar", { timeout: 90000 });
await capture("grading", "Grading bar at phone width");
check("the drill does not scroll sideways",
  (await page.evaluate(() => document.documentElement.scrollWidth)) <= 390 + 1,
  `scrollWidth ${await page.evaluate(() => document.documentElement.scrollWidth)}`);
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
  "UserToggledSide", "UserToggledLanguage", "UserToggledSuspend",
  "MenuSuspendedAtCursor", "UserPickedChoice", "UserSubmittedAnswer",
  "UserClickedStartExam", "UserClickedExitReport",
  "KeyPressed", "HelpToggled", "MenuCursorMoved", "MenuPaneFocused",
  "MenuCursorJumped", "MenuActivated", "MenuToggledAtCursor", "QuizMoved",
  "EditorFocusRequested", "SearchFocusRequested", "StatsCursorMoved",
  "StatsActivated", "UserOpenedDetail", "UserClosedDetail",
];
const missed = declared.filter((m) => !covered.has(m));
check("every user-initiated message was exercised", missed.length === 0,
  missed.join(", "));

writeFileSync(join(SHOTS, "tour.json"),
  JSON.stringify({ results, errors, dialogs, covered: [...covered] }, null, 1));
console.log(`\n${pass} passed, ${fail} failed, ${shot} screenshots`);
await browser.close();
process.exit(fail === 0 ? 0 : 1);
