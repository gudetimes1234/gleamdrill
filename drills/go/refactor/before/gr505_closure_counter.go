package main

import "fmt"

var count int

func next() int {
	count++
	return count
}

func numbered(names []string) []string {
	count = 0
	out := []string{}
	for _, name := range names {
		out = append(out, fmt.Sprintf("%d. %s", next(), name))
	}
	return out
}
