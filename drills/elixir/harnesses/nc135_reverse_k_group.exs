[
  {"reverse_k_group([1, 2, 3, 4, 5], 2)", inspect([2, 1, 4, 3, 5]),
   inspect(Solution.reverse_k_group([1, 2, 3, 4, 5], 2))},
  {"reverse_k_group([1, 2, 3, 4, 5], 3) -- the last two are left alone", inspect([3, 2, 1, 4, 5]),
   inspect(Solution.reverse_k_group([1, 2, 3, 4, 5], 3))},
  {"reverse_k_group([1, 2, 3, 4], 4)", inspect([4, 3, 2, 1]),
   inspect(Solution.reverse_k_group([1, 2, 3, 4], 4))},
  {"reverse_k_group([1, 2, 3], 1) -- nothing changes", inspect([1, 2, 3]),
   inspect(Solution.reverse_k_group([1, 2, 3], 1))},
  {"reverse_k_group([1, 2], 5) -- the group never fills", inspect([1, 2]),
   inspect(Solution.reverse_k_group([1, 2], 5))},
  {"reverse_k_group([], 2)", inspect([]),
   inspect(Solution.reverse_k_group([], 2))}
]
