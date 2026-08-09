import lustre
import lustre/effect
import lustre/element/html

pub fn main() {
  let app =
    lustre.application(
      fn(_flags) { #(Nil, effect.none()) },
      fn(model, _msg) { #(model, effect.none()) },
      fn(_model) { html.h1([], [html.text("AlgoDrill skeleton")]) },
    )
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}
