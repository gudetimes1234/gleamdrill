package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("swimInWater([[0,2],[1,3]])", 3, swimInWater([][]int{{0, 2}, {1, 3}})),
			tc("swimInWater(the 5x5 spiral)", 16, swimInWater([][]int{{0, 1, 2, 3, 4}, {24, 23, 22, 21, 5}, {12, 13, 14, 15, 16}, {11, 17, 18, 19, 20}, {10, 9, 8, 7, 6}})),
			tc("swimInWater([[0]])", 0, swimInWater([][]int{{0}})),
			tc("swimInWater([[3,2],[1,0]]) -- the start is the deepest cell", 3, swimInWater([][]int{{3, 2}, {1, 0}})),
		}
	})
}
