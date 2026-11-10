package main

import (
	"fmt"
	"log"
	"strconv"
)

func parseQty(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		log.Printf("bad quantity %q: %v", s, err)
		return 0, fmt.Errorf("bad quantity %q: %w", s, err)
	}
	if n <= 0 {
		log.Printf("quantity %d must be positive", n)
		return 0, fmt.Errorf("quantity %d must be positive", n)
	}
	return n, nil
}
