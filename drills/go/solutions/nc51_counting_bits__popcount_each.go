package main

import "math/bits"

func countBits(n int) []int {
	result := make([]int, n+1)
	for i := range result {
		result[i] = bits.OnesCount(uint(i))
	}
	return result
}
