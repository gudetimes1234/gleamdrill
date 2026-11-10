package main

import (
	"fmt"
	"strconv"
)

func parsePort(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err == nil {
		if n >= 1 && n <= 65535 {
			return n, nil
		} else {
			return 0, fmt.Errorf("port %d out of range", n)
		}
	} else {
		return 0, fmt.Errorf("port %q is not a number", s)
	}
}
