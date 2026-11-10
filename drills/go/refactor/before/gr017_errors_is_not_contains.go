package main

import (
	"errors"
	"strings"
)

var ErrTimeout = errors.New("timeout")

func shouldRetry(err error) bool {
	if err == nil {
		return false
	}
	return strings.Contains(err.Error(), "timeout")
}
