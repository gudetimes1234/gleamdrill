package main

func main() {
	run(func() []testCase {
		matrix := [][]int{{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}}
		return []testCase{
			tc("searchMatrix(matrix, 3)", true, searchMatrix(matrix, 3)),
			tc("searchMatrix(matrix, 13)", false, searchMatrix(matrix, 13)),
			tc("searchMatrix(matrix, 60)", true, searchMatrix(matrix, 60)),
			tc("searchMatrix([[1]], 2)", false, searchMatrix([][]int{{1}}, 2)),
		}
	})
}
