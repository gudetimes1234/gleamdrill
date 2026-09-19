package main

func minWindow(s string, t string) string {
	need := map[byte]int{}
	for i := 0; i < len(t); i++ {
		need[t[i]]++
	}
	// Only positions holding a character of t can move a window's edges,
	// so slide over that filtered list rather than every index of s.
	positions := []int{}
	for i := 0; i < len(s); i++ {
		if need[s[i]] > 0 {
			positions = append(positions, i)
		}
	}
	have := map[byte]int{}
	covered, required := 0, len(need)
	bestStart, bestLength := 0, len(s)+1
	left := 0
	for right, pos := range positions {
		c := s[pos]
		have[c]++
		if have[c] == need[c] {
			covered++
		}
		for covered == required {
			startPos := positions[left]
			if pos-startPos+1 < bestLength {
				bestStart, bestLength = startPos, pos-startPos+1
			}
			out := s[startPos]
			if have[out] == need[out] {
				covered--
			}
			have[out]--
			left++
		}
		_ = right
	}
	if bestLength > len(s) {
		return ""
	}
	return s[bestStart : bestStart+bestLength]
}
