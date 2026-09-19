package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("merge([[1,3],[2,6],[8,10],[15,18]])", [][]int{{1, 6}, {8, 10}, {15, 18}}, merge([][]int{{1, 3}, {2, 6}, {8, 10}, {15, 18}})),
			tc("merge([[1,4],[4,5]])", [][]int{{1, 5}}, merge([][]int{{1, 4}, {4, 5}})),
			tc("merge([[1,4],[0,4]])", [][]int{{0, 4}}, merge([][]int{{1, 4}, {0, 4}})),
			tc("merge([])", [][]int{}, merge([][]int{})),
			tc("merge([[1,4],[2,3]])", [][]int{{1, 4}}, merge([][]int{{1, 4}, {2, 3}})),
		}
	})
}
