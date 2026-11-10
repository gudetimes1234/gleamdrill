package main

import "fmt"

func counter() func() int {
	n := 0
	return func() int {
		n++
		return n
	}
}

func numbered(names []string) []string {
	next := counter()
	out := []string{}
	for _, name := range names {
		out = append(out, fmt.Sprintf("%d. %s", next(), name))
	}
	return out
}
