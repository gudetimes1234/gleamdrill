package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("canFinish(2, [[1,0]])", true, canFinish(2, [][]int{{1, 0}})),
			tc("canFinish(2, [[1,0],[0,1]])", false, canFinish(2, [][]int{{1, 0}, {0, 1}})),
			tc("canFinish(1, [])", true, canFinish(1, [][]int{})),
			tc("canFinish(5, [[1,4],[2,4],[3,1],[3,2]])", true, canFinish(5, [][]int{{1, 4}, {2, 4}, {3, 1}, {3, 2}})),
			tc("canFinish(3, [[0,1],[1,2],[2,0]])", false, canFinish(3, [][]int{{0, 1}, {1, 2}, {2, 0}})),
		}
	})
}
