import gleam/int

pub type MinStack {
  MinStack(entries: List(#(Int, Int)))
}

pub fn new() -> MinStack {
  MinStack([])
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  let min = case stack.entries {
    [#(_, current_min), ..] -> int.min(value, current_min)
    [] -> value
  }
  MinStack([#(value, min), ..stack.entries])
}

pub fn pop(stack: MinStack) -> MinStack {
  case stack.entries {
    [_, ..rest] -> MinStack(rest)
    [] -> stack
  }
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(value, _), ..] -> Ok(value)
    [] -> Error(Nil)
  }
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  case stack.entries {
    [#(_, min), ..] -> Ok(min)
    [] -> Error(Nil)
  }
}
