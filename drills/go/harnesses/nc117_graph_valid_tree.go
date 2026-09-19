package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("validTree(5, [[0,1],[0,2],[0,3],[1,4]])", true, validTree(5, [][]int{{0, 1}, {0, 2}, {0, 3}, {1, 4}})),
			tc("validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])", false, validTree(5, [][]int{{0, 1}, {1, 2}, {2, 3}, {1, 3}, {1, 4}})),
			tc("validTree(1, [])", true, validTree(1, [][]int{})),
			tc("validTree(0, [])", true, validTree(0, [][]int{})),
			tc("validTree(2, []) -- disconnected", false, validTree(2, [][]int{})),
			tc("validTree(4, [[0,1],[2,3]]) -- two trees", false, validTree(4, [][]int{{0, 1}, {2, 3}})),
		}
	})
}
