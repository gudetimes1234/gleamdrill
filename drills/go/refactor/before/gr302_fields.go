package main

import "strings"

func countWords(s string) int {
	n := 0
	for _, w := range strings.Split(s, " ") {
		if w != "" {
			n++
		}
	}
	return n
}
