[
  {"min_cost_connect_points(the five-point example)", inspect(20),
   inspect(Solution.min_cost_connect_points([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]))},
  {"min_cost_connect_points([[3,12],[-2,5],[-4,1]])", inspect(18),
   inspect(Solution.min_cost_connect_points([[3, 12], [-2, 5], [-4, 1]]))},
  {"min_cost_connect_points([])", inspect(0), inspect(Solution.min_cost_connect_points([]))},
  {"min_cost_connect_points([[1,1]]) -- nothing to connect", inspect(0),
   inspect(Solution.min_cost_connect_points([[1, 1]]))},
  {"min_cost_connect_points([[0,0],[0,5]])", inspect(5),
   inspect(Solution.min_cost_connect_points([[0, 0], [0, 5]]))}
]
