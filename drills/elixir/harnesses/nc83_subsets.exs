# Both the outer order and the order within each subset are free.
sorted = fn nums ->
  nums
  |> Solution.subsets()
  |> Enum.map(fn subset -> subset |> Enum.sort() |> Enum.join(",") end)
  |> Enum.sort()
end

[
  {"subsets([1, 2, 3])", inspect(["", "1", "1,2", "1,2,3", "1,3", "2", "2,3", "3"]),
   inspect(sorted.([1, 2, 3]))},
  {"subsets([0])", inspect(["", "0"]), inspect(sorted.([0]))},
  {"subsets([])", inspect([""]), inspect(sorted.([]))},
  {"subsets of five elements count", inspect(32),
   inspect(length(Solution.subsets([1, 2, 3, 4, 5])))}
]
