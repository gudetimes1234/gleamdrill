package main

import (
	"fmt"
	"strconv"
)

func nextTicket(id string) (string, error) {
	n, err := strconv.Atoi(id)
	if err != nil {
		return "", fmt.Errorf("bad ticket id %q", id)
	}
	return strconv.Itoa(n + 1), nil
}
