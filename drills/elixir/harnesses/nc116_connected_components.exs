[
  {"count_components(5, [[0, 1], [1, 2], [3, 4]])", inspect(2),
   inspect(Solution.count_components(5, [[0, 1], [1, 2], [3, 4]]))},
  {"count_components(5, [[0, 1], [1, 2], [2, 3], [3, 4]])", inspect(1),
   inspect(Solution.count_components(5, [[0, 1], [1, 2], [2, 3], [3, 4]]))},
  {"count_components(3, [])", inspect(3), inspect(Solution.count_components(3, []))},
  {"count_components(0, [])", inspect(0), inspect(Solution.count_components(0, []))},
  {"count_components(1, [])", inspect(1), inspect(Solution.count_components(1, []))},
  {"count_components(4, [[0, 1], [1, 0]])", inspect(3),
   inspect(Solution.count_components(4, [[0, 1], [1, 0]]))}
]
