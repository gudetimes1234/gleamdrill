package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findTargetSumWays([1,1,1,1,1], 3)", 5, findTargetSumWays([]int{1, 1, 1, 1, 1}, 3)),
			tc("findTargetSumWays([1], 1)", 1, findTargetSumWays([]int{1}, 1)),
			tc("findTargetSumWays([1], 2)", 0, findTargetSumWays([]int{1}, 2)),
			tc("findTargetSumWays([0,0,0,0,0], 0)", 32, findTargetSumWays([]int{0, 0, 0, 0, 0}, 0)),
			tc("findTargetSumWays([], 0)", 1, findTargetSumWays([]int{}, 0)),
			tc("findTargetSumWays([1,2,3,4,5], 3)", 3, findTargetSumWays([]int{1, 2, 3, 4, 5}, 3)),
		}
	})
}
