shown = fn rows ->
  rows
  |> Enum.map(&String.graphemes/1)
  |> Solution.solve()
  |> Enum.map(&Enum.join/1)
end

[
  {"solve(the classic 4x4)", inspect(["XXXX", "XXXX", "XXXX", "XOXX"]),
   inspect(shown.(["XXXX", "XOOX", "XXOX", "XOXX"]))},
  {~S{solve([["X"]])}, inspect(["X"]), inspect(shown.(["X"]))},
  {~S{solve([["O"]]) -- on the border, so it survives}, inspect(["O"]), inspect(shown.(["O"]))},
  {"solve([])", inspect([]), inspect(shown.([]))},
  {"solve(a region reaching the border)", inspect(["XOX", "XOX", "XXX"]),
   inspect(shown.(["XOX", "XOX", "XXX"]))}
]
