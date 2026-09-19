package main

import "sort"

func eraseOverlapIntervals(intervals [][]int) int {
	sorted := append([][]int{}, intervals...)
	// Sort by end: keeping the interval that ends earliest leaves the most
	// room for the rest, so everything overlapping it is what goes.
	sort.Slice(sorted, func(i, j int) bool { return sorted[i][1] < sorted[j][1] })
	removed := 0
	lastEnd := sorted[0][1]
	for _, interval := range sorted[1:] {
		if interval[0] < lastEnd {
			removed++
		} else {
			lastEnd = interval[1]
		}
	}
	return removed
}
