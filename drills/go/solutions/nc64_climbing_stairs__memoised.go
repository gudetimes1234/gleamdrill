package main

func climbStairs(n int) int {
	memo := map[int]int{}
	var ways func(i int) int
	ways = func(i int) int {
		if i <= 1 {
			return 1
		}
		if v, ok := memo[i]; ok {
			return v
		}
		memo[i] = ways(i-1) + ways(i-2)
		return memo[i]
	}
	return ways(n)
}
