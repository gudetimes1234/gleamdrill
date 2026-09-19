package main

func minDistance(word1 string, word2 string) int {
	memo := map[[2]int]int{}
	var from func(i, j int) int
	from = func(i, j int) int {
		if i == len(word1) {
			return len(word2) - j
		}
		if j == len(word2) {
			return len(word1) - i
		}
		key := [2]int{i, j}
		if v, ok := memo[key]; ok {
			return v
		}
		if word1[i] == word2[j] {
			memo[key] = from(i+1, j+1)
		} else {
			memo[key] = 1 + min(from(i+1, j+1), min(from(i+1, j), from(i, j+1)))
		}
		return memo[key]
	}
	return from(0, 0)
}
