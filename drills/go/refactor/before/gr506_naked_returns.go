package main

import "strings"

func parseKV(s string) (key string, value string, ok bool) {
	i := strings.Index(s, "=")
	if i < 0 {
		return
	}
	key = s[:i]
	value = s[i+1:]
	ok = true
	return
}
