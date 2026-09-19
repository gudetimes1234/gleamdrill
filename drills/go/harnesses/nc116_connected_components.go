package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("countComponents(5, [[0,1],[1,2],[3,4]])", 2, countComponents(5, [][]int{{0, 1}, {1, 2}, {3, 4}})),
			tc("countComponents(5, [[0,1],[1,2],[2,3],[3,4]])", 1, countComponents(5, [][]int{{0, 1}, {1, 2}, {2, 3}, {3, 4}})),
			tc("countComponents(3, [])", 3, countComponents(3, [][]int{})),
			tc("countComponents(0, [])", 0, countComponents(0, [][]int{})),
			tc("countComponents(4, [[0,1],[1,0]])", 3, countComponents(4, [][]int{{0, 1}, {1, 0}})),
		}
	})
}
