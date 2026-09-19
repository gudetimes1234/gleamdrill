package main

func rotated(matrix [][]int) [][]int {
	rotate(matrix)
	return matrix
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("rotate([[1,2,3],[4,5,6],[7,8,9]])", [][]int{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}, rotated([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})),
			tc("rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])", [][]int{{15, 13, 2, 5}, {14, 3, 4, 1}, {12, 6, 8, 9}, {16, 7, 10, 11}}, rotated([][]int{{5, 1, 9, 11}, {2, 4, 8, 10}, {13, 3, 6, 7}, {15, 14, 12, 16}})),
			tc("rotate([[1]])", [][]int{{1}}, rotated([][]int{{1}})),
		}
	})
}
