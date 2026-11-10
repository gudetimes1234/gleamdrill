package main

import "strconv"

func countdown(n int) string {
	out := ""
	for i := n; i > 0; i-- {
		out += strconv.Itoa(i) + "..."
	}
	return out + "liftoff"
}
