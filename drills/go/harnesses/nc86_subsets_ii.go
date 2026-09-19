package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("subsetsWithDup([1,2,2])", [][]int{{}, {1}, {1, 2}, {1, 2, 2}, {2}, {2, 2}}, sortRows(subsetsWithDup([]int{1, 2, 2}))),
			tc("subsetsWithDup([0])", [][]int{{}, {0}}, sortRows(subsetsWithDup([]int{0}))),
			tc("subsetsWithDup([4,4,4,1,4])", [][]int{{}, {1}, {1, 4}, {1, 4, 4}, {1, 4, 4, 4}, {1, 4, 4, 4, 4}, {4}, {4, 4}, {4, 4, 4}, {4, 4, 4, 4}}, sortRows(subsetsWithDup([]int{4, 4, 4, 1, 4}))),
		}
	})
}
