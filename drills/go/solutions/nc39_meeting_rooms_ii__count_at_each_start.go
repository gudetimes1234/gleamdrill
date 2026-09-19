package main

func minMeetingRooms(intervals [][]int) int {
	// The rooms needed is the most meetings in progress at any moment, and
	// that peak always happens at some meeting's start: count them there.
	best := 0
	for _, meeting := range intervals {
		inProgress := 0
		for _, other := range intervals {
			if other[0] <= meeting[0] && meeting[0] < other[1] {
				inProgress++
			}
		}
		best = max(best, inProgress)
	}
	return best
}
