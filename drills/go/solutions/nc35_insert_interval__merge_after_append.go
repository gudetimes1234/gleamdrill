package main

import "sort"

func insert(intervals [][]int, newInterval []int) [][]int {
	// Append, sort, then the ordinary merge-intervals pass.
	all := append(append([][]int{}, intervals...), newInterval)
	sort.Slice(all, func(i, j int) bool { return all[i][0] < all[j][0] })
	result := [][]int{}
	for _, interval := range all {
		last := len(result) - 1
		if last >= 0 && interval[0] <= result[last][1] {
			result[last][1] = max(result[last][1], interval[1])
		} else {
			result = append(result, []int{interval[0], interval[1]})
		}
	}
	return result
}
