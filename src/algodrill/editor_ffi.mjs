// The <gleam-editor> custom element: a CodeMirror 6 editor with a hand-written
// Gleam tokenizer. A custom element rather than Lustre-rendered DOM because
// CodeMirror must own its subtree — Lustre renders <gleam-editor> with no
// children, so its diff never reaches inside.
//
// Interface, driven from editor.gleam:
//   property "doc"          — string; dispatches a CodeMirror transaction only
//                             when it differs from the current document
//   property "diagnostics"  — [{line, column, message}] (1-based), underlined
//   event    "editor-change" — {detail: {value}} on every document change

import {
  EditorState,
  Compartment,
  Prec,
  StateEffect,
  StateField,
} from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  drawSelection,
  showPanel,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  StreamLanguage,
  syntaxHighlighting,
  HighlightStyle,
  bracketMatching,
  indentUnit,
} from "@codemirror/language";
import { setDiagnostics } from "@codemirror/lint";
import { tags } from "@lezer/highlight";
import {
  cursorCharLeft,
  cursorCharRight,
  cursorGroupLeft,
  cursorGroupRight,
  cursorLineUp,
  cursorLineDown,
  cursorLineStart,
  cursorLineEnd,
  cursorDocStart,
  cursorDocEnd,
  cursorPageDown,
  cursorPageUp,
  deleteCharForward,
  deleteGroupForward,
  undo,
  redo,
} from "@codemirror/commands";
import { python } from "@codemirror/legacy-modes/mode/python";
import { typescript } from "@codemirror/legacy-modes/mode/javascript";

// Both @replit/codemirror-emacs and @replit/codemirror-vim are broken against
// current @codemirror/view: their keydown handlers never engage. Each installs
// it from a ViewPlugin constructor that does real work, and when that
// constructor throws CodeMirror catches it, logs "CodeMirror plugin crashed"
// and silently deactivates the plugin — leaving an editor that types normally.
// So both keymaps are hand-written here instead, deliberately out of anything
// with a constructor that can fail. Emacs is a flat keymap with a one-slot kill
// buffer for C-k / C-y; vim is the modal state machine further down.
let killBuffer = "";

function killToLineEnd(view) {
  const { state } = view;
  const line = state.doc.lineAt(state.selection.main.head);
  const from = state.selection.main.head;
  const to = from === line.to ? Math.min(line.to + 1, state.doc.length) : line.to;
  if (from === to) return false;
  killBuffer = state.sliceDoc(from, to);
  view.dispatch({ changes: { from, to }, userEvent: "delete" });
  return true;
}

function yank(view) {
  if (!killBuffer) return false;
  const { from, to } = view.state.selection.main;
  view.dispatch({
    changes: { from, to, insert: killBuffer },
    selection: { anchor: from + killBuffer.length },
    userEvent: "input",
  });
  return true;
}

const emacsKeymap = keymap.of([
  { key: "Ctrl-f", run: cursorCharRight },
  { key: "Ctrl-b", run: cursorCharLeft },
  { key: "Ctrl-n", run: cursorLineDown },
  { key: "Ctrl-p", run: cursorLineUp },
  { key: "Ctrl-a", run: cursorLineStart },
  { key: "Ctrl-e", run: cursorLineEnd },
  { key: "Alt-f", run: cursorGroupRight },
  { key: "Alt-b", run: cursorGroupLeft },
  { key: "Ctrl-d", run: deleteCharForward },
  { key: "Alt-d", run: deleteGroupForward },
  { key: "Ctrl-k", run: killToLineEnd },
  { key: "Ctrl-y", run: yank },
  { key: "Ctrl-v", run: cursorPageDown },
  { key: "Alt-v", run: cursorPageUp },
  { key: "Alt-Shift-,", run: cursorDocStart },
  { key: "Alt-Shift-.", run: cursorDocEnd },
]);

// ---------------------------------------------------------------------------
// Vim: normal and insert modes, motions, and the d/c/y operators. Deliberately
// partial — no visual mode, search, ex commands, marks, macros or `.` repeat.
//
// A flat keymap can't express counts (3dd), operator-pending (d + motion) or
// the g prefix, so one keydown handler drives a small state machine instead.
// The pending keys live in a StateField rather than a module variable so the
// status panel can render them and so two editors never share a half-typed
// command.
// ---------------------------------------------------------------------------

