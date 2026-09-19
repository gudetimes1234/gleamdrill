package main

import "sort"

func longestIncreasingPath(matrix [][]int) int {
	rows, cols := len(matrix), len(matrix[0])
	// Process cells in increasing value order: by the time a cell is
	// reached, every smaller neighbour already knows its best path, so no
	// recursion is needed.
	cells := make([][2]int, 0, rows*cols)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			cells = append(cells, [2]int{r, c})
		}
	}
	sort.Slice(cells, func(i, j int) bool {
		return matrix[cells[i][0]][cells[i][1]] < matrix[cells[j][0]][cells[j][1]]
	})
	longest := make([][]int, rows)
	for r := range longest {
		longest[r] = make([]int, cols)
	}
	answer := 0
	for _, cell := range cells {
		r, c := cell[0], cell[1]
		best := 1
		for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			nr, nc := r+d[0], c+d[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] < matrix[r][c] {
				best = max(best, 1+longest[nr][nc])
			}
		}
		longest[r][c] = best
		answer = max(answer, best)
	}
	return answer
}
