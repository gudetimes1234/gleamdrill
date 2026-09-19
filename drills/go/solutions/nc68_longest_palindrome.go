package main

func longestPalindrome(s string) string {
	best := ""
	// Every palindrome has a centre: a character, or the gap between two.
	// Expand from each of the 2n-1 centres while the ends match.
	for centre := 0; centre < len(s); centre++ {
		for _, candidate := range []string{expand(s, centre, centre), expand(s, centre, centre+1)} {
			if len(candidate) > len(best) {
				best = candidate
			}
		}
	}
	return best
}

func expand(s string, left, right int) string {
	for left >= 0 && right < len(s) && s[left] == s[right] {
		left--
		right++
	}
	return s[left+1 : right]
}
