package main

import (
	"errors"
	"strconv"
)

func readTimeout(raw string) (int, error) {
	n, err := strconv.Atoi(raw)
	if err != nil {
		return 0, errors.New("read timeout: " + err.Error())
	}
	return n, nil
}
