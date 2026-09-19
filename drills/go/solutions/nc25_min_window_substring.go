package main

func minWindow(s string, t string) string {
	if len(t) == 0 || len(t) > len(s) {
		return ""
	}
	need := map[byte]int{}
	for i := 0; i < len(t); i++ {
		need[t[i]]++
	}
	missing := len(t)
	bestStart, bestLength := 0, len(s)+1
	start := 0
	for end := 0; end < len(s); end++ {
		if need[s[end]] > 0 {
			missing--
		}
		need[s[end]]--
		// Once every character is covered, shrink from the left as far as
		// the coverage allows, recording the window each time.
		for missing == 0 {
			if end-start+1 < bestLength {
				bestStart, bestLength = start, end-start+1
			}
			need[s[start]]++
			if need[s[start]] > 0 {
				missing++
			}
			start++
		}
	}
	if bestLength > len(s) {
		return ""
	}
	return s[bestStart : bestStart+bestLength]
}
