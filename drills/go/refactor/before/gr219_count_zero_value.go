package main

func wordCounts(words []string) map[string]int {
	counts := map[string]int{}
	for _, w := range words {
		if _, ok := counts[w]; ok {
			counts[w]++
		} else {
			counts[w] = 1
		}
	}
	return counts
}
