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
    /// The page's own banners, between the notices and the header.
    lead: List(Element(msg)),
    body: List(Element(msg)),
  )
}

/// The header row: a title, anything the page shows beside it, then the
/// nav bar the shell adds when `nav` is set.
pub type Header(msg) {
  Header(
    tag: Tag,
    class: String,
    title_class: String,
    title: List(Element(msg)),
    extra: List(Element(msg)),
    nav: Bool,
  )
  /// No header row: the page's body follows the notices directly.
  NoHeader
}

/// The element the header row is drawn as.
pub type Tag {
  HeaderTag
  Div
}

/// The header most screens use: their title, then the nav.
pub fn header(title: List(Element(msg))) -> Header(msg) {
  Header(
    tag: HeaderTag,
    class: "study-header",
    title_class: "study-title",
    title:,
    extra: [],
    nav: True,
  )
}

pub fn map(document: Document(a), with: fn(a) -> b) -> Document(b) {
  let Document(class:, header:, storage_warning:, lead:, body:) = document
  let lift = fn(elements) { list.map(elements, element.map(_, with)) }
  Document(
    class:,
    header: case header {
      Header(tag:, class: header_class, title_class:, title:, extra:, nav:) ->
        Header(
          tag:,
          class: header_class,
          title_class:,
          title: lift(title),
          extra: lift(extra),
          nav:,
        )
      NoHeader -> NoHeader
    },
    storage_warning:,
    lead: lift(lead),
    body: lift(body),
  )
}
