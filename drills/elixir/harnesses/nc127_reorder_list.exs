[
  {"reorder_list([1, 2, 3, 4])", inspect([1, 4, 2, 3]),
   inspect(Solution.reorder_list([1, 2, 3, 4]))},
  {"reorder_list([1, 2, 3, 4, 5]) -- the middle stays last", inspect([1, 5, 2, 4, 3]),
   inspect(Solution.reorder_list([1, 2, 3, 4, 5]))},
  {"reorder_list([1, 2])", inspect([1, 2]),
   inspect(Solution.reorder_list([1, 2]))},
  {"reorder_list([1])", inspect([1]),
   inspect(Solution.reorder_list([1]))},
  {"reorder_list([])", inspect([]),
   inspect(Solution.reorder_list([]))}
]
