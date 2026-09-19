package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("findRedundantConnection([[1,2],[1,3],[2,3]])", []int{2, 3}, findRedundantConnection([][]int{{1, 2}, {1, 3}, {2, 3}})),
			tc("findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])", []int{1, 4}, findRedundantConnection([][]int{{1, 2}, {2, 3}, {3, 4}, {1, 4}, {1, 5}})),
			tc("findRedundantConnection([[1,2],[2,1]])", []int{2, 1}, findRedundantConnection([][]int{{1, 2}, {2, 1}})),
		}
	})
}
