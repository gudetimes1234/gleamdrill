package main

func isMatch(s string, p string) bool {
	m, n := len(s), len(p)
	// table[i][j]: does s[i:] match p[j:]? A star (p[j+1]) means either
	// skip the pair, or consume one matching character and stay on the pair.
	table := make([][]bool, m+1)
	for i := range table {
		table[i] = make([]bool, n+1)
	}
	table[m][n] = true
	for i := m; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			first := i < m && (p[j] == '.' || p[j] == s[i])
			if j+1 < n && p[j+1] == '*' {
				table[i][j] = table[i][j+2] || first && table[i+1][j]
			} else {
				table[i][j] = first && table[i+1][j+1]
			}
		}
	}
	return table[0][0]
}
