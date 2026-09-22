// The system design board: the one drill kind with no editor, no harness and
// no self-grade bar.
//
// Run with `make e2e`. Unlike the other suites this needs no backend -- the
// board is graded in the browser and recorded through the guest store, so the
// whole path is observable from localStorage.
//
// Two of these checks exist because of a specific trap: a board carries
// neither a Check nor a Quiz, and the app's kind classifier used to map that
// combination to "reveal-only", which opens the four self-grade buttons. A
// board that grades itself must never show them, and it must never get the
// code editor either.
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

// A fresh browser meets the first-run picker before anything else. The board
// is opened by hand through the pane browser rather than through the queue, so
// the picker only has to be got out of the way.
const answerPickerIfShown = async () => {
  await page.waitForSelector(".study-screen, .picker-screen, .queue-screen",
    { timeout: 20000 });
  if (await page.isVisible(".picker-screen")) {
    await page.click(".picker-option:nth-child(1)");
    await page.waitForTimeout(120);
    await page.click(".picker-start");
    await page.waitForSelector(".study-screen, .queue-screen", { timeout: 20000 });
  }
  if (await page.isVisible(".queue-screen")) {
    await page.click(".queue-header .link-button");
  }
  await page.waitForSelector(".study-screen", { timeout: 20000 });
};

const openBoard = async (subcategory, title) => {
  await page.click("text=Browse problems");
  await page.waitForSelector(".menu-container", { timeout: 10000 });
  await page.click('.pane-item:text-is("System Design Board")');
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
  await page.waitForSelector(".board-palette", { timeout: 20000 });
};

console.log("== the board opens whole");
await page.goto(APP, { waitUntil: "networkidle" });
await answerPickerIfShown();
await openBoard("Designs", "Design a URL shortener");

const chips = (await page.$$(".board-chip")).length;
check("the whole palette is on screen", chips === 36, `${chips} chips`);
check("laid out as six shelves", (await page.$$(".board-shelf")).length === 6);
check("every chip carries its one-line reminder",
  (await page.$$(".board-chip-why")).length === 36);

console.log("== and it is not a code drill");
check("no editor", (await page.$("gleam-editor")) === null);
check("no run bar button", (await page.$(".run-button")) === null);
check("no self-grade bar", (await page.$(".grade-bar")) === null);
check("the context label says BOARD",
  (await page.textContent(".statusbar-context") ?? "").includes("BOARD"));

console.log("== nothing is given away before submitting");
check("no chip is marked right, wrong or missing",
  (await page.$$(".board-chip.hit, .board-chip.missed, .board-chip.wrong, .board-chip.neutral")).length === 0);
check("submitting an empty board is not offered",
  await page.isDisabled('button:text-is("Submit board")'));

console.log("== keyboard and mouse place pieces");
await page.keyboard.press("j");
await page.keyboard.press("j");
await page.keyboard.press(" ");
await page.waitForTimeout(250);
check("space places the piece under the cursor",
  (await page.$$(".board-chip.picked")).length === 1);
await page.keyboard.press(" ");
await page.waitForTimeout(250);
check("and space again takes it off",
  (await page.$$(".board-chip.picked")).length === 0);
await page.keyboard.press(" ");
await page.waitForTimeout(250);

const spare = await page.$$(".board-chip:not(.picked)");
await spare[2].click();
await spare[8].click();
await page.waitForTimeout(250);
check("clicking a chip places it",
  (await page.$$(".board-chip.picked")).length === 3);
check("the bar counts what is on the board",
  (await page.textContent(".board-count") ?? "").startsWith("3 pieces"));

console.log("== submitting grades it");
await page.click('button:text-is("Submit board")');
await page.waitForSelector(".results-summary", { timeout: 10000 });
check("a verdict appears", (await page.$$(".results-summary")).length === 1);
// Three arbitrary picks against a seven-piece answer key: something must be
// missing, and the missing pieces have to be named.
check("the palette is annotated",
  (await page.$$(".board-chip.missed")).length > 0);
check("and the verdict lists what was missing",
  (await page.$$(".board-missed .board-verdict-list li")).length > 0);
check("a graded board still offers no grade bar",
  (await page.$(".grade-bar")) === null);
check("only Next remains", (await page.$$('button:text-is("Next")')).length === 1);
check("the board is read-only once graded",
  await page.isDisabled(".board-chip"));

console.log("== and the review lands");
const cards = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("gleamDrill.guest.cards.v1") ?? "[]"));
const answered = cards.filter((c) => c.reps > 0);
check("exactly one card was answered", answered.length === 1, `got ${answered.length}`);
check("it is the board drill",
  answered[0]?.title === "Design a URL shortener",
  JSON.stringify(answered[0]?.title));
check("with a schedule of its own",
  typeof answered[0]?.stability === "number" && answered[0].stability > 0,
  JSON.stringify(answered[0]?.stability));
const log = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("gleamDrill.guest.reviews.v1") ?? "[]"));
check("and one row in the review log", log.length === 1, `${log.length} rows`);
// Three arbitrary picks against a seven-piece key cannot reach half, and a
// board that cannot reach half is an Again (rating 1).
check("a board that names three of seven is an Again",
  log[0]?.rating === 1, JSON.stringify(log[0]?.rating));
check("and the log records it as auto-failed",
  log[0]?.autoFailed === true && log[0]?.revealed === false);

console.log("== a perfect primitive is an Easy");
await page.click('button:text-is("Next")').catch(() => {});
await page.waitForTimeout(600);
await page.goto(APP, { waitUntil: "networkidle" });
await page.waitForSelector(".study-screen", { timeout: 20000 });
await openBoard("Primitives", "One caller, everybody's problem");
// The answer key is a single piece, and the palette is in board order, so the
// rate limiter can be clicked by name.
await page.click('.board-chip:has(.board-chip-label:text-is("Rate limiter"))');
await page.waitForTimeout(250);
await page.click('button:text-is("Submit board")');
await page.waitForSelector(".results-summary", { timeout: 10000 });
check("a clean primitive shows no missing pieces",
  (await page.$$(".board-chip.missed")).length === 0);
check("and nothing spurious",
  (await page.$$(".board-chip.wrong")).length === 0);
const second = await page.evaluate(() =>
  JSON.parse(localStorage.getItem("gleamDrill.guest.reviews.v1") ?? "[]"));
// Rating 4 is Easy: everything, nothing spurious, well inside the minute a
// primitive is allowed. The app decides this -- there is no grade bar to
// press -- so the number in the log is the whole proof that it decided right.
check("a clean, fast primitive grades itself Easy",
  second[0]?.rating === 4, JSON.stringify(second[0]?.rating));
check("and the board scored it whole",
  (await page.textContent(".results-verdict")) === "1/1",
  await page.textContent(".results-verdict"));

check("no uncaught JavaScript errors", errors.length === 0, errors.slice(0, 3).join(" | "));
await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
