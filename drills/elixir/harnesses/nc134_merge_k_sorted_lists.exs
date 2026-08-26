[
  {"merge_k_lists([[1, 4, 5], [1, 3, 4], [2, 6]])", inspect([1, 1, 2, 3, 4, 4, 5, 6]),
   inspect(Solution.merge_k_lists([[1, 4, 5], [1, 3, 4], [2, 6]]))},
  {"merge_k_lists([])", inspect([]),
   inspect(Solution.merge_k_lists([]))},
  {"merge_k_lists([[]])", inspect([]),
   inspect(Solution.merge_k_lists([[]]))},
  {"merge_k_lists([[1], [], [0]])", inspect([0, 1]),
   inspect(Solution.merge_k_lists([[1], [], [0]]))},
  {"merge_k_lists([[2, 2], [2]]) -- ties everywhere", inspect([2, 2, 2]),
   inspect(Solution.merge_k_lists([[2, 2], [2]]))}
]
