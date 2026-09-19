package main

func isInterleave(s1 string, s2 string, s3 string) bool {
	m, n := len(s1), len(s2)
	if m+n != len(s3) {
		return false
	}
	// Only the previous row of the table is ever read, so keep one row.
	row := make([]bool, n+1)
	row[0] = true
	for j := 1; j <= n; j++ {
		row[j] = row[j-1] && s2[j-1] == s3[j-1]
	}
	for i := 1; i <= m; i++ {
		row[0] = row[0] && s1[i-1] == s3[i-1]
		for j := 1; j <= n; j++ {
			row[j] = row[j] && s1[i-1] == s3[i+j-1] || row[j-1] && s2[j-1] == s3[i+j-1]
		}
	}
	return row[n]
}
