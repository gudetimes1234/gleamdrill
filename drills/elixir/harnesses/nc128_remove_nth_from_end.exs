[
  {"remove_nth_from_end([1, 2, 3, 4, 5], 2)", inspect([1, 2, 3, 5]),
   inspect(Solution.remove_nth_from_end([1, 2, 3, 4, 5], 2))},
  {"remove_nth_from_end([1], 1)", inspect([]),
   inspect(Solution.remove_nth_from_end([1], 1))},
  {"remove_nth_from_end([1, 2], 1)", inspect([1]),
   inspect(Solution.remove_nth_from_end([1, 2], 1))},
  {"remove_nth_from_end([1, 2], 2) -- the head goes", inspect([2]),
   inspect(Solution.remove_nth_from_end([1, 2], 2))},
  {"remove_nth_from_end([1, 2, 3], 5) -- nothing to remove", inspect([1, 2, 3]),
   inspect(Solution.remove_nth_from_end([1, 2, 3], 5))}
]
