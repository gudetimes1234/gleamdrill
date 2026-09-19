package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("canAttendMeetings([[0,30],[5,10],[15,20]])", false, canAttendMeetings([][]int{{0, 30}, {5, 10}, {15, 20}})),
			tc("canAttendMeetings([[7,10],[2,4]])", true, canAttendMeetings([][]int{{7, 10}, {2, 4}})),
			tc("canAttendMeetings([])", true, canAttendMeetings([][]int{})),
			tc("canAttendMeetings([[1,5],[5,10]])", true, canAttendMeetings([][]int{{1, 5}, {5, 10}})),
			tc("canAttendMeetings([[5,10],[1,6]])", false, canAttendMeetings([][]int{{5, 10}, {1, 6}})),
		}
	})
}
