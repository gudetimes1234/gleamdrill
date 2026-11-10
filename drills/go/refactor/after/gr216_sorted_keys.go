package main

import (
	"fmt"
	"slices"
)

func inventory(stock map[string]int) []string {
	keys := make([]string, 0, len(stock))
	for k := range stock {
		keys = append(keys, k)
	}
	slices.Sort(keys)
	var lines []string
	for _, k := range keys {
		lines = append(lines, fmt.Sprintf("%s: %d", k, stock[k]))
	}
	return lines
}
