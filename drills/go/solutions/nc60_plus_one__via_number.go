package main

import "math/big"

func plusOne(digits []int) []int {
	// Convert to a number, add one, convert back. A big.Int keeps this
	// honest for inputs longer than a machine word.
	n := new(big.Int)
	ten := big.NewInt(10)
	for _, d := range digits {
		n.Mul(n, ten)
		n.Add(n, big.NewInt(int64(d)))
	}
	n.Add(n, big.NewInt(1))
	text := n.String()
	result := make([]int, len(text))
	for i := range text {
		result[i] = int(text[i] - '0')
	}
	return result
}
