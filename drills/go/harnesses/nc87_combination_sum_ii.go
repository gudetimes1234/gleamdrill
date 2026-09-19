package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("combinationSum2([10,1,2,7,6,1,5], 8)", [][]int{{1, 1, 6}, {1, 2, 5}, {1, 7}, {2, 6}}, sortRows(combinationSum2([]int{10, 1, 2, 7, 6, 1, 5}, 8))),
			tc("combinationSum2([2,5,2,1,2], 5)", [][]int{{1, 2, 2}, {5}}, sortRows(combinationSum2([]int{2, 5, 2, 1, 2}, 5))),
			tc("combinationSum2([3], 1)", [][]int{}, sortRows(combinationSum2([]int{3}, 1))),
		}
	})
}