const setVim = StateEffect.define();

const VIM_IDLE = { count: "", operator: null, pending: "" };

const vimState = StateField.define({
  create: () => ({ mode: "normal", ...VIM_IDLE }),
  update(value, tr) {
    for (const effect of tr.effects) {
      if (effect.is(setVim)) value = { ...value, ...effect.value };
    }
    return value;
  },
});

// The unnamed register. `linewise` records whether the text was taken with its
// newline (dd/yy), which is what decides where p and P put it back.
let vimRegister = { text: "", linewise: false };

function vimPatch(view, patch) {
  view.dispatch({ effects: setVim.of(patch) });
}

function charAt(doc, pos) {
  return pos >= 0 && pos < doc.length ? doc.sliceString(pos, pos + 1) : "";
}

// Vim's three character classes: a word is a run of one class, so `w` from
// inside `foo.bar` stops on the dot.
function charClass(ch) {
  if (!ch || /\s/.test(ch)) return "space";
  return /[A-Za-z0-9_]/.test(ch) ? "word" : "punct";
}

function wordForward(doc, pos) {
  let i = pos;
  const cls = charClass(charAt(doc, i));
  if (cls !== "space") {
    while (i < doc.length && charClass(charAt(doc, i)) === cls) i++;
  }
  while (i < doc.length && charClass(charAt(doc, i)) === "space") i++;
  return i;
}

function wordBackward(doc, pos) {
  let i = pos - 1;
  while (i >= 0 && charClass(charAt(doc, i)) === "space") i--;
  if (i < 0) return 0;
  const cls = charClass(charAt(doc, i));
  while (i >= 0 && charClass(charAt(doc, i)) === cls) i--;
  return i + 1;
}

function wordEnd(doc, pos) {
  let i = pos + 1;
  while (i < doc.length && charClass(charAt(doc, i)) === "space") i++;
  if (i >= doc.length) return Math.max(0, doc.length - 1);
  const cls = charClass(charAt(doc, i));
  while (i + 1 < doc.length && charClass(charAt(doc, i + 1)) === cls) i++;
  return i;
}

function firstNonSpace(line) {
  return line.from + /^\s*/.exec(line.text)[0].length;
}

// Resolves a motion key to a document offset, so bare motions and operators can
// share one implementation. `operator` widens the two motions whose reach
// differs between the two uses: l and $ may land past the last character when
// something is about to be deleted, but not when the cursor merely moves.
// Returns null for a key that isn't a motion. `inclusive` means the character
// at the target is part of an operator's range (vim's `e`).
function vimMotion(view, key, count, operator) {
  const { doc, selection } = view.state;
  const pos = selection.main.head;
  const line = doc.lineAt(pos);
  const n = count || 1;
  switch (key) {
    case "h":
      return { pos: Math.max(line.from, pos - n) };
    case "l":
      return {
        pos: Math.min(operator ? line.to : Math.max(line.from, line.to - 1), pos + n),
      };
    case "j":
    case "k": {
      let range = selection.main;
      for (let i = 0; i < n; i++) range = view.moveVertically(range, key === "j");
      return { pos: range.head, linewise: true };
    }
    case "w": {
      let p = pos;
      for (let i = 0; i < n; i++) p = wordForward(doc, p);
      return { pos: p };
    }
    case "b": {
      let p = pos;
      for (let i = 0; i < n; i++) p = wordBackward(doc, p);
      return { pos: p };
    }
    case "e": {
      let p = pos;
      for (let i = 0; i < n; i++) p = wordEnd(doc, p);
      return { pos: p, inclusive: true };
    }
    case "0":
      return { pos: line.from };
    case "^":
      return { pos: firstNonSpace(line) };
    case "$":
      return { pos: operator ? line.to : Math.max(line.from, line.to - 1) };
    case "gg":
    case "G": {
      const target = count
        ? Math.min(Math.max(count, 1), doc.lines)
        : key === "gg"
          ? 1
          : doc.lines;
      return { pos: firstNonSpace(doc.line(target)), linewise: true };
    }
    default:
      return null;
  }
}

