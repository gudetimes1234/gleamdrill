package main

import "sort"

func containsDuplicate(nums []int) bool {
	sorted := append([]int(nil), nums...)
	sort.Ints(sorted)
	for i := 1; i < len(sorted); i++ {
		if sorted[i] == sorted[i-1] {
			return true
		}
	}
	return false
}
