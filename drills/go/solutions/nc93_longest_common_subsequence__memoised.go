package main

func longestCommonSubsequence(text1 string, text2 string) int {
	memo := map[[2]int]int{}
	var from func(i, j int) int
	from = func(i, j int) int {
		if i == len(text1) || j == len(text2) {
			return 0
		}
		key := [2]int{i, j}
		if v, ok := memo[key]; ok {
			return v
		}
		if text1[i] == text2[j] {
			memo[key] = 1 + from(i+1, j+1)
		} else {
			memo[key] = max(from(i+1, j), from(i, j+1))
		}
		return memo[key]
	}
	return from(0, 0)
}
