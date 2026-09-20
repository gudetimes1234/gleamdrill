import gleam/int

/// Values in one stack, the running minimum in a parallel one. Same O(1)
/// get_min as pairing each value with its minimum, but the two concerns stay
/// separate — which is easier to extend to a max stack, a sum stack, and so on.
pub type MinStack {
  MinStack(values: List(Int), minimums: List(Int))
}

pub fn new() -> MinStack {
  MinStack([], [])
}

pub fn push(stack: MinStack, value: Int) -> MinStack {
  let minimums = case stack.minimums {
    [current, ..] -> [int.min(value, current), ..stack.minimums]
    [] -> [value]
  }
  MinStack([value, ..stack.values], minimums)
}

pub fn pop(stack: MinStack) -> MinStack {
  case stack.values, stack.minimums {
    [_, ..values], [_, ..minimums] -> MinStack(values, minimums)
    _, _ -> stack
  }
}

pub fn top(stack: MinStack) -> Result(Int, Nil) {
  case stack.values {
    [value, ..] -> Ok(value)
    [] -> Error(Nil)
  }
}

pub fn get_min(stack: MinStack) -> Result(Int, Nil) {
  case stack.minimums {
    [minimum, ..] -> Ok(minimum)
    [] -> Error(Nil)
  }
}
