package main

import "sort"

func longestConsecutive(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	sorted := append([]int(nil), nums...)
	sort.Ints(sorted)
	longest, length := 1, 1
	for i := 1; i < len(sorted); i++ {
		switch {
		case sorted[i] == sorted[i-1]:
			continue
		case sorted[i] == sorted[i-1]+1:
			length++
		default:
			length = 1
		}
		if length > longest {
			longest = length
		}
	}
	return longest
}
