package main

func countBits(n int) []int {
	result := make([]int, n+1)
	// i >> 1 drops the lowest bit, whose count is already known; add it back.
	for i := 1; i <= n; i++ {
		result[i] = result[i>>1] + i&1
	}
	return result
}
