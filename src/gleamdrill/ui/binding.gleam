//// One row of a keymap, generic in the message it sends.
////
//// Every screen's table is a `List(Binding(msg))` in that screen's own
//// message type; the shell lifts each into the app's with `map`, so one
//// list still feeds the dispatcher, the status bar and the help overlay.

import gleam/list
import gleam/result

/// `keys` are `KeyboardEvent.key` values; `hint` is the short form the
/// status bar shows; `help` the sentence the overlay shows.
pub type Binding(msg) {
  Binding(keys: List(String), hint: String, help: String, msg: msg)
}

pub fn map(binding: Binding(a), with: fn(a) -> b) -> Binding(b) {
  let Binding(keys:, hint:, help:, msg:) = binding
  Binding(keys:, hint:, help:, msg: with(msg))
}

/// The message of the first row that claims `key`.
pub fn find(bindings: List(Binding(msg)), key: String) -> Result(msg, Nil) {
  bindings
  |> list.find(fn(binding) { list.contains(binding.keys, key) })
  |> result.map(fn(binding) { binding.msg })
}
