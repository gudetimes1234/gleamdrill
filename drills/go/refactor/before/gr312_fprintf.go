package main

import (
	"fmt"
	"strings"
)

func scoreTable(names []string, scores []int) string {
	var b strings.Builder
	for i, name := range names {
		b.WriteString(fmt.Sprintf("%-6s%4d\n", name, scores[i]))
	}
	return b.String()
}
