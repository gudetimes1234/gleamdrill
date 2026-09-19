package main

import "strings"

func partitionLabels(s string) []int {
	sizes := []int{}
	start := 0
	for start < len(s) {
		// Grow the part's end until every letter inside it last appears
		// inside it too, rescanning as the end moves.
		end := strings.LastIndexByte(s, s[start])
		for i := start; i <= end; i++ {
			end = max(end, strings.LastIndexByte(s, s[i]))
		}
		sizes = append(sizes, end-start+1)
		start = end + 1
	}
	return sizes
}
