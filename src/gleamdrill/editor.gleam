//// Lustre-side interface to the <gleam-editor> CodeMirror custom element.

import gleam/dynamic/decode
import gleam/json
import lustre/attribute.{type Attribute}
import lustre/element.{type Element}
import lustre/event

pub type Diagnostic {
  Diagnostic(line: Int, column: Int, message: String)
}

/// Defines the custom element; call once at startup, before the first render.
@external(javascript, "./editor_ffi.mjs", "register")
pub fn register() -> Nil

pub fn view(attributes: List(Attribute(msg))) -> Element(msg) {
  element.element("gleam-editor", attributes, [])
}

pub fn doc(text: String) -> Attribute(msg) {
  attribute.property("doc", json.string(text))
}

/// "default", "vim" or "emacs".
pub fn keymap(mode: String) -> Attribute(msg) {
  attribute.attribute("keymap", mode)
}

/// "gleam", "python" or "typescript" — picks the highlighting mode.
pub fn language(name: String) -> Attribute(msg) {
  attribute.attribute("language", name)
}

pub fn diagnostics(items: List(Diagnostic)) -> Attribute(msg) {
  attribute.property(
    "diagnostics",
    json.array(items, fn(d) {
      json.object([
        #("line", json.int(d.line)),
        #("column", json.int(d.column)),
        #("message", json.string(d.message)),
      ])
    }),
  )
}

pub fn on_change(to_msg: fn(String) -> msg) -> Attribute(msg) {
  event.on("editor-change", {
    use value <- decode.subfield(["detail", "value"], decode.string)
    decode.success(to_msg(value))
  })
}
