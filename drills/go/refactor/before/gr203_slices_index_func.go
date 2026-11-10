package main

func firstNegative(nums []int) int {
	for i, n := range nums {
		if n < 0 {
			return i
		}
	}
	return -1
}
