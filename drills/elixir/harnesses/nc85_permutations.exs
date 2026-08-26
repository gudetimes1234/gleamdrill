# The outer order is free but the order *within* each permutation is the answer.
sorted = fn nums ->
  nums
  |> Solution.permute()
  |> Enum.map(&Enum.join(&1, ","))
  |> Enum.sort()
end

[
  {"permute([1, 2, 3])", inspect(["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"]),
   inspect(sorted.([1, 2, 3]))},
  {"permute([0, 1])", inspect(["0,1", "1,0"]), inspect(sorted.([0, 1]))},
  {"permute([1])", inspect(["1"]), inspect(sorted.([1]))},
  {"permute([])", inspect([""]), inspect(sorted.([]))},
  {"permute of four elements count", inspect(24),
   inspect(length(Solution.permute([1, 2, 3, 4])))}
]
