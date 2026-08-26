[
  {"find_kth_largest([3, 2, 1, 5, 6, 4], 2)", inspect(5),
   inspect(Solution.find_kth_largest([3, 2, 1, 5, 6, 4], 2))},
  {"find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)", inspect(4),
   inspect(Solution.find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))},
  {"find_kth_largest([1], 1)", inspect(1), inspect(Solution.find_kth_largest([1], 1))},
  {"find_kth_largest([2, 1], 2)", inspect(1), inspect(Solution.find_kth_largest([2, 1], 2))},
  {"find_kth_largest([7, 6, 5, 4, 3, 2, 1], 3)", inspect(5),
   inspect(Solution.find_kth_largest([7, 6, 5, 4, 3, 2, 1], 3))},
  {"find_kth_largest([], 1)", inspect(nil), inspect(Solution.find_kth_largest([], 1))}
]
