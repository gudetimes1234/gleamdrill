[
  {"copy_random_list(each node points at the next)", inspect([{7, 1}, {13, -1}]),
   inspect(Solution.copy_random_list([{100, 7, 200}, {200, 13, -1}]))},
  {"copy_random_list(a node pointing at itself)", inspect([{1, 0}]),
   inspect(Solution.copy_random_list([{9, 1, 9}]))},
  {"copy_random_list(a forward link to a node not yet seen)", inspect([{1, 2}, {2, -1}, {3, 0}]),
   inspect(Solution.copy_random_list([{5, 1, 7}, {6, 2, -1}, {7, 3, 5}]))},
  {"copy_random_list([])", inspect([]),
   inspect(Solution.copy_random_list([]))}
]