// Normal mode's cursor sits ON a character, never past the end of the line.
function vimSetCursor(view, pos) {
  const { doc } = view.state;
  const clamped = Math.max(0, Math.min(pos, doc.length));
  const line = doc.lineAt(clamped);
  view.dispatch({
    selection: { anchor: Math.min(clamped, Math.max(line.from, line.to - 1)) },
    scrollIntoView: true,
  });
}

function vimEnterInsert(view, pos) {
  const effects = setVim.of({ mode: "insert", ...VIM_IDLE });
  if (pos === undefined) view.dispatch({ effects });
  else view.dispatch({ selection: { anchor: pos }, effects, scrollIntoView: true });
}

// Esc steps the cursor back onto the last character typed, so A<Esc>x behaves.
function vimExitInsert(view) {
  const { head } = view.state.selection.main;
  const line = view.state.doc.lineAt(head);
  view.dispatch({
    selection: { anchor: head > line.from ? head - 1 : head },
    effects: setVim.of({ mode: "normal", ...VIM_IDLE }),
  });
}

// The whole-line span an operator covers, including the newline that makes the
// line disappear — the one before it when there is no line after.
function vimLineSpan(doc, pos, count) {
  const first = doc.lineAt(pos);
  const last = doc.line(Math.min(first.number + Math.max(count, 1) - 1, doc.lines));
  const text = doc.sliceString(first.from, last.to) + "\n";
  if (last.to < doc.length) return { from: first.from, to: last.to + 1, text };
  return { from: Math.max(0, first.from - 1), to: last.to, text };
}

// Characterwise d/c/y over an explicit span. Linewise operators go through
// vimOperateLine instead, because they also swallow a newline.
function vimOperate(view, operator, from, to) {
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  vimRegister = { text: view.state.sliceDoc(start, end), linewise: false };

  if (operator === "y") {
    vimSetCursor(view, start);
    return;
  }
  if (operator === "d") {
    view.dispatch({ changes: { from: start, to: end }, userEvent: "delete" });
    vimSetCursor(view, start);
    return;
  }
  // c: the deletion and the mode switch are one transaction so a single undo
  // puts the text back.
  view.dispatch({
    changes: { from: start, to: end },
    selection: { anchor: start },
    effects: setVim.of({ mode: "insert", ...VIM_IDLE }),
    userEvent: "delete",
    scrollIntoView: true,
  });
}

// dd / cc / yy. cc keeps the indentation and the line itself, matching vim with
// autoindent on.
function vimOperateLine(view, operator, count) {
  const { doc } = view.state;
  const pos = view.state.selection.main.head;
  if (operator === "c") {
    const line = doc.lineAt(pos);
    const last = doc.line(Math.min(line.number + Math.max(count, 1) - 1, doc.lines));
    const from = firstNonSpace(line);
    vimRegister = { text: doc.sliceString(from, last.to) + "\n", linewise: true };
    view.dispatch({
      changes: { from, to: last.to },
      selection: { anchor: from },
      effects: setVim.of({ mode: "insert", ...VIM_IDLE }),
      userEvent: "delete",
      scrollIntoView: true,
    });
    return;
  }
  const span = vimLineSpan(doc, pos, count);
  vimRegister = { text: span.text, linewise: true };
  if (operator === "y") {
    vimSetCursor(view, doc.lineAt(pos).from);
    return;
  }
  view.dispatch({ changes: { from: span.from, to: span.to }, userEvent: "delete" });
  const landing = Math.min(span.from, view.state.doc.length);
  vimSetCursor(view, firstNonSpace(view.state.doc.lineAt(landing)));
}

