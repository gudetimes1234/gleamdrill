package main

func lengthOfLongestSubstring(s string) int {
	lastSeen := map[byte]int{}
	start, best := 0, 0
	for i := 0; i < len(s); i++ {
		// Jump the window start past the previous copy of this character;
		// never backwards, or a stale position would reopen the window.
		if last, ok := lastSeen[s[i]]; ok && last >= start {
			start = last + 1
		}
		lastSeen[s[i]] = i
		if i-start+1 > best {
			best = i - start + 1
		}
	}
	return best
}
