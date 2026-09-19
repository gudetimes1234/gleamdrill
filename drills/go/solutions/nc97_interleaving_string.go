package main

func isInterleave(s1 string, s2 string, s3 string) bool {
	m, n := len(s1), len(s2)
	if m+n != len(s3) {
		return false
	}
	// table[i][j]: can s1[:i] and s2[:j] interleave into s3[:i+j]? The
	// last character of that prefix came from one of them.
	table := make([][]bool, m+1)
	for i := range table {
		table[i] = make([]bool, n+1)
	}
	table[0][0] = true
	for i := 0; i <= m; i++ {
		for j := 0; j <= n; j++ {
			if i > 0 && table[i-1][j] && s1[i-1] == s3[i+j-1] {
				table[i][j] = true
			}
			if j > 0 && table[i][j-1] && s2[j-1] == s3[i+j-1] {
				table[i][j] = true
			}
		}
	}
	return table[m][n]
}
