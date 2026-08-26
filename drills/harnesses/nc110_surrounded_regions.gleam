import gleam/list
import gleam/string
import solution

fn board(rows: List(String)) -> List(List(String)) {
  list.map(rows, string.to_graphemes)
}

fn shown(rows: List(String)) -> List(String) {
  solution.solve(board(rows))
  |> list.map(string.concat)
}

pub fn run() -> List(#(String, String, String)) {
  [
    #(
      "solve(the classic 4x4)",
      string.inspect(["XXXX", "XXXX", "XXXX", "XOXX"]),
      string.inspect(shown(["XXXX", "XOOX", "XXOX", "XOXX"])),
    ),
    #("solve([[X]])", string.inspect(["X"]), string.inspect(shown(["X"]))),
    #(
      "solve([[O]]) \u{2014} on the border, so it survives",
      string.inspect(["O"]),
      string.inspect(shown(["O"])),
    ),
    #("solve([])", string.inspect([]), string.inspect(shown([]))),
    #(
      "solve(a region reaching the border through a neighbour)",
      string.inspect(["XOX", "XOX", "XXX"]),
      string.inspect(shown(["XOX", "XOX", "XXX"])),
    ),
  ]
}
