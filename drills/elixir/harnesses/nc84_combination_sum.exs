sorted = fn candidates, target ->
  candidates
  |> Solution.combination_sum(target)
  |> Enum.map(fn combination -> combination |> Enum.sort() |> Enum.join(",") end)
  |> Enum.sort()
end

[
  {"combination_sum([2, 3, 6, 7], 7)", inspect(["2,2,3", "7"]),
   inspect(sorted.([2, 3, 6, 7], 7))},
  {"combination_sum([2, 3, 5], 8)", inspect(["2,2,2,2", "2,3,3", "3,5"]),
   inspect(sorted.([2, 3, 5], 8))},
  {"combination_sum([2], 1)", inspect([]), inspect(sorted.([2], 1))},
  {"combination_sum([1], 0)", inspect([""]), inspect(sorted.([1], 0))},
  {"combination_sum([], 3)", inspect([]), inspect(sorted.([], 3))}
]
