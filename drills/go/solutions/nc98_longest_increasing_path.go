package main

func longestIncreasingPath(matrix [][]int) int {
	rows, cols := len(matrix), len(matrix[0])
	// longest[r][c]: the longest increasing path starting here, memoised.
	// Increasing paths cannot cycle, so no visited set is needed.
	longest := make([][]int, rows)
	for r := range longest {
		longest[r] = make([]int, cols)
	}
	var from func(r, c int) int
	from = func(r, c int) int {
		if longest[r][c] > 0 {
			return longest[r][c]
		}
		best := 1
		for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			nr, nc := r+d[0], c+d[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] > matrix[r][c] {
				best = max(best, 1+from(nr, nc))
			}
		}
		longest[r][c] = best
		return best
	}
	answer := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			answer = max(answer, from(r, c))
		}
	}
	return answer
}
