package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("minMeetingRooms([[0,30],[5,10],[15,20]])", 2, minMeetingRooms([][]int{{0, 30}, {5, 10}, {15, 20}})),
			tc("minMeetingRooms([[7,10],[2,4]])", 1, minMeetingRooms([][]int{{7, 10}, {2, 4}})),
			tc("minMeetingRooms([])", 0, minMeetingRooms([][]int{})),
			tc("minMeetingRooms([[1,5],[5,10]])", 1, minMeetingRooms([][]int{{1, 5}, {5, 10}})),
			tc("minMeetingRooms(six overlapping meetings)", 4, minMeetingRooms([][]int{{1, 10}, {2, 7}, {3, 19}, {8, 12}, {10, 20}, {11, 30}})),
		}
	})
}
