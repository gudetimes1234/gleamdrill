normalise = fn triples -> triples |> Enum.map(&inspect/1) |> Enum.sort() end

[
  {"three_sum([-1, 0, 1, 2, -1, -4])",
   inspect(["{-1, -1, 2}", "{-1, 0, 1}"]),
   inspect(normalise.(Solution.three_sum([-1, 0, 1, 2, -1, -4])))},
  {"three_sum([0, 1, 1])", inspect([]), inspect(normalise.(Solution.three_sum([0, 1, 1])))},
  {"three_sum([0, 0, 0])", inspect(["{0, 0, 0}"]), inspect(normalise.(Solution.three_sum([0, 0, 0])))}
]
