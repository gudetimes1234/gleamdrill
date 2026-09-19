package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("orangesRotting([[2,1,1],[1,1,0],[0,1,1]])", 4, orangesRotting([][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}})),
			tc("orangesRotting([[2,1,1],[0,1,1],[1,0,1]]) -- one is unreachable", -1, orangesRotting([][]int{{2, 1, 1}, {0, 1, 1}, {1, 0, 1}})),
			tc("orangesRotting([[0,2]])", 0, orangesRotting([][]int{{0, 2}})),
			tc("orangesRotting([[1]]) -- nothing rotten to begin with", -1, orangesRotting([][]int{{1}})),
			tc("orangesRotting([[2,2],[1,1],[0,0],[2,0]])", 1, orangesRotting([][]int{{2, 2}, {1, 1}, {0, 0}, {2, 0}})),
		}
	})
}
