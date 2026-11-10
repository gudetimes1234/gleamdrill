package main

import "fmt"

func splitSeconds(total int, mins, secs *int) {
	*mins = total / 60
	*secs = total % 60
}

func clock(total int) string {
	var m, s int
	splitSeconds(total, &m, &s)
	return fmt.Sprintf("%d:%02d", m, s)
}
