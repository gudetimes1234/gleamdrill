package main

func countSubstrings(s string) int {
	n := len(s)
	// table[i][j]: is s[i..j] a palindrome? True when the ends match and
	// the inside is one (or is at most one character).
	table := make([][]bool, n)
	for i := range table {
		table[i] = make([]bool, n)
	}
	count := 0
	for i := n - 1; i >= 0; i-- {
		for j := i; j < n; j++ {
			if s[i] == s[j] && (j-i < 2 || table[i+1][j-1]) {
				table[i][j] = true
				count++
			}
		}
	}
	return count
}
