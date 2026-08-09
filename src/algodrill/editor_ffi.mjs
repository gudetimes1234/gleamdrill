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

import { EditorState, Compartment, Prec } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  drawSelection,
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
import { vim } from "@replit/codemirror-vim";
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
} from "@codemirror/commands";
import { python } from "@codemirror/legacy-modes/mode/python";
import { typescript } from "@codemirror/legacy-modes/mode/javascript";

// @replit/codemirror-emacs is broken against current @codemirror/view (its
// keydown handler never engages; verified in an isolated editor), so the
// classic movement/editing bindings are provided by hand, with a one-slot
// kill buffer for C-k / C-y.
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
    "&": {
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
      fontSize: "14px",
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

// vim/emacs grab keys via ViewPlugin event handlers, which race other handlers
// by extension precedence — the compartment sits first in the extension list
// AND is wrapped Prec.highest so the mode always wins the keydown race.
function keymapExtension(mode) {
  switch (mode) {
    case "vim":
      return Prec.highest(vim({ status: true }));
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
