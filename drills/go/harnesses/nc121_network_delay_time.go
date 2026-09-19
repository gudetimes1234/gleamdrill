package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)", 2, networkDelayTime([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)),
			tc("networkDelayTime([[1,2,1]], 2, 1)", 1, networkDelayTime([][]int{{1, 2, 1}}, 2, 1)),
			tc("networkDelayTime([[1,2,1]], 2, 2) -- node 1 is unreachable", -1, networkDelayTime([][]int{{1, 2, 1}}, 2, 2)),
			tc("networkDelayTime([], 1, 1)", 0, networkDelayTime([][]int{}, 1, 1)),
			tc("networkDelayTime(the long way round is shorter, 3, 1)", 3, networkDelayTime([][]int{{1, 2, 1}, {2, 3, 2}, {1, 3, 4}}, 3, 1)),
		}
	})
}
