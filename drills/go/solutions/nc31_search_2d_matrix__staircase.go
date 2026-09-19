package main

func searchMatrix(matrix [][]int, target int) bool {
	// Start at the top-right corner: every step left makes the value
	// smaller, every step down makes it larger, so each comparison rules
	// out a whole row or column.
	row, col := 0, len(matrix[0])-1
	for row < len(matrix) && col >= 0 {
		switch {
		case matrix[row][col] == target:
			return true
		case matrix[row][col] > target:
			col--
		default:
			row++
		}
	}
	return false
}
