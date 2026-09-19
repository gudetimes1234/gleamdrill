package main

func main() {
	run(func() []testCase {
		example := [][]int{{1, 2, 2, 3, 5}, {3, 2, 3, 4, 4}, {2, 4, 5, 3, 1}, {6, 7, 1, 4, 5}, {5, 1, 1, 2, 4}}
		return []testCase{
			tc("pacificAtlantic(the 5x5 example)", [][]int{{0, 4}, {1, 3}, {1, 4}, {2, 2}, {3, 0}, {3, 1}, {4, 0}}, sortSeqs(pacificAtlantic(example))),
			tc("pacificAtlantic([[1]])", [][]int{{0, 0}}, sortSeqs(pacificAtlantic([][]int{{1}}))),
			tc("pacificAtlantic([])", [][]int{}, sortSeqs(pacificAtlantic([][]int{}))),
			tc("pacificAtlantic([[1,1],[1,1]])", [][]int{{0, 0}, {0, 1}, {1, 0}, {1, 1}}, sortSeqs(pacificAtlantic([][]int{{1, 1}, {1, 1}}))),
		}
	})
}