function vimPaste(view, after, count) {
  if (!vimRegister.text) return;
  const { doc } = view.state;
  const pos = view.state.selection.main.head;
  const body = vimRegister.text.repeat(Math.max(count, 1));
  const line = doc.lineAt(pos);
  if (vimRegister.linewise) {
    // The register keeps its trailing newline; move it to whichever end of the
    // insertion opens the new line, so pasting below the last line still works.
    const text = body.endsWith("\n") ? body.slice(0, -1) : body;
    const from = after ? line.to : line.from;
    const insert = after ? "\n" + text : text + "\n";
    view.dispatch({ changes: { from, insert }, userEvent: "input.paste" });
    const landing = after ? line.to + 1 : line.from;
    vimSetCursor(view, firstNonSpace(view.state.doc.lineAt(landing)));
    return;
  }
  const at = after ? Math.min(pos + 1, line.to) : pos;
  view.dispatch({
    changes: { from: at, insert: body },
    userEvent: "input.paste",
  });
  vimSetCursor(view, at + body.length - 1);
}

function vimOpenLine(view, below) {
  const { doc } = view.state;
  const line = doc.lineAt(view.state.selection.main.head);
  const indent = /^\s*/.exec(line.text)[0];
  const from = below ? line.to : line.from;
  const insert = below ? "\n" + indent : indent + "\n";
  view.dispatch({
    changes: { from, insert },
    selection: { anchor: from + insert.length - (below ? 0 : 1) },
    effects: setVim.of({ mode: "insert", ...VIM_IDLE }),
    userEvent: "input",
    scrollIntoView: true,
  });
}

function vimJoin(view, count) {
  const { doc } = view.state;
  const line = doc.lineAt(view.state.selection.main.head);
  let to = line.to;
  let joins = 0;
  for (let n = Math.max(count - 1, 1); n > 0; n--) {
    const next = doc.lineAt(to).number + 1;
    if (next > doc.lines) break;
    to = doc.line(next).to;
    joins++;
  }
  if (!joins) return;
  // Collapse each break and the following indentation into a single space.
  const joined = doc.sliceString(line.from, to).replace(/\n\s*/g, " ");
  view.dispatch({
    changes: { from: line.from, to, insert: joined },
    userEvent: "input",
  });
  // Vim leaves the cursor on the seam, not at the end of the joined line.
  vimSetCursor(view, line.from + line.text.replace(/\s+$/, "").length);
}

function vimDeleteChars(view, count, thenInsert) {
  const { doc } = view.state;
  const pos = view.state.selection.main.head;
  const line = doc.lineAt(pos);
  const to = Math.min(line.to, pos + Math.max(count, 1));
  if (to === pos) return;
  vimRegister = { text: doc.sliceString(pos, to), linewise: false };
  if (thenInsert) {
    view.dispatch({
      changes: { from: pos, to },
      selection: { anchor: pos },
      effects: setVim.of({ mode: "insert", ...VIM_IDLE }),
      userEvent: "delete",
    });
    return;
  }
  view.dispatch({ changes: { from: pos, to }, userEvent: "delete" });
  vimSetCursor(view, pos);
}

// An operator has a motion (or the g prefix resolved to gg): run it.
function vimRunOperator(view, operator, motionKey, count) {
  const from = view.state.selection.main.head;
  const target = vimMotion(view, motionKey, count, true);
  if (!target) {
    vimPatch(view, VIM_IDLE);
    return;
  }
  if (target.linewise) {
    // dj / dG etc. take whole lines between here and there.
    const { doc } = view.state;
    const a = doc.lineAt(from).number;
    const b = doc.lineAt(Math.max(0, Math.min(target.pos, doc.length))).number;
    const top = doc.line(Math.min(a, b));
    vimSetCursor(view, top.from);
    vimOperateLine(view, operator, Math.abs(b - a) + 1);
    if (operator !== "c") vimPatch(view, VIM_IDLE);
    return;
  }
  const to = target.inclusive ? target.pos + 1 : target.pos;
  vimOperate(view, operator, from, to);
  if (operator !== "c") vimPatch(view, VIM_IDLE);
}

// Keys that would otherwise reach defaultKeymap and edit the document.
const VIM_NORMAL_SWALLOW = new Set(["Enter", "Backspace", "Delete", "Tab"]);

