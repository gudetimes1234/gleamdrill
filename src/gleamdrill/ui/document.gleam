//// What a page draws: a body, and how the screen around it is framed. The
//// shell (`ui/layout`) adds the notices, the nav bar and the storage
//// warning, which speak the app's messages, so a page's view stays in its
//// own.

import gleam/list
import lustre/element.{type Element}

pub type Document(msg) {
  Document(
    /// The screen's root class.
    class: String,
    header: Header(msg),
    /// Whether the full-storage warning shows above everything.
    storage_warning: Bool,
    body: List(Element(msg)),
  )
}

/// The header row: a title, anything the page shows beside it, then the
/// nav bar the shell adds.
pub type Header(msg) {
  Header(
    class: String,
    title_class: String,
    title: List(Element(msg)),
    extra: List(Element(msg)),
  )
}

/// The header most screens use: their title, then the nav.
pub fn header(title: List(Element(msg))) -> Header(msg) {
  Header(class: "study-header", title_class: "study-title", title:, extra: [])
}

pub fn map(document: Document(a), with: fn(a) -> b) -> Document(b) {
  let Document(class:, header:, storage_warning:, body:) = document
  let Header(class: header_class, title_class:, title:, extra:) = header
  let lift = fn(elements) { list.map(elements, element.map(_, with)) }
  Document(
    class:,
    header: Header(
      class: header_class,
      title_class:,
      title: lift(title),
      extra: lift(extra),
    ),
    storage_warning:,
    body: lift(body),
  )
}
