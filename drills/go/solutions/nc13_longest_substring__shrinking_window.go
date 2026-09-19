package main

func lengthOfLongestSubstring(s string) int {
	inWindow := map[byte]bool{}
	start, best := 0, 0
	for end := 0; end < len(s); end++ {
		// Shrink one character at a time until the newcomer is unique.
		for inWindow[s[end]] {
			delete(inWindow, s[start])
			start++
		}
		inWindow[s[end]] = true
		if end-start+1 > best {
			best = end - start + 1
		}
	}
	return best
}
