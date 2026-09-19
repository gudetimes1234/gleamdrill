package main

func uniquePaths(m int, n int) int {
	// Every path is m-1 downs and n-1 rights in some order: choose which
	// of the m+n-2 steps are downs. Compute the binomial without overflow
	// by multiplying and dividing alternately.
	total, downs := m+n-2, m-1
	result := 1
	for i := 1; i <= downs; i++ {
		result = result * (total - downs + i) / i
	}
	return result
}
