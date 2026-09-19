package main

func canAttendMeetings(intervals [][]int) bool {
	for i := 0; i < len(intervals); i++ {
		for j := i + 1; j < len(intervals); j++ {
			if intervals[i][0] < intervals[j][1] && intervals[j][0] < intervals[i][1] {
				return false
			}
		}
	}
	return true
}
