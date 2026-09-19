package main

func rotate(matrix [][]int) {
	n := len(matrix)
	// Build the rotated copy from the index rule: (r, c) lands at (c, n-1-r).
	rotated := make([][]int, n)
	for r := range rotated {
		rotated[r] = make([]int, n)
	}
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			rotated[c][n-1-r] = matrix[r][c]
		}
	}
	for r := range matrix {
		copy(matrix[r], rotated[r])
	}
}
