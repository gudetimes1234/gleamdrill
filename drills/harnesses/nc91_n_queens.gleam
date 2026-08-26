import gleam/list
import gleam/string
import solution

fn sorted(n: Int) -> List(String) {
  solution.solve_n_queens(n)
  |> list.map(fn(board) { string.join(board, "|") })
  |> list.sort(string.compare)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "solve_n_queens(4)",
      string.inspect(["..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."]),
      string.inspect(sorted(4)),
    ),
    #("solve_n_queens(1)", string.inspect(["Q"]), string.inspect(sorted(1))),
    #("solve_n_queens(2)", string.inspect([]), string.inspect(sorted(2))),
    #("solve_n_queens(3)", string.inspect([]), string.inspect(sorted(3))),
    #(
      "solve_n_queens(6) count",
      string.inspect(4),
      string.inspect(list.length(sorted(6))),
    ),
  ]
}
