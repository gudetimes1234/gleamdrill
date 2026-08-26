[
  {"network_delay_time([[2,1,1],[2,3,1],[3,4,1]], 4, 2)", inspect(2),
   inspect(Solution.network_delay_time([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2))},
  {"network_delay_time([[1,2,1]], 2, 1)", inspect(1),
   inspect(Solution.network_delay_time([[1, 2, 1]], 2, 1))},
  {"network_delay_time([[1,2,1]], 2, 2) -- node 1 is unreachable", inspect(-1),
   inspect(Solution.network_delay_time([[1, 2, 1]], 2, 2))},
  {"network_delay_time([], 1, 1)", inspect(0), inspect(Solution.network_delay_time([], 1, 1))},
  {"network_delay_time(the long way round is shorter, 3, 1)", inspect(3),
   inspect(Solution.network_delay_time([[1, 2, 1], [2, 3, 2], [1, 3, 4]], 3, 1))}
]
