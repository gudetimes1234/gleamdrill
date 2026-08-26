sorted = fn nums ->
  nums
  |> Solution.subsets_with_dup()
  |> Enum.map(fn subset -> subset |> Enum.sort() |> Enum.join(",") end)
  |> Enum.sort()
end

[
  {"subsets_with_dup([1, 2, 2])", inspect(["", "1", "1,2", "1,2,2", "2", "2,2"]),
   inspect(sorted.([1, 2, 2]))},
  {"subsets_with_dup([0])", inspect(["", "0"]), inspect(sorted.([0]))},
  {"subsets_with_dup([])", inspect([""]), inspect(sorted.([]))},
  {"subsets_with_dup([1, 1, 1])", inspect(["", "1", "1,1", "1,1,1"]),
   inspect(sorted.([1, 1, 1]))},
  {"subsets_with_dup([4, 4, 4, 1, 4]) count", inspect(10),
   inspect(length(Solution.subsets_with_dup([4, 4, 4, 1, 4])))}
]
