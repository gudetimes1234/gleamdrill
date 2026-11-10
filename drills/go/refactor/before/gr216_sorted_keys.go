package main

import (
	"fmt"
	"sort"
)

func inventory(stock map[string]int) []string {
	keys := []string{}
	for k := range stock {
		keys = append(keys, k)
	}
	sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })
	var lines []string
	for _, k := range keys {
		lines = append(lines, fmt.Sprintf("%s: %d", k, stock[k]))
	}
	return lines
}
