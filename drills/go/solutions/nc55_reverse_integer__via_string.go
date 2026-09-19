package main

import (
	"math"
	"strconv"
)

func reverse(x int) int {
	sign := 1
	if x < 0 {
		sign, x = -1, -x
	}
	digits := []byte(strconv.Itoa(x))
	for i, j := 0, len(digits)-1; i < j; i, j = i+1, j-1 {
		digits[i], digits[j] = digits[j], digits[i]
	}
	result, _ := strconv.Atoi(string(digits))
	result *= sign
	if result > math.MaxInt32 || result < math.MinInt32 {
		return 0
	}
	return result
}
