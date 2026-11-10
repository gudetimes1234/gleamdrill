package main

import (
	"errors"
	"fmt"
)

type ShortError struct {
	Missing int
}

func (e *ShortError) Error() string {
	return fmt.Sprintf("short by %d", e.Missing)
}

func charge(balance, amount int) error {
	if amount > balance {
		return &ShortError{Missing: amount - balance}
	}
	return nil
}

func shortfall(err error) int {
	var se *ShortError
	if errors.As(err, &se) {
		return se.Missing
	}
	return 0
}
