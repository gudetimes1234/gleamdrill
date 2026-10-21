//// What a page draws: a body, and the class and title of the screen around
//// it. The shell (`ui/layout`) adds the notices and the nav bar, which
//// speak the app's messages, so a page's view stays in its own.

import gleam/list
import lustre/element.{type Element}

pub type Document(msg) {
  Document(class: String, title: String, body: List(Element(msg)))
}

pub fn map(document: Document(a), with: fn(a) -> b) -> Document(b) {
  let Document(class:, title:, body:) = document
  Document(class:, title:, body: list.map(body, element.map(_, with)))
}
