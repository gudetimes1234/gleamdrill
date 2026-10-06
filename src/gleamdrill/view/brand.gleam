//// The name, with its mark beside it. Every screen that titles itself
//// "GleamDrill" renders this, so the logo is one file (assets/favicon.svg)
//// and one place in the code.

import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

/// The mark is decorative: the heading's text already says the name, so the
/// image is hidden from screen readers rather than read out twice.
pub fn wordmark() -> List(Element(msg)) {
  [
    html.img([
      attribute.class("brand-mark"),
      attribute.src("/favicon.svg"),
      attribute.alt(""),
      attribute.attribute("aria-hidden", "true"),
      attribute.width(32),
      attribute.height(32),
    ]),
    html.text("GleamDrill"),
  ]
}
