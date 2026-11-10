package main

import "strings"

func countMentions(messages []string, name string) int {
	count := 0
	for _, m := range messages {
		if strings.Contains(m, "@"+name) {
			count++
		}
	}
	return count
}
