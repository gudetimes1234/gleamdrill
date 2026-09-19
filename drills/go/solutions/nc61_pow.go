package main

func myPow(x float64, n int) float64 {
	if n < 0 {
		x, n = 1/x, -n
	}
	// Square and multiply: each bit of n either contributes the current
	// power or not, and the power squares as the bits move up.
	result := 1.0
	for n > 0 {
		if n&1 == 1 {
			result *= x
		}
		x *= x
		n >>= 1
	}
	return result
}
