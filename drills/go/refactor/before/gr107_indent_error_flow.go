package main

import (
	"errors"
	"strconv"
)

func parsePort(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err == nil {
		if n > 0 && n < 65536 {
			return n, nil
		} else {
			return 0, errors.New("port out of range")
		}
	} else {
		return 0, err
	}
}
