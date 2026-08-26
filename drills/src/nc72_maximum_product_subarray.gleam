import gleam/int
import gleam/list

pub fn max_product(nums: List(Int)) -> Int {
  case nums {
    [] -> 0
    [first, ..rest] -> {
      // A negative number turns the best running product into the worst and
      // the worst into the best, so both have to be carried. Zero resets them
      // both, which falls out of taking the element itself as an option.
      let #(_, _, best) =
        list.fold(rest, #(first, first, first), fn(state, n) {
          let #(high, low, best) = state
          let candidates = [n, high * n, low * n]
          let high = list_max(candidates)
          let low = list_min(candidates)
          #(high, low, int.max(best, high))
        })
      best
    }
  }
}

fn list_max(values: List(Int)) -> Int {
  case list.reduce(values, int.max) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}

fn list_min(values: List(Int)) -> Int {
  case list.reduce(values, int.min) {
    Ok(n) -> n
    Error(Nil) -> 0
  }
}
