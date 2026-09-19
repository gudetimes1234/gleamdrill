package main

func partition(s string) [][]string {
	n := len(s)
	// Precompute which substrings are palindromes so each check in the
	// search is a table lookup rather than a scan.
	table := make([][]bool, n)
	for i := range table {
		table[i] = make([]bool, n)
	}
	for i := n - 1; i >= 0; i-- {
		for j := i; j < n; j++ {
			table[i][j] = s[i] == s[j] && (j-i < 2 || table[i+1][j-1])
		}
	}
	result := [][]string{}
	var build func(start int, current []string)
	build = func(start int, current []string) {
		if start == n {
			result = append(result, append([]string{}, current...))
			return
		}
		for end := start; end < n; end++ {
			if table[start][end] {
				build(end+1, append(current, s[start:end+1]))
			}
		}
	}
	build(0, []string{})
	return result
}
