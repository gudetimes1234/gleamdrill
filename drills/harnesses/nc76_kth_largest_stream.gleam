import gleam/list
import gleam/string
import solution

/// Feeds a stream in and reports the kth largest after each value, which is
/// what the original interface returns from add.
fn stream(
  k: Int,
  initial: List(Int),
  added: List(Int),
) -> List(Result(Int, Nil)) {
  let #(_, answers) =
    list.fold(added, #(solution.new(k, initial), []), fn(state, value) {
      let #(store, answers) = state
      let store = solution.add(store, value)
      #(store, [solution.kth(store), ..answers])
    })
  list.reverse(answers)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "k = 3 over [4, 5, 8, 2] then 3, 5, 10, 9, 4",
      string.inspect([Ok(4), Ok(5), Ok(5), Ok(8), Ok(8)]),
      string.inspect(stream(3, [4, 5, 8, 2], [3, 5, 10, 9, 4])),
    ),
    #(
      "k = 1 over [] then 1, 2, 0",
      string.inspect([Ok(1), Ok(2), Ok(2)]),
      string.inspect(stream(1, [], [1, 2, 0])),
    ),
    #(
      "k = 2 over [] then 5, 5",
      string.inspect([Error(Nil), Ok(5)]),
      string.inspect(stream(2, [], [5, 5])),
    ),
    #(
      "kth before anything is added",
      string.inspect(Error(Nil)),
      string.inspect(solution.kth(solution.new(2, []))),
    ),
  ]
}
