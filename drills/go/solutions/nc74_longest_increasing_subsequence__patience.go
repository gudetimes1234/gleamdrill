package main

import "sort"

func lengthOfLIS(nums []int) int {
	// tails[k] is the smallest tail of any increasing subsequence of
	// length k+1. Each number replaces the first tail not below it (or
	// extends the list); the list's length is the answer. O(n log n).
	tails := []int{}
	for _, n := range nums {
		i := sort.SearchInts(tails, n)
		if i == len(tails) {
			tails = append(tails, n)
		} else {
			tails[i] = n
		}
	}
	return len(tails)
}