function vimNormalKey(view, event, state) {
  const key = event.key;
  const count = state.count ? parseInt(state.count, 10) : 0;

  if (event.ctrlKey) {
    // Anything not claimed here falls through, so app shortcuts still work.
    if (key === "r") return redo(view) || true;
    if (key === "d") return cursorPageDown(view) || true;
    if (key === "u") return cursorPageUp(view) || true;
    if (key === "[") {
      vimPatch(view, VIM_IDLE);
      return true;
    }
    return false;
  }

  if (key === "Escape") {
    vimPatch(view, VIM_IDLE);
    return true;
  }
  if (VIM_NORMAL_SWALLOW.has(key)) {
    if (key === "Enter") {
      const target = vimMotion(view, "j", count, false);
      if (target) {
        vimSetCursor(view, firstNonSpace(view.state.doc.lineAt(target.pos)));
      }
    } else if (key === "Backspace") {
      const target = vimMotion(view, "h", count, false);
      if (target) vimSetCursor(view, target.pos);
    } else if (key === "Delete") {
      vimDeleteChars(view, count || 1, false);
    }
    vimPatch(view, VIM_IDLE);
    return true;
  }
  // Arrows, Home/End, PageUp/Down are left to defaultKeymap.
  if (key.length !== 1) return false;

  // Counts. A leading 0 is the motion, a later one is a digit.
  if (/[1-9]/.test(key) || (key === "0" && state.count)) {
    vimPatch(view, { count: state.count + key });
    return true;
  }

  // g is the only prefix, and gg the only thing it leads to.
  if (state.pending === "g") {
    if (key === "g") {
      if (state.operator) vimRunOperator(view, state.operator, "gg", count);
      else {
        const target = vimMotion(view, "gg", count, false);
        vimSetCursor(view, target.pos);
        vimPatch(view, VIM_IDLE);
      }
    } else {
      vimPatch(view, VIM_IDLE);
    }
    return true;
  }
  if (key === "g") {
    vimPatch(view, { pending: "g" });
    return true;
  }

  if (state.operator) {
    if (key === state.operator) {
      vimOperateLine(view, state.operator, count || 1);
      if (state.operator !== "c") vimPatch(view, VIM_IDLE);
    } else {
      vimRunOperator(view, state.operator, key, count);
    }
    return true;
  }

  if (key === "d" || key === "c" || key === "y") {
    vimPatch(view, { operator: key });
    return true;
  }

  const motion = vimMotion(view, key, count, false);
  if (motion) {
    vimSetCursor(view, motion.pos);
    vimPatch(view, VIM_IDLE);
    return true;
  }

  const { doc } = view.state;
  const pos = view.state.selection.main.head;
  const line = doc.lineAt(pos);
  switch (key) {
    case "i":
      vimEnterInsert(view, pos);
      break;
    case "a":
      vimEnterInsert(view, Math.min(pos + 1, line.to));
      break;
    case "I":
      vimEnterInsert(view, firstNonSpace(line));
      break;
    case "A":
      vimEnterInsert(view, line.to);
      break;
    case "o":
      vimOpenLine(view, true);
      break;
    case "O":
      vimOpenLine(view, false);
      break;
    case "x":
      vimDeleteChars(view, count || 1, false);
      break;
    case "s":
      vimDeleteChars(view, count || 1, true);
      break;
    case "S":
      vimOperateLine(view, "c", count || 1);
      break;
    case "D":
      vimOperate(view, "d", pos, line.to);
      break;
    case "C":
      vimOperate(view, "c", pos, line.to);
      break;
    case "Y":
      vimOperateLine(view, "y", count || 1);
      break;
    case "p":
      vimPaste(view, true, count || 1);
      break;
    case "P":
      vimPaste(view, false, count || 1);
      break;
    case "J":
      vimJoin(view, count || 1);
      break;
    case "u":
      undo(view);
      break;
    default:
      break; // unmapped, but still swallowed so it can't type itself
  }
  vimPatch(view, VIM_IDLE);
  return true;
}

function vimKeydown(event, view) {
  const state = view.state.field(vimState, false);
  if (!state) return false;
  if (event.metaKey || event.altKey) return false;
  if (event.key === "Shift" || event.key === "Control") return false;
  if (event.key === "Alt" || event.key === "Meta") return false;

  if (state.mode === "insert") {
    if (event.key === "Escape" || (event.ctrlKey && event.key === "[")) {
      vimExitInsert(view);
      event.preventDefault();
      return true;
    }
    return false;
  }

  if (!vimNormalKey(view, event, state)) return false;
  event.preventDefault();
  event.stopPropagation();
  return true;
}

