package main

func longestCommonSubsequence(text1 string, text2 string) int {
	// table[i][j]: LCS of text1[i:] and text2[j:]. Matching characters
	// extend the diagonal; otherwise take the better of dropping one.
	m, n := len(text1), len(text2)
	table := make([][]int, m+1)
	for i := range table {
		table[i] = make([]int, n+1)
	}
	for i := m - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if text1[i] == text2[j] {
				table[i][j] = 1 + table[i+1][j+1]
			} else {
				table[i][j] = max(table[i+1][j], table[i][j+1])
			}
		}
	}
	return table[0][0]
}
