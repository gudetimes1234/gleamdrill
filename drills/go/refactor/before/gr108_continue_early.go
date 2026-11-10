package main

import "strings"

func headlines(lines []string) []string {
	var out []string
	for _, line := range lines {
		if line != "" {
			if !strings.HasPrefix(line, "//") {
				out = append(out, strings.ToUpper(line))
			}
		}
	}
	return out
}
