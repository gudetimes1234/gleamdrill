//// The application: the shared state, the page on screen, and the dispatch
//// between them.
////
//// Each page under `page/` owns its model, its messages, its update and its
//// view. The app holds one page at a time, routes each message to the page
//// it belongs to, and applies the `Change`s a page asks for to the shared
//// state. Screens not yet moved into `page/` run as the `Legacy` page, on
//// the flat model and the old dispatcher.

import gleamdrill/msg as legacy_msg
import gleamdrill/shared.{type Shared}
import gleamdrill/update as legacy_update
import gleamdrill/view as legacy_view
import lustre/effect.{type Effect}
import lustre/element.{type Element}

pub type Model {
  Model(shared: Shared, page: Page)
}

pub type Page {
  Legacy
}

pub type Msg {
  LegacyMsg(legacy_msg.Msg)
}

pub fn init(
  shared: #(Shared, Effect(legacy_msg.Msg)),
) -> #(Model, Effect(Msg)) {
  let #(shared, fx) = shared
  #(Model(shared:, page: Legacy), effect.map(fx, LegacyMsg))
}

pub fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    LegacyMsg(inner) -> {
      let #(shared, fx) = legacy_update.update(model.shared, inner)
      #(Model(..model, shared:), effect.map(fx, LegacyMsg))
    }
  }
}

pub fn view(model: Model) -> Element(Msg) {
  case model.page {
    Legacy -> legacy_view.view(model.shared) |> element.map(LegacyMsg)
  }
}
