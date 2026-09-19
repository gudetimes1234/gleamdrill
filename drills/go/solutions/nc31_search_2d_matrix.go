package main

func searchMatrix(matrix [][]int, target int) bool {
	rows, cols := len(matrix), len(matrix[0])
	// Rows run on from each other, so the matrix is one sorted list of
	// rows*cols cells; index it with a division and a remainder.
	low, high := 0, rows*cols-1
	for low <= high {
		mid := low + (high-low)/2
		value := matrix[mid/cols][mid%cols]
		switch {
		case value == target:
			return true
		case value < target:
			low = mid + 1
		default:
			high = mid - 1
		}
	}
	return false
}
