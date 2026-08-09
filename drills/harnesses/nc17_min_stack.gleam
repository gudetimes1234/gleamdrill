import gleam/string
import solution

pub fn run() -> List(#(String, String, String)) {
  let stack =
    solution.new()
    |> solution.push(-2)
    |> solution.push(0)
    |> solution.push(-3)
  let popped = solution.pop(stack)

  [
    #(
      "get_min() after push -2, 0, -3",
      string.inspect(Ok(-3)),
      string.inspect(solution.get_min(stack)),
    ),
    #("top() after pop()", string.inspect(Ok(0)), string.inspect(solution.top(popped))),
    #(
      "get_min() after pop()",
      string.inspect(Ok(-2)),
      string.inspect(solution.get_min(popped)),
    ),
    #(
      "top() on an empty stack",
      string.inspect(Error(Nil)),
      string.inspect(solution.top(solution.new())),
    ),
  ]
}
