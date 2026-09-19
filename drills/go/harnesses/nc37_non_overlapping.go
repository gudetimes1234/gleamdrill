package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])", 1, eraseOverlapIntervals([][]int{{1, 2}, {2, 3}, {3, 4}, {1, 3}})),
			tc("eraseOverlapIntervals([[1,2],[1,2],[1,2]])", 2, eraseOverlapIntervals([][]int{{1, 2}, {1, 2}, {1, 2}})),
			tc("eraseOverlapIntervals([[1,2],[2,3]])", 0, eraseOverlapIntervals([][]int{{1, 2}, {2, 3}})),
			tc("eraseOverlapIntervals([[1,100],[11,22],[1,11],[2,12]])", 2, eraseOverlapIntervals([][]int{{1, 100}, {11, 22}, {1, 11}, {2, 12}})),
		}
	})
}
