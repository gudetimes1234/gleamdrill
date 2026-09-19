package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("minCostConnectPoints(the five-point example)", 20, minCostConnectPoints([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})),
			tc("minCostConnectPoints([[3,12],[-2,5],[-4,1]])", 18, minCostConnectPoints([][]int{{3, 12}, {-2, 5}, {-4, 1}})),
			tc("minCostConnectPoints([])", 0, minCostConnectPoints([][]int{})),
			tc("minCostConnectPoints([[1,1]]) -- nothing to connect", 0, minCostConnectPoints([][]int{{1, 1}})),
			tc("minCostConnectPoints([[0,0],[0,5]])", 5, minCostConnectPoints([][]int{{0, 0}, {0, 5}})),
		}
	})
}
