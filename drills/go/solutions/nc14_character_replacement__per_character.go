package main

func characterReplacement(s string, k int) int {
	best := 0
	// For each letter, the longest window where everything else is replaced.
	for letter := byte('A'); letter <= 'Z'; letter++ {
		start, others := 0, 0
		for end := 0; end < len(s); end++ {
			if s[end] != letter {
				others++
			}
			for others > k {
				if s[start] != letter {
					others--
				}
				start++
			}
			if end-start+1 > best {
				best = end - start + 1
			}
		}
	}
	return best
}
