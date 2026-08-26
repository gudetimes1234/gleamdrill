[
  {"can_finish(2, [[1, 0]])", inspect(true), inspect(Solution.can_finish(2, [[1, 0]]))},
  {"can_finish(2, [[1, 0], [0, 1]])", inspect(false),
   inspect(Solution.can_finish(2, [[1, 0], [0, 1]]))},
  {"can_finish(1, [])", inspect(true), inspect(Solution.can_finish(1, []))},
  {"can_finish(0, [])", inspect(true), inspect(Solution.can_finish(0, []))},
  {"can_finish(4, [[1, 0], [2, 1], [3, 2]])", inspect(true),
   inspect(Solution.can_finish(4, [[1, 0], [2, 1], [3, 2]]))},
  {"can_finish(3, [[0, 1], [1, 2], [2, 0]])", inspect(false),
   inspect(Solution.can_finish(3, [[0, 1], [1, 2], [2, 0]]))}
]
