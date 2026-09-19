package main

func minDistance(word1 string, word2 string) int {
	m, n := len(word1), len(word2)
	// table[i][j]: edits to turn word1[:i] into word2[:j]. Equal last
	// characters cost nothing; otherwise one edit plus the best of
	// replace, delete or insert.
	table := make([][]int, m+1)
	for i := range table {
		table[i] = make([]int, n+1)
		table[i][0] = i
	}
	for j := 0; j <= n; j++ {
		table[0][j] = j
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if word1[i-1] == word2[j-1] {
				table[i][j] = table[i-1][j-1]
			} else {
				table[i][j] = 1 + min(table[i-1][j-1], min(table[i-1][j], table[i][j-1]))
			}
		}
	}
	return table[m][n]
}
