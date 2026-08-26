sorted = fn candidates, target ->
  candidates
  |> Solution.combination_sum2(target)
  |> Enum.map(fn combination -> combination |> Enum.sort() |> Enum.join(",") end)
  |> Enum.sort()
end

[
  {"combination_sum2([10, 1, 2, 7, 6, 1, 5], 8)", inspect(["1,1,6", "1,2,5", "1,7", "2,6"]),
   inspect(sorted.([10, 1, 2, 7, 6, 1, 5], 8))},
  {"combination_sum2([2, 5, 2, 1, 2], 5)", inspect(["1,2,2", "5"]),
   inspect(sorted.([2, 5, 2, 1, 2], 5))},
  {"combination_sum2([], 3)", inspect([]), inspect(sorted.([], 3))},
  {"combination_sum2([1], 1)", inspect(["1"]), inspect(sorted.([1], 1))},
  {"combination_sum2([2], 1)", inspect([]), inspect(sorted.([2], 1))}
]
