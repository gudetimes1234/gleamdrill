package main

func setZeroes(matrix [][]int) {
	rows, cols := len(matrix), len(matrix[0])
	// Use the first row and first column as the markers for the rest, with
	// one extra flag for the first column itself (matrix[0][0] covers the
	// first row).
	firstColZero := false
	for r := 0; r < rows; r++ {
		if matrix[r][0] == 0 {
			firstColZero = true
		}
		for c := 1; c < cols; c++ {
			if matrix[r][c] == 0 {
				matrix[r][0] = 0
				matrix[0][c] = 0
			}
		}
	}
	for r := rows - 1; r >= 0; r-- {
		for c := cols - 1; c >= 1; c-- {
			if matrix[r][0] == 0 || matrix[0][c] == 0 {
				matrix[r][c] = 0
			}
		}
		if firstColZero {
			matrix[r][0] = 0
		}
	}
}
