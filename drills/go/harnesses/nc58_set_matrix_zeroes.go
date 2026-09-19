package main

func zeroed(matrix [][]int) [][]int {
	setZeroes(matrix)
	return matrix
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("setZeroes([[1,1,1],[1,0,1],[1,1,1]])", [][]int{{1, 0, 1}, {0, 0, 0}, {1, 0, 1}}, zeroed([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})),
			tc("setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])", [][]int{{0, 0, 0, 0}, {0, 4, 5, 0}, {0, 3, 1, 0}}, zeroed([][]int{{0, 1, 2, 0}, {3, 4, 5, 2}, {1, 3, 1, 5}})),
			tc("setZeroes([[1,2],[3,4]])", [][]int{{1, 2}, {3, 4}}, zeroed([][]int{{1, 2}, {3, 4}})),
			tc("setZeroes([[1,0]])", [][]int{{0, 0}}, zeroed([][]int{{1, 0}})),
		}
	})
}
