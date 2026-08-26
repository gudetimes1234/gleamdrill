[
  {"valid_tree(5, [[0, 1], [0, 2], [0, 3], [1, 4]])", inspect(true),
   inspect(Solution.valid_tree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]))},
  {"valid_tree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]])", inspect(false),
   inspect(Solution.valid_tree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]))},
  {"valid_tree(1, [])", inspect(true), inspect(Solution.valid_tree(1, []))},
  {"valid_tree(0, [])", inspect(true), inspect(Solution.valid_tree(0, []))},
  {"valid_tree(2, []) -- disconnected", inspect(false), inspect(Solution.valid_tree(2, []))},
  {"valid_tree(4, [[0, 1], [2, 3]]) -- two trees", inspect(false),
   inspect(Solution.valid_tree(4, [[0, 1], [2, 3]]))}
]
