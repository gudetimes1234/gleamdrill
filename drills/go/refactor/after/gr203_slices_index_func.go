package main

import "slices"

func firstNegative(nums []int) int {
	return slices.IndexFunc(nums, func(n int) bool { return n < 0 })
}
