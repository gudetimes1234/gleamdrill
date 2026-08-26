inf = 2_147_483_647

[
  {"walls_and_gates(the classic 4x4)",
   inspect([[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]]),
   inspect(
     Solution.walls_and_gates([
       [inf, -1, 0, inf],
       [inf, inf, inf, -1],
       [inf, -1, inf, -1],
       [0, -1, inf, inf]
     ])
   )},
  {"walls_and_gates([[0]])", inspect([[0]]), inspect(Solution.walls_and_gates([[0]]))},
  {"walls_and_gates([[-1]])", inspect([[-1]]), inspect(Solution.walls_and_gates([[-1]]))},
  {"walls_and_gates([])", inspect([]), inspect(Solution.walls_and_gates([]))},
  {"walls_and_gates(no gate at all)", inspect([[inf, inf]]),
   inspect(Solution.walls_and_gates([[inf, inf]]))}
]
