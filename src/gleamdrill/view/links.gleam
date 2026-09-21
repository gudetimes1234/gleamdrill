//// Where GleamDrill points outward, in one place.
////
//// These are the only anchors in the app. Everything else clickable is a
//// button dispatching a `Msg`, so hrefs live here rather than being scattered
//// as literals through the views that happen to render them.

import gleam/uri
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

pub const repo = "https://github.com/gudetimes1234/gleamdrill"

pub const sponsor = "https://github.com/sponsors/gudetimes1234"

pub const liberapay = "https://liberapay.com/gudetimes1234"

/// The issue form for a solution someone thinks could be better. Every
/// solution is a file in the repository, so disagreeing with one is a pull
/// request away; the form is the shorter road for those who stop at "this
/// is wrong". The title carries language, problem and variant so triage
/// needs nothing else.
pub fn suggest_solution(
  language: String,
  title: String,
  variant: String,
) -> String {
  repo
  <> "/issues/new?template=solution.yml&labels=solution&title="
  <> uri.percent_encode(
    "[" <> language <> "] " <> title <> " \u{b7} " <> variant,
  )
  <> "&problem="
  <> uri.percent_encode(language <> " / " <> title <> " / " <> variant)
}

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
