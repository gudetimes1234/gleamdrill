package main

func numDistinct(s string, t string) int {
	memo := map[[2]int]int{}
	var from func(i, j int) int
	from = func(i, j int) int {
		if j == len(t) {
			return 1
		}
		if i == len(s) {
			return 0
		}
		key := [2]int{i, j}
		if v, ok := memo[key]; ok {
			return v
		}
		ways := from(i+1, j)
		if s[i] == t[j] {
			ways += from(i+1, j+1)
		}
		memo[key] = ways
		return ways
	}
	return from(0, 0)
}