function vimStatusPanel(view) {
  const dom = document.createElement("div");
  dom.className = "cm-vim-panel";
  const render = (state) => {
    const vim = state.field(vimState, false);
    if (!vim) return;
    const pending = vim.count + (vim.operator ?? "") + vim.pending;
    dom.textContent =
      (vim.mode === "insert" ? "-- INSERT --" : "-- NORMAL --") +
      (pending ? "  " + pending : "");
  };
  render(view.state);
  return { dom, bottom: true, update: (update) => render(update.state) };
}

// Belt and braces: keydown covers physical typing, inputHandler covers the
// paths that skip it (IME, autocorrect, mobile keyboards).
const vimExtension = [
  vimState,
  EditorView.domEventHandlers({ keydown: vimKeydown }),
  EditorView.inputHandler.of((view) => {
    const vim = view.state.field(vimState, false);
    return !!vim && vim.mode !== "insert";
  }),
  EditorView.editorAttributes.compute([vimState], (state) => {
    const vim = state.field(vimState, false);
    return vim && vim.mode !== "insert" ? { class: "cm-vim-normal" } : {};
  }),
  showPanel.of(vimStatusPanel),
];

const KEYWORDS = new Set([
  "as", "assert", "auto", "case", "const", "delegate", "derive", "echo",
  "else", "fn", "if", "implement", "import", "let", "macro", "opaque",
  "panic", "pub", "test", "todo", "type", "use",
]);

const gleam = StreamLanguage.define({
  name: "gleam",
  token(stream) {
    if (stream.eatSpace()) return null;
    if (stream.match("//")) {
      stream.skipToEnd();
      return "comment";
    }
    if (stream.peek() === '"') {
      stream.next();
      let escaped = false;
      while (!stream.eol()) {
        const ch = stream.next();
        if (escaped) escaped = false;
        else if (ch === "\\") escaped = true;
        else if (ch === '"') break;
      }
      return "string";
    }
    if (/[0-9]/.test(stream.peek())) {
      stream.match(/^0[box][0-9a-fA-F_]+/) ||
        stream.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/);
      return "number";
    }
    if (stream.match(/^[A-Z][A-Za-z0-9]*/)) return "typeName";
    if (stream.match(/^[a-z_][a-z0-9_]*/)) {
      return KEYWORDS.has(stream.current()) ? "keyword" : "variableName";
    }
    if (
      stream.match("|>") || stream.match("<>") || stream.match("->") ||
      stream.match("<-") || stream.match("..") || stream.match("<=") ||
      stream.match(">=") || stream.match("==") || stream.match("!=") ||
      stream.match("&&") || stream.match("||")
    ) {
      return "operator";
    }
    const ch = stream.next();
    if ("+-*/%=<>!&|".includes(ch)) return "operator";
    if ("()[]{}#".includes(ch)) return "bracket";
    return null;
  },
  languageData: {
    commentTokens: { line: "//" },
    closeBrackets: { brackets: ["(", "[", "{", '"'] },
  },
});

// @codemirror/legacy-modes ships no Elixir mode, and neither erlang nor ruby
// parses it acceptably (atoms, sigils and do/end all go wrong), so it gets the
// same hand-written treatment as Gleam above.
const ELIXIR_KEYWORDS = new Set([
  "after", "and", "case", "catch", "cond", "def", "defdelegate", "defexception",
  "defguard", "defimpl", "defmacro", "defmodule", "defp", "defprotocol",
  "defstruct", "do", "else", "end", "fn", "for", "if", "import", "in", "not",
  "or", "quote", "raise", "receive", "require", "rescue", "try", "unless",
  "unquote", "use", "when", "with",
]);

const ELIXIR_CONSTANTS = new Set(["true", "false", "nil"]);

