package main

import "strings"

func parseKV(s string) (key, value string, ok bool) {
	i := strings.Index(s, "=")
	if i < 0 {
		return "", "", false
	}
	return s[:i], s[i+1:], true
}
