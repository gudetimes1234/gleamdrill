package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("combinationSum([2,3,6,7], 7)", [][]int{{2, 2, 3}, {7}}, sortRows(combinationSum([]int{2, 3, 6, 7}, 7))),
			tc("combinationSum([2,3,5], 8)", [][]int{{2, 2, 2, 2}, {2, 3, 3}, {3, 5}}, sortRows(combinationSum([]int{2, 3, 5}, 8))),
			tc("combinationSum([2], 1)", [][]int{}, sortRows(combinationSum([]int{2}, 1))),
			tc("combinationSum([1], 2)", [][]int{{1, 1}}, sortRows(combinationSum([]int{1}, 2))),
		}
	})
}
