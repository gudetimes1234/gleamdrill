// Blocking dialogs (legacy UX kept deliberately) and a keyed debounce used to
// coalesce editor keystrokes into one localStorage write.

const timers = new Map();

export function debounce(key, ms, callback) {
  clearTimeout(timers.get(key));
  timers.set(key, setTimeout(callback, ms));
}

export function confirmDialog(message) {
  return confirm(message);
}

export function alertDialog(message) {
  alert(message);
}

// Used to sample and order exam questions. Gleam has no stdlib randomness on
// the JavaScript target, and an exam that asks the same questions in the same
// order every sitting measures memory of the exam, not of the material.
export function randomInt(bound) {
  return bound <= 0 ? 0 : Math.floor(Math.random() * bound);
}

// Where the backend lives.
//
// Local development always wins, so a `make dev` session can never accidentally
// post reviews to production. The ports are named rather than the hostname
// alone because a container serving the built app on localhost is *not* a dev
// session and must not be redirected: :1234 is `make dev`, :4173 is
// `make serve-dist` and the browser suites.
//
// After that, a <meta name="algodrill-api"> tag wins if one is set, which is
// how a split-origin deployment points the app at a backend on another domain.
// Otherwise the backend is assumed to share this origin, reached through a
// reverse proxy at /api/* — see deploy/Caddyfile. That default is what lets the
// app be self-hosted on any domain with nothing baked into the artifact.
export function apiBase() {
  const { hostname, port, origin } = globalThis.location;
  const local = hostname === "localhost" || hostname === "127.0.0.1";
  if (local && (port === "1234" || port === "4173")) {
    return "http://127.0.0.1:1637";
  }
  const meta = document.querySelector('meta[name="algodrill-api"]')?.content;
  return meta || origin;
}

// Wall-clock milliseconds, for the review log's `duration_ms`. `Date.now` and
// not `performance.now`: the value is only ever used as a difference, and this
// one survives the page being backgrounded mid-drill.
export function nowMs() {
  return Date.now();
}

// Start of the current study day, as epoch seconds.
//
// The day rolls over at `dayStartHour` local time -- Anki's 4am rollover, so a
// late-night session counts toward the day it feels like rather than the one
// the clock says. Signed in, Postgres does this arithmetic; as a guest there
// is no server, and `Date` does local arithmetic that follows DST without
// shipping a timezone database.
export function studyDayStart(dayStartHour) {
  const now = new Date();
  const start = new Date(now);
  start.setHours(dayStartHour, 0, 0, 0);
  if (now.getTime() < start.getTime()) start.setDate(start.getDate() - 1);
  return Math.floor(start.getTime() / 1000);
}

// The current study day as an integer day number, used to key daily tallies.
//
// Derived from the local *calendar date* after shifting back by the rollover
// hour, not from `studyDayStart / 86400`. That division looks equivalent and
// is not: across a daylight-saving change two consecutive study days are
// 82800 or 90000 seconds apart, so the quotient can repeat or skip, and a
// streak would break twice a year. Consecutive local dates never do that.
export function studyDayIndex(dayStartHour) {
  const shifted = new Date(Date.now() - dayStartHour * 3600 * 1000);
  return Math.floor(
    Date.UTC(shifted.getFullYear(), shifted.getMonth(), shifted.getDate()) / 86400000,
  );
}

// The browser's IANA zone, e.g. "America/New_York". Sent at signup so the
// account's study day rolls over where the user actually is.
export function timeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
  } catch {
    return "UTC";
  }
}

// The document-level key listener behind the TUI bindings.
//
// Every keydown is classified by where it landed before the app sees it:
//   "editor"  — inside <gleam-editor>. Its vim/emacs keymaps own the keyboard;
//               the app intercepts nothing here except Ctrl+Enter (run).
//   "input"   — search or a form field. Only Escape (blur) is meaningful.
//   "control" — a focused button or link. Native activation wins; the app
//               stays out entirely, or Tab-navigation would break.
//   "none"    — the app owns the key.
//
// preventDefault must be decided synchronously, so the handled-key set lives
// here rather than in Gleam: Space would scroll the page, "/" opens quick-find
// in Firefox, and the browser must not see either when the app is handling it.
const APP_KEYS = new Set([
  "j", "k", "h", "l", "g", "G", "x", "a", "c", "d", "s", "n", "r", "b", "t",
  "i", "e", "z", "?", "/", "1", "2", "3", "4", "Enter", " ",
]);

export function onKey(callback) {
  document.addEventListener("keydown", (event) => {
    const path = event.composedPath();
    const target = path[0];
    const tag = target?.tagName;
    let editing = "none";
    if (path.some((el) => el?.tagName === "GLEAM-EDITOR")) editing = "editor";
    else if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable)
      editing = "input";
    else if (tag === "BUTTON" || tag === "A" || tag === "SUMMARY")
      editing = "control";

    const ctrl = event.ctrlKey || event.metaKey;
    if (editing === "editor") {
      if (ctrl && event.key === "Enter") event.preventDefault();
      else return; // the editor's own keymaps own everything else
    } else if (editing === "none" && !ctrl && APP_KEYS.has(event.key)) {
      event.preventDefault();
    }

    callback(event.key, ctrl, event.shiftKey, editing);
  });
}

export function focusElement(selector) {
  document.querySelector(selector)?.focus();
}

export function blurActive() {
  document.activeElement?.blur();
}

// Keeps the TUI cursor on screen as j/k walks a pane list.
export function scrollIntoViewById(id) {
  document.getElementById(id)?.scrollIntoView({ block: "nearest" });
}

// Query-string escaping for the history endpoint: the problem key is three
// free-text fields ("Arrays & Hashing" included).
export function uriEncode(value) {
  return encodeURIComponent(value);
}
