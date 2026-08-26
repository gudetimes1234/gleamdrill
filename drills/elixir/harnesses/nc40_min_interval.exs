[
  {"min_interval([{1, 4}, {2, 4}, {3, 6}, {4, 4}], [2, 3, 4, 5])", inspect([3, 3, 1, 4]),
   inspect(Solution.min_interval([{1, 4}, {2, 4}, {3, 6}, {4, 4}], [2, 3, 4, 5]))},
  {"min_interval([{2, 3}, {2, 5}, {1, 8}, {20, 25}], [2, 19, 5, 22])",
   inspect([2, -1, 4, 6]),
   inspect(Solution.min_interval([{2, 3}, {2, 5}, {1, 8}, {20, 25}], [2, 19, 5, 22]))},
  {"min_interval([], [1, 2])", inspect([-1, -1]), inspect(Solution.min_interval([], [1, 2]))},
  {"min_interval([{1, 10}], [])", inspect([]), inspect(Solution.min_interval([{1, 10}], []))},
  {"min_interval([{1, 3}], [0, 4])", inspect([-1, -1]),
   inspect(Solution.min_interval([{1, 3}], [0, 4]))}
]
