package main

import (
	"slices"
	"strings"
)

func hasBlank(lines []string) bool {
	return slices.ContainsFunc(lines, func(line string) bool {
		return strings.TrimSpace(line) == ""
	})
}
