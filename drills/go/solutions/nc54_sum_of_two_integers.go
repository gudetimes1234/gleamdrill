package main

func getSum(a int, b int) int {
	// XOR adds without carrying; AND finds where a carry is due, shifted
	// left one place. Repeat until nothing is left to carry.
	for b != 0 {
		carry := (a & b) << 1
		a ^= b
		b = carry
	}
	return a
}