const elixir = StreamLanguage.define({
  name: "elixir",
  token(stream) {
    if (stream.eatSpace()) return null;
    if (stream.match("#")) {
      stream.skipToEnd();
      return "comment";
    }
    // Heredocs are highlighted a line at a time; treating the opener as a plain
    // string is close enough for read-only drill code.
    if (stream.match('"""') || stream.match("'''")) {
      stream.skipToEnd();
      return "string";
    }
    if (stream.peek() === '"' || stream.peek() === "'") {
      const quote = stream.next();
      let escaped = false;
      while (!stream.eol()) {
        const ch = stream.next();
        if (escaped) escaped = false;
        else if (ch === "\\") escaped = true;
        else if (ch === quote) break;
      }
      return "string";
    }
    // Sigils: ~r/.../, ~s|...|, ~w[...] and friends.
    if (stream.match(/^~[a-zA-Z]/)) {
      const open = stream.next();
      const close = { "(": ")", "[": "]", "{": "}", "<": ">" }[open] ?? open;
      while (!stream.eol() && stream.next() !== close);
      stream.match(/^[a-z]*/);
      return "string";
    }
    // Module attributes (@moduledoc, @alphabet) and the pin operator.
    if (stream.match(/^[@^][a-z_][A-Za-z0-9_]*/)) return "variableName";
    if (stream.match(/^:"[^"]*"/) || stream.match(/^:[a-zA-Z_][A-Za-z0-9_]*[?!]?/)) {
      return "atom";
    }
    if (/[0-9]/.test(stream.peek())) {
      stream.match(/^0[box][0-9a-fA-F_]+/) ||
        stream.match(/^[0-9][0-9_]*(\.[0-9_]+)?(e-?[0-9_]+)?/);
      return "number";
    }
    if (stream.match(/^[A-Z][A-Za-z0-9_]*/)) return "typeName";
    if (stream.match(/^[a-z_][A-Za-z0-9_]*[?!]?/)) {
      const word = stream.current();
      if (ELIXIR_KEYWORDS.has(word)) return "keyword";
      if (ELIXIR_CONSTANTS.has(word)) return "atom";
      return "variableName";
    }
    if (
      stream.match("|>") || stream.match("<>") || stream.match("->") ||
      stream.match("<-") || stream.match("=>") || stream.match("..") ||
      stream.match("<=") || stream.match(">=") || stream.match("===") ||
      stream.match("==") || stream.match("!=") || stream.match("&&") ||
      stream.match("||")
    ) {
      return "operator";
    }
    const ch = stream.next();
    if ("+-*/%=<>!&|".includes(ch)) return "operator";
    if ("()[]{}".includes(ch)) return "bracket";
    return null;
  },
  languageData: {
    commentTokens: { line: "#" },
    closeBrackets: { brackets: ["(", "[", "{", '"'] },
  },
});

// Tokyo Night, matching the app stylesheet.
const highlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#bb9af7" },
  { tag: tags.string, color: "#9ece6a" },
  { tag: tags.comment, color: "#565f89", fontStyle: "italic" },
  { tag: tags.number, color: "#ff9e64" },
  { tag: tags.typeName, color: "#2ac3de" },
  { tag: tags.variableName, color: "#c0caf5" },
  { tag: tags.operator, color: "#89ddff" },
  { tag: tags.bracket, color: "#a9b1d6" },
]);

const theme = EditorView.theme(
  {
    // The size is a custom property so the stylesheet can raise it to 16px on
    // phones — under 16px, iOS Safari zooms the page when the editor takes
    // focus and never zooms back out.
    "&": {
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
      fontSize: "var(--editor-font-size, 14px)",
      height: "100%",
    },
    ".cm-content": {
      caretColor: "var(--accent)",
      fontFamily: "inherit",
      padding: "12px 0",
    },
    ".cm-gutters": {
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-secondary)",
      border: "none",
      opacity: "0.7",
    },
    ".cm-activeLine": { backgroundColor: "rgba(65, 72, 104, 0.3)" },
    ".cm-activeLineGutter": { backgroundColor: "transparent" },
    "&.cm-focused": { outline: "none" },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: "var(--bg-hover)",
    },
    ".cm-cursor": { borderLeftColor: "var(--accent)" },
  },
  { dark: true },
);

