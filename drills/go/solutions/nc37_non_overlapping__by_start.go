package main

import "sort"

func eraseOverlapIntervals(intervals [][]int) int {
	sorted := append([][]int{}, intervals...)
	// Sort by start; on an overlap, drop whichever reaches further right,
	// since it is the one more likely to collide with what follows.
	sort.Slice(sorted, func(i, j int) bool { return sorted[i][0] < sorted[j][0] })
	removed := 0
	lastEnd := sorted[0][1]
	for _, interval := range sorted[1:] {
		if interval[0] < lastEnd {
			removed++
			lastEnd = min(lastEnd, interval[1])
		} else {
			lastEnd = interval[1]
		}
	}
	return removed
}
