package main

func myPow(x float64, n int) float64 {
	if n < 0 {
		x, n = 1/x, -n
	}
	result := 1.0
	for i := 0; i < n; i++ {
		result *= x
	}
	return result
}