// vim/emacs grab keys via DOM event handlers, which race other handlers by
// extension precedence — the compartment sits first in the extension list AND
// is wrapped Prec.highest so the mode always wins the keydown race.
function keymapExtension(mode) {
  switch (mode) {
    case "vim":
      return Prec.highest(vimExtension);
    case "emacs":
      return Prec.highest(emacsKeymap);
    default:
      return [];
  }
}

function languageExtension(language) {
  switch (language) {
    case "python":
      return StreamLanguage.define(python);
    case "typescript":
      return StreamLanguage.define(typescript);
    case "elixir":
      return elixir;
    default:
      return gleam;
  }
}

class GleamEditor extends HTMLElement {
  // keymap and language ride on ATTRIBUTES, not properties: Lustre reliably
  // diffs attributes on every (re)mount, while a property set on a remounted
  // custom element has been observed not to arrive.
  static observedAttributes = ["keymap", "language"];

  #view = null;
  #doc = "";
  #diagnostics = [];
  #keymapCompartment = new Compartment();
  #languageCompartment = new Compartment();

  // Focusing the host focuses the CodeMirror view: this is what the `i`
  // keybinding calls to enter the editor from the keyboard.
  focus() {
    this.#view?.focus();
  }

  set doc(value) {
    this.#doc = value ?? "";
    if (this.#view && this.#view.state.doc.toString() !== this.#doc) {
      this.#view.dispatch({
        changes: {
          from: 0,
          to: this.#view.state.doc.length,
          insert: this.#doc,
        },
      });
    }
  }

  get doc() {
    return this.#view ? this.#view.state.doc.toString() : this.#doc;
  }

  set diagnostics(value) {
    this.#diagnostics = Array.isArray(value) ? value : [];
    if (this.#view) this.#applyDiagnostics();
  }

  get #keymap() {
    return this.getAttribute("keymap") ?? "default";
  }

  get #language() {
    return this.getAttribute("language") ?? "gleam";
  }

  attributeChangedCallback(name, _previous, _value) {
    if (!this.#view) return;
    switch (name) {
      case "keymap":
        this.#view.dispatch({
          effects: this.#keymapCompartment.reconfigure(
            keymapExtension(this.#keymap),
          ),
        });
        break;
      case "language":
        this.#view.dispatch({
          effects: this.#languageCompartment.reconfigure(
            languageExtension(this.#language),
          ),
        });
        break;
    }
  }

  connectedCallback() {
    if (this.#view) return;
    const notify = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        this.dispatchEvent(
          new CustomEvent("editor-change", {
            detail: { value: update.state.doc.toString() },
            bubbles: true,
          }),
        );
      }
    });
    this.#view = new EditorView({
      state: EditorState.create({
        doc: this.#doc,
        extensions: [
          this.#keymapCompartment.of(keymapExtension(this.#keymap)),
          lineNumbers(),
          history(),
          drawSelection(),
          bracketMatching(),
          highlightActiveLine(),
          indentUnit.of("  "),
          this.#languageCompartment.of(languageExtension(this.#language)),
          syntaxHighlighting(highlight),
          theme,
          keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
          notify,
        ],
      }),
      parent: this,
    });
    if (this.#diagnostics.length > 0) this.#applyDiagnostics();
  }

  disconnectedCallback() {
    this.#view?.destroy();
    this.#view = null;
  }

  #applyDiagnostics() {
    const doc = this.#view.state.doc;
    const specs = this.#diagnostics.flatMap((d) => {
      if (!d || typeof d.line !== "number") return [];
      const line = doc.line(Math.min(Math.max(d.line, 1), doc.lines));
      const from = Math.min(
        line.from + Math.max((d.column ?? 1) - 1, 0),
        line.to,
      );
      // Underline the token under the position, or one character at minimum.
      const rest = line.text.slice(from - line.from);
      const token = rest.match(/^\S+/);
      const to = Math.min(from + (token ? token[0].length : 1), doc.length);
      return [
        {
          from,
          to: Math.max(to, Math.min(from + 1, doc.length)),
          severity: "error",
          message: String(d.message ?? ""),
        },
      ];
    });
    this.#view.dispatch(setDiagnostics(this.#view.state, specs));
  }
}

export function register() {
  if (!customElements.get("gleam-editor")) {
    customElements.define("gleam-editor", GleamEditor);
  }
}
