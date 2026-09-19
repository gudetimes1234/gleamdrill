package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("minCostClimbingStairs([10,15,20])", 15, minCostClimbingStairs([]int{10, 15, 20})),
			tc("minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])", 6, minCostClimbingStairs([]int{1, 100, 1, 1, 1, 100, 1, 1, 100, 1})),
			tc("minCostClimbingStairs([0,0])", 0, minCostClimbingStairs([]int{0, 0})),
			tc("minCostClimbingStairs([5,1])", 1, minCostClimbingStairs([]int{5, 1})),
		}
	})
}
