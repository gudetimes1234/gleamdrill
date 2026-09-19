package main

func checkValidString(s string) bool {
	// Track the range of possible open counts: a star can widen it either
	// way. The low end never goes below zero (a star read as ')' when
	// nothing is open is better read as nothing).
	low, high := 0, 0
	for i := 0; i < len(s); i++ {
		switch s[i] {
		case '(':
			low++
			high++
		case ')':
			low--
			high--
		default:
			low--
			high++
		}
		if high < 0 {
			return false
		}
		low = max(low, 0)
	}
	return low == 0
}
