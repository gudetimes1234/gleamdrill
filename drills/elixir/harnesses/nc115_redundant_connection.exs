[
  {"find_redundant_connection([[1, 2], [1, 3], [2, 3]])", inspect([2, 3]),
   inspect(Solution.find_redundant_connection([[1, 2], [1, 3], [2, 3]]))},
  {"find_redundant_connection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])", inspect([1, 4]),
   inspect(Solution.find_redundant_connection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]))},
  {"find_redundant_connection([[1, 2], [2, 1]])", inspect([2, 1]),
   inspect(Solution.find_redundant_connection([[1, 2], [2, 1]]))}
]
