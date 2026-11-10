package main

import "strings"

func hasBlank(lines []string) bool {
	for _, line := range lines {
		if strings.TrimSpace(line) == "" {
			return true
		}
	}
	return false
}
