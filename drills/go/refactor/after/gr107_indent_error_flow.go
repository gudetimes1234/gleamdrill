package main

import (
	"errors"
	"strconv"
)

func parsePort(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	if n <= 0 || n >= 65536 {
		return 0, errors.New("port out of range")
	}
	return n, nil
}
