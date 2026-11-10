package main

import (
	"fmt"
	"strconv"
)

func parseQty(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("bad quantity %q: %w", s, err)
	}
	if n <= 0 {
		return 0, fmt.Errorf("quantity %d must be positive", n)
	}
	return n, nil
}
