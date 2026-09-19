package main

func rotate(matrix [][]int) {
	n := len(matrix)
	// Transpose, then reverse each row: together they are a quarter turn
	// clockwise, and both are in place.
	for r := 0; r < n; r++ {
		for c := r + 1; c < n; c++ {
			matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
		}
	}
	for _, row := range matrix {
		for i, j := 0, n-1; i < j; i, j = i+1, j-1 {
			row[i], row[j] = row[j], row[i]
		}
	}
}
