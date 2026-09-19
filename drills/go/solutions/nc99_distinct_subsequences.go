package main

func numDistinct(s string, t string) int {
	m, n := len(s), len(t)
	// table[i][j]: ways s[i:] can produce t[j:]. Skip s[i] always; use it
	// too when it matches t[j].
	table := make([][]int, m+1)
	for i := range table {
		table[i] = make([]int, n+1)
		table[i][n] = 1
	}
	for i := m - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			table[i][j] = table[i+1][j]
			if s[i] == t[j] {
				table[i][j] += table[i+1][j+1]
			}
		}
	}
	return table[0][0]
}
