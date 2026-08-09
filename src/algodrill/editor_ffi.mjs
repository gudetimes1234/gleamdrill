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

import { EditorState } from "@codemirror/state";
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

class GleamEditor extends HTMLElement {
  #view = null;
  #doc = "";
  #diagnostics = [];

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
          lineNumbers(),
          history(),
          drawSelection(),
          bracketMatching(),
          highlightActiveLine(),
          indentUnit.of("  "),
          gleam,
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
