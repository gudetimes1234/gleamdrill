grid = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]

[
  {"pacific_atlantic(the 5x5 example)",
   inspect([{0, 4}, {1, 3}, {1, 4}, {2, 2}, {3, 0}, {3, 1}, {4, 0}]),
   inspect(Solution.pacific_atlantic(grid))},
  {"pacific_atlantic([[1]])", inspect([{0, 0}]), inspect(Solution.pacific_atlantic([[1]]))},
  {"pacific_atlantic([])", inspect([]), inspect(Solution.pacific_atlantic([]))},
  {"pacific_atlantic([[1,1],[1,1]])", inspect([{0, 0}, {0, 1}, {1, 0}, {1, 1}]),
   inspect(Solution.pacific_atlantic([[1, 1], [1, 1]]))}
]
