# Any order is acceptable, so every case compares sorted.
sorted = fn points, k -> Solution.k_closest(points, k) |> Enum.sort() end

[
  {"k_closest([{1, 3}, {-2, 2}], 1)", inspect([{-2, 2}]),
   inspect(sorted.([{1, 3}, {-2, 2}], 1))},
  {"k_closest([{3, 3}, {5, -1}, {-2, 4}], 2)", inspect([{-2, 4}, {3, 3}]),
   inspect(sorted.([{3, 3}, {5, -1}, {-2, 4}], 2))},
  {"k_closest([], 0)", inspect([]), inspect(sorted.([], 0))},
  {"k_closest([{0, 0}], 1)", inspect([{0, 0}]), inspect(sorted.([{0, 0}], 1))},
  {"k_closest([{1, 1}, {2, 2}, {3, 3}], 2)", inspect([{1, 1}, {2, 2}]),
   inspect(sorted.([{1, 1}, {2, 2}, {3, 3}], 2))}
]
