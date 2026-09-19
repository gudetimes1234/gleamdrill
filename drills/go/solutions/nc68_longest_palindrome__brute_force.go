package main

func longestPalindrome(s string) string {
	best := ""
	for i := 0; i < len(s); i++ {
		for j := i + 1; j <= len(s); j++ {
			if j-i > len(best) && isPalindrome(s[i:j]) {
				best = s[i:j]
			}
		}
	}
	return best
}

func isPalindrome(s string) bool {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		if s[i] != s[j] {
			return false
		}
	}
	return true
}
