sorted = fn n ->
  n |> Solution.solve_n_queens() |> Enum.map(&Enum.join(&1, "|")) |> Enum.sort()
end

[
  {"solve_n_queens(4)", inspect(["..Q.|Q...|...Q|.Q..", ".Q..|...Q|Q...|..Q."]),
   inspect(sorted.(4))},
  {"solve_n_queens(1)", inspect(["Q"]), inspect(sorted.(1))},
  {"solve_n_queens(2)", inspect([]), inspect(sorted.(2))},
  {"solve_n_queens(3)", inspect([]), inspect(sorted.(3))},
  {"solve_n_queens(6) count", inspect(4), inspect(length(Solution.solve_n_queens(6)))}
]
