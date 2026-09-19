package main

func singleNumber(nums []int) int {
	// x ^ x == 0 and x ^ 0 == x, so every pair cancels and the loner remains.
	result := 0
	for _, n := range nums {
		result ^= n
	}
	return result
}
