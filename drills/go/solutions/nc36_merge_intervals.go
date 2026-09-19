package main

import "sort"

func merge(intervals [][]int) [][]int {
	sorted := append([][]int{}, intervals...)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i][0] < sorted[j][0] })
	result := [][]int{}
	for _, interval := range sorted {
		last := len(result) - 1
		// Sorted by start, so an overlap can only be with the last merged one.
		if last >= 0 && interval[0] <= result[last][1] {
			result[last][1] = max(result[last][1], interval[1])
		} else {
			result = append(result, []int{interval[0], interval[1]})
		}
	}
	return result
}
