//// Lustre-side interface to the <gleam-editor> CodeMirror custom element.

import gleam/dynamic/decode
import gleam/int
import gleam/json
import gleam/option.{type Option, None, Some}
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

/// The user's code with the reference solution's differences marked inline,
/// read-only. Rendered by the <gleam-diff> custom element.
pub fn diff_view(
  doc: String,
  original: String,
  language_name: String,
) -> Element(msg) {
  element.element(
    "gleam-diff",
    [
      attribute.property("doc", json.string(doc)),
      attribute.property("original", json.string(original)),
      attribute.attribute("language", language_name),
    ],
    [],
  )
}

/// The height the user dragged the editor to, in px. `None` leaves the
/// stylesheet in charge.
pub fn height(px: Option(Int)) -> Attribute(msg) {
  case px {
    Some(value) -> attribute.attribute("height", int.to_string(value))
    None -> attribute.none()
  }
}

/// Fired once when a drag on the resize handle ends, with the new height.
/// A height of 0 means the handle was double-clicked: back to the default.
pub fn on_resize(to_msg: fn(Int) -> msg) -> Attribute(msg) {
  event.on("editor-resize", {
    use value <- decode.subfield(["detail", "height"], decode.int)
    decode.success(to_msg(value))
  })
}

pub fn on_change(to_msg: fn(String) -> msg) -> Attribute(msg) {
  event.on("editor-change", {
    use value <- decode.subfield(["detail", "value"], decode.string)
    decode.success(to_msg(value))
  })
}
