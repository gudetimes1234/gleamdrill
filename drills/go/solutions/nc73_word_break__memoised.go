package main

import "strings"

func wordBreak(s string, wordDict []string) bool {
	memo := map[int]bool{}
	var from func(i int) bool
	from = func(i int) bool {
		if i == len(s) {
			return true
		}
		if v, ok := memo[i]; ok {
			return v
		}
		for _, w := range wordDict {
			if strings.HasPrefix(s[i:], w) && from(i+len(w)) {
				memo[i] = true
				return true
			}
		}
		memo[i] = false
		return false
	}
	return from(0)
}
