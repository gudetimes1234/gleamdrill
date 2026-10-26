need :min_cost_climbing_stairs

tc "min_cost_climbing_stairs([10, 15, 20])", 15, min_cost_climbing_stairs([10, 15, 20])
tc "min_cost_climbing_stairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])", 6,
   min_cost_climbing_stairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
tc "min_cost_climbing_stairs([0, 0])", 0, min_cost_climbing_stairs([0, 0])
tc "min_cost_climbing_stairs([1, 2])", 1, min_cost_climbing_stairs([1, 2])
tc "min_cost_climbing_stairs([0, 1, 1, 0])", 1, min_cost_climbing_stairs([0, 1, 1, 0])
tc "min_cost_climbing_stairs([])", 0, min_cost_climbing_stairs([])
