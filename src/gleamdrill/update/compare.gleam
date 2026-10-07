//// The compare screen's actions: opening a pair from the selection, moving
//// through pairs, and flipping each side's variant.

import gleam/option.{None, Some}
import gleamdrill/compare
import gleamdrill/model.{
  type CompareSide, type Model, CompareRoute, MenuRoute, Model,
}
import gleamdrill/msg.{type Msg}
import lustre/effect.{type Effect}

pub fn open(m: Model) -> #(Model, Effect(Msg)) {
  case compare.open(m.selected) {
    Ok(c) -> #(Model(..m, compare: Some(c), route: CompareRoute), effect.none())
    Error(reason) -> #(Model(..m, notice: Some(reason)), effect.none())
  }
}

pub fn moved(m: Model, delta: Int) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, compare: option.map(m.compare, compare.moved(_, delta))),
    effect.none(),
  )
}

pub fn picked_variant(
  m: Model,
  side: CompareSide,
  index: Int,
) -> #(Model, Effect(Msg)) {
  #(
    Model(..m, compare: option.map(m.compare, compare.picked(_, side, index))),
    effect.none(),
  )
}

pub fn close(m: Model) -> #(Model, Effect(Msg)) {
  #(Model(..m, route: MenuRoute, compare: None), effect.none())
}
