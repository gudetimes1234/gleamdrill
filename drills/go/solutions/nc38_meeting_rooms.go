package main

import "sort"

func canAttendMeetings(intervals [][]int) bool {
	sorted := append([][]int{}, intervals...)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i][0] < sorted[j][0] })
	for i := 1; i < len(sorted); i++ {
		if sorted[i][0] < sorted[i-1][1] {
			return false
		}
	}
	return true
}
