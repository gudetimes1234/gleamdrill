package main

import "fmt"

func splitSeconds(total int) (int, int) {
	return total / 60, total % 60
}

func clock(total int) string {
	m, s := splitSeconds(total)
	return fmt.Sprintf("%d:%02d", m, s)
}
