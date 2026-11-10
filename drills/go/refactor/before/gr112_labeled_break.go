package main

import "strconv"

func sumUntilStop(tokens []string) int {
	total := 0
	done := false
	for _, t := range tokens {
		switch t {
		case "stop":
			done = true
		case "skip":
		default:
			n, _ := strconv.Atoi(t)
			total += n
		}
		if done {
			break
		}
	}
	return total
}
