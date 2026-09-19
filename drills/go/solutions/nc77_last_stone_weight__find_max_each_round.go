package main

import "sort"

func lastStoneWeight(stones []int) int {
	remaining := append([]int{}, stones...)
	// Sort every round and take the two at the end: O(n log n) per smash,
	// but nothing to get wrong.
	for len(remaining) > 1 {
		sort.Ints(remaining)
		first := remaining[len(remaining)-1]
		second := remaining[len(remaining)-2]
		remaining = remaining[:len(remaining)-2]
		if first != second {
			remaining = append(remaining, first-second)
		}
	}
	if len(remaining) == 0 {
		return 0
	}
	return remaining[0]
}
