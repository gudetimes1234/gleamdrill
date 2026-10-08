//// Blitz chrome on the drill: the countdown and the expiry flash.

import gleam/int
import gleam/list
import gleam/option.{Some}
import gleam/string
import gleamdrill/model.{type Model}
import gleamdrill/msg.{type Msg}
import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html

/// The Blitz clock: what is left on this card, red inside the last thirty
/// seconds. At zero the card is over and the next one opens.
pub fn countdown(m: Model, blitz: model.Blitz) -> Element(Msg) {
  let left = int.max(0, { blitz.deadline_ms - m.now_ms } / 1000)
  let text =
    int.to_string(left / 60)
    <> ":"
    <> string.pad_start(int.to_string(left % 60), 2, "0")
  let done = list.length(blitz.results)
  let total = list.length(m.selected)
  html.span(
    [
      attribute.classes([
        #("drill-clock", True),
        #("drill-countdown", True),
        #("drill-clock-urgent", left <= 30),
      ]),
      attribute.attribute("aria-label", "Time left on this card"),
    ],
    [
      html.text(
        " \u{b7} \u{23f1} "
        <> text
        <> " \u{b7} "
        <> int.to_string(done)
        <> "/"
        <> int.to_string(total),
      ),
    ],
  )
}

/// One beat of "Time!" as an expired Blitz card gives way to the next.
pub fn blitz_flash(m: Model) -> Element(Msg) {
  case m.blitz {
    Some(model.Blitz(expired_flash: True, ..)) ->
      html.div([attribute.class("blitz-flash"), attribute.role("status")], [
        html.text("Time!"),
      ])
    _ -> element.none()
  }
}
