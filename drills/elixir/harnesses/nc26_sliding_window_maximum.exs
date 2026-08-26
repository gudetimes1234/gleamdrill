[
  {"max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)", inspect([3, 3, 5, 5, 6, 7]),
   inspect(Solution.max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3))},
  {"max_sliding_window([1], 1)", inspect([1]), inspect(Solution.max_sliding_window([1], 1))},
  {"max_sliding_window([], 3)", inspect([]), inspect(Solution.max_sliding_window([], 3))},
  {"max_sliding_window([9, 8, 7, 6], 2)", inspect([9, 8, 7]),
   inspect(Solution.max_sliding_window([9, 8, 7, 6], 2))},
  {"max_sliding_window([1, -1], 1)", inspect([1, -1]),
   inspect(Solution.max_sliding_window([1, -1], 1))},
  {"max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4)", inspect([7, 7, 7, 7, 7]),
   inspect(Solution.max_sliding_window([-7, -8, 7, 5, 7, 1, 6, 0], 4))}
]
