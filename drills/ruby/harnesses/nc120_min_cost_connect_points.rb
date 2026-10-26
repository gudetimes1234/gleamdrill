need :min_cost_connect_points

tc "min_cost_connect_points(the five-point example)", 20, min_cost_connect_points([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]])
tc "min_cost_connect_points([[3, 12], [-2, 5], [-4, 1]])", 18, min_cost_connect_points([[3, 12], [-2, 5], [-4, 1]])
tc "min_cost_connect_points([])", 0, min_cost_connect_points([])
tc "min_cost_connect_points([[1, 1]]) -- nothing to connect", 0, min_cost_connect_points([[1, 1]])
tc "min_cost_connect_points([[0, 0], [0, 5]])", 5, min_cost_connect_points([[0, 0], [0, 5]])
