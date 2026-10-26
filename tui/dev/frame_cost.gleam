//// How long one frame takes to build, per window: `gleam run -m frame_cost`.

import etui/geometry
import gleam/int
import gleam/io
import gleam/list
import gleamdrill_tui/app
import gleamdrill_tui/sys
import gleamdrill_tui/view

pub fn main() -> Nil {
  let #(m, _) = app.load()
  let screen = geometry.rect_new(0, 0, 120, 32)
  list.each([0, 1, 2, 3, 5], fn(window) {
    let m = app.Model(..m, window:)
    let start = sys.now_ms()
    list.each(list.repeat(Nil, 20), fn(_) { view.draw(m, screen) })
    io.println(
      "window "
      <> int.to_string(window)
      <> ": "
      <> int.to_string({ sys.now_ms() - start } / 20)
      <> " ms a frame",
    )
  })
}
