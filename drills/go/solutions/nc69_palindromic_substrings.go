package main

func countSubstrings(s string) int {
	count := 0
	// Expand from each of the 2n-1 centres; every successful widening is
	// one more palindrome.
	for centre := 0; centre < len(s); centre++ {
		count += expandCount(s, centre, centre) + expandCount(s, centre, centre+1)
	}
	return count
}

func expandCount(s string, left, right int) int {
	count := 0
	for left >= 0 && right < len(s) && s[left] == s[right] {
		count++
		left--
		right++
	}
	return count
}
