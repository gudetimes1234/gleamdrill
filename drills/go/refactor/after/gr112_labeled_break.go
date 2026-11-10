package main

import "strconv"

func sumUntilStop(tokens []string) int {
	total := 0
loop:
	for _, t := range tokens {
		switch t {
		case "stop":
			break loop
		case "skip":
		default:
			n, _ := strconv.Atoi(t)
			total += n
		}
	}
	return total
}
