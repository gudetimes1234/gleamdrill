package main

import "errors"

var ErrTimeout = errors.New("timeout")

func shouldRetry(err error) bool {
	return errors.Is(err, ErrTimeout)
}
