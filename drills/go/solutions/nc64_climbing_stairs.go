package main

func climbStairs(n int) int {
	// Ways to reach step i = ways to reach i-1 + ways to reach i-2: the
	// Fibonacci recurrence, kept in two variables.
	previous, current := 1, 1
	for i := 2; i <= n; i++ {
		previous, current = current, previous+current
	}
	return current
}
