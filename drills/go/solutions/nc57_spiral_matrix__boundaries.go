package main

func spiralOrder(matrix [][]int) []int {
	// Walk one cell at a time, turning right whenever the next cell is off
	// the grid or already visited.
	rows, cols := len(matrix), len(matrix[0])
	visited := make([][]bool, rows)
	for r := range visited {
		visited[r] = make([]bool, cols)
	}
	moves := [][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	result := make([]int, 0, rows*cols)
	r, c, direction := 0, 0, 0
	for len(result) < rows*cols {
		result = append(result, matrix[r][c])
		visited[r][c] = true
		nr, nc := r+moves[direction][0], c+moves[direction][1]
		if nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc] {
			direction = (direction + 1) % 4
			nr, nc = r+moves[direction][0], c+moves[direction][1]
		}
		r, c = nr, nc
	}
	return result
}
