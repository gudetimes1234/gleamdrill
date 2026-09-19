package main

import "sort"

func minMeetingRooms(intervals [][]int) int {
	starts := make([]int, len(intervals))
	ends := make([]int, len(intervals))
	for i, interval := range intervals {
		starts[i], ends[i] = interval[0], interval[1]
	}
	sort.Ints(starts)
	sort.Ints(ends)
	// Walk the starts in order; a meeting needs a new room unless the
	// earliest unfinished meeting has ended by then.
	rooms, best, e := 0, 0, 0
	for _, start := range starts {
		if start >= ends[e] {
			e++
		} else {
			rooms++
		}
		best = max(best, rooms)
	}
	return best
}
