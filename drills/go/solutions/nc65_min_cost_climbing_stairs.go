package main

func minCostClimbingStairs(cost []int) int {
	// Cheapest way to stand on step i, having paid for it, comes from the
	// cheaper of the two steps below. The top is one past the last step.
	twoBack, oneBack := cost[0], cost[1]
	for i := 2; i < len(cost); i++ {
		twoBack, oneBack = oneBack, cost[i]+min(twoBack, oneBack)
	}
	return min(twoBack, oneBack)
}
