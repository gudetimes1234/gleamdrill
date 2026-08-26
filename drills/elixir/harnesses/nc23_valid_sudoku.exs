# Nine row strings rather than a 9x9 literal: the board stays readable, and a
# single changed cell is what each invalid case is.
rows = [
  "53..7....",
  "6..195...",
  ".98....6.",
  "8...6...3",
  "4..8.3..1",
  "7...2...6",
  ".6....28.",
  "...419..5",
  "....8..79"
]

board = fn -> Enum.map(rows, &String.graphemes/1) end

with_cell = fn r, c, value ->
  board.()
  |> List.update_at(r, fn row -> List.replace_at(row, c, value) end)
end

empty = List.duplicate(List.duplicate(".", 9), 9)

[
  {"valid_sudoku?(valid board)", inspect(true), inspect(Solution.valid_sudoku?(board.()))},
  {"valid_sudoku?(5 twice in row 0)", inspect(false),
   inspect(Solution.valid_sudoku?(with_cell.(0, 2, "5")))},
  {"valid_sudoku?(5 twice in column 0, different boxes)", inspect(false),
   inspect(Solution.valid_sudoku?(with_cell.(3, 0, "5")))},
  {"valid_sudoku?(3 twice in the top-left box only)", inspect(false),
   inspect(Solution.valid_sudoku?(with_cell.(2, 0, "3")))},
  {"valid_sudoku?(empty board)", inspect(true), inspect(Solution.valid_sudoku?(empty))}
]
