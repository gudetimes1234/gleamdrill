package main

import (
	"fmt"
	"strconv"
)

func parseAge(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("age %q is not a number", s)
	}
	if n < 0 || n > 150 {
		return 0, fmt.Errorf("age %d out of range", n)
	}
	return n, nil
}
