package main

func wordBreak(s string, wordDict []string) bool {
	words := map[string]bool{}
	for _, w := range wordDict {
		words[w] = true
	}
	// breakable[i]: can s[:i] be segmented? True when some word ends at i
	// and the prefix before it was breakable.
	breakable := make([]bool, len(s)+1)
	breakable[0] = true
	for end := 1; end <= len(s); end++ {
		for start := 0; start < end; start++ {
			if breakable[start] && words[s[start:end]] {
				breakable[end] = true
				break
			}
		}
	}
	return breakable[len(s)]
}
