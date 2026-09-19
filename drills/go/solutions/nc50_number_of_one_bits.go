package main

func hammingWeight(n uint32) int {
	count := 0
	// n & (n-1) clears the lowest set bit, so this loops once per one bit.
	for n != 0 {
		n &= n - 1
		count++
	}
	return count
}
