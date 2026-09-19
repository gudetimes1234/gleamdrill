package main

func numDecodings(s string) int {
	memo := map[int]int{}
	var from func(i int) int
	from = func(i int) int {
		if i == len(s) {
			return 1
		}
		if s[i] == '0' {
			return 0
		}
		if v, ok := memo[i]; ok {
			return v
		}
		ways := from(i + 1)
		if i+1 < len(s) && (s[i] == '1' || s[i] == '2' && s[i+1] <= '6') {
			ways += from(i + 2)
		}
		memo[i] = ways
		return ways
	}
	return from(0)
}
