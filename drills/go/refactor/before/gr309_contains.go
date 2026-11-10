package main

import "strings"

func countMentions(messages []string, name string) int {
	count := 0
	for _, m := range messages {
		if strings.Index(m, "@"+name) != -1 {
			count++
		}
	}
	return count
}
