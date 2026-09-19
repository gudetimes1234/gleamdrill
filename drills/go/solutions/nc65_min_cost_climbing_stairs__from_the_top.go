package main

func minCostClimbingStairs(cost []int) int {
	// Recurse from the top down with a memo: the cost to finish from step
	// i is its own cost plus the cheaper of finishing from i+1 or i+2.
	memo := map[int]int{}
	var from func(i int) int
	from = func(i int) int {
		if i >= len(cost) {
			return 0
		}
		if v, ok := memo[i]; ok {
			return v
		}
		memo[i] = cost[i] + min(from(i+1), from(i+2))
		return memo[i]
	}
	return min(from(0), from(1))
}
