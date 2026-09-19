package main

import "math"

func reverse(x int) int {
	result := 0
	for x != 0 {
		digit := x % 10
		x /= 10
		result = result*10 + digit
		// The answer must fit a signed 32-bit int, whatever the platform's int is.
		if result > math.MaxInt32 || result < math.MinInt32 {
			return 0
		}
	}
	return result
}
