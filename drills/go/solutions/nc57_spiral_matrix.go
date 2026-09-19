package main

func spiralOrder(matrix [][]int) []int {
	result := []int{}
	top, bottom := 0, len(matrix)-1
	left, right := 0, len(matrix[0])-1
	// Peel the outer ring: top row, right column, bottom row, left column,
	// then shrink the bounds. The inner two checks stop a single leftover
	// row or column from being read twice.
	for top <= bottom && left <= right {
		for c := left; c <= right; c++ {
			result = append(result, matrix[top][c])
		}
		for r := top + 1; r <= bottom; r++ {
			result = append(result, matrix[r][right])
		}
		if top < bottom {
			for c := right - 1; c >= left; c-- {
				result = append(result, matrix[bottom][c])
			}
		}
		if left < right {
			for r := bottom - 1; r > top; r-- {
				result = append(result, matrix[r][left])
			}
		}
		top++
		bottom--
		left++
		right--
	}
	return result
}
