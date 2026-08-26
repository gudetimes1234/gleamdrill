[
  {"merge_two_lists([1, 2, 4], [1, 3, 4])", inspect([1, 1, 2, 3, 4, 4]),
   inspect(Solution.merge_two_lists([1, 2, 4], [1, 3, 4]))},
  {"merge_two_lists([], [])", inspect([]),
   inspect(Solution.merge_two_lists([], []))},
  {"merge_two_lists([], [0])", inspect([0]),
   inspect(Solution.merge_two_lists([], [0]))},
  {"merge_two_lists([5], [1, 2, 3])", inspect([1, 2, 3, 5]),
   inspect(Solution.merge_two_lists([5], [1, 2, 3]))}
]
