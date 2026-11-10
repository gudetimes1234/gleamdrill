package main

import (
	"fmt"
	"strconv"
)

func readTimeout(raw string) (int, error) {
	n, err := strconv.Atoi(raw)
	if err != nil {
		return 0, fmt.Errorf("read timeout: %w", err)
	}
	return n, nil
}
