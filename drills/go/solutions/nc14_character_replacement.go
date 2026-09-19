package main

func characterReplacement(s string, k int) int {
	counts := [26]int{}
	start, mostFrequent, best := 0, 0, 0
	for end := 0; end < len(s); end++ {
		counts[s[end]-'A']++
		if counts[s[end]-'A'] > mostFrequent {
			mostFrequent = counts[s[end]-'A']
		}
		// The window is valid while its non-majority characters fit in k.
		// mostFrequent is never lowered: a stale high can only keep the
		// window at a length already achieved, never over-count.
		if end-start+1-mostFrequent > k {
			counts[s[start]-'A']--
			start++
		}
		if end-start+1 > best {
			best = end - start + 1
		}
	}
	return best
}
