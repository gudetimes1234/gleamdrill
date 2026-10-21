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
    /// The header's title: text, or the wordmark on the landing page.
    title: List(Element(msg)),
    /// Whether the full-storage warning shows above everything.
    storage_warning: Bool,
    body: List(Element(msg)),
  )
}

pub fn map(document: Document(a), with: fn(a) -> b) -> Document(b) {
  let Document(class:, title:, storage_warning:, body:) = document
  Document(
    class:,
    title: list.map(title, element.map(_, with)),
    storage_warning:,
    body: list.map(body, element.map(_, with)),
  )
}
