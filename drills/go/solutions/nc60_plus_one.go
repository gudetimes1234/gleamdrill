package main

func plusOne(digits []int) []int {
	result := append([]int{}, digits...)
	// Carry from the right; a 9 becomes 0 and the carry moves on. If the
	// carry survives every digit, the number grew a digit.
	for i := len(result) - 1; i >= 0; i-- {
		if result[i] < 9 {
			result[i]++
			return result
		}
		result[i] = 0
	}
	return append([]int{1}, result...)
}
