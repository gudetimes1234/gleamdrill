package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxAreaOfIsland(the 8x13 example)", 6, maxAreaOfIsland([][]int{
				{0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0},
				{0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0},
				{0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0},
				{0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0}})),
			tc("maxAreaOfIsland([[0,0,0,0,0,0,0,0]])", 0, maxAreaOfIsland([][]int{{0, 0, 0, 0, 0, 0, 0, 0}})),
			tc("maxAreaOfIsland([[1]])", 1, maxAreaOfIsland([][]int{{1}})),
			tc("maxAreaOfIsland([[1,1],[1,0]])", 3, maxAreaOfIsland([][]int{{1, 1}, {1, 0}})),
		}
	})
}
