//// Where AlgoDrill points outward, in one place.
////
//// These are the only anchors in the app. Everything else clickable is a
//// button dispatching a `Msg`, so hrefs live here rather than being scattered
//// as literals through the views that happen to render them.

import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub const repo = "https://github.com/gudetimes1234/gleamdrill"

pub const sponsor = "https://github.com/sponsors/gudetimes1234"

pub const liberapay = "https://liberapay.com/gudetimes1234"

/// A real anchor rather than the `link-button` idiom used everywhere else:
/// these leave the app, so they need an href that a middle-click, a bookmark
/// or a screen reader can follow.
pub fn external(label: String, href: String) -> Element(msg) {
  html.a(
    [
      attribute.class("footer-link"),
      attribute.href(href),
      attribute.target("_blank"),
      attribute.rel("noopener noreferrer"),
    ],
    [html.text(label)],
  )
}
