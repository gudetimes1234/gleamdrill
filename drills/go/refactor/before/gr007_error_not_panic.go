package main

import (
	"fmt"
	"strconv"
)

func parseAge(s string) (age int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("%v", r)
		}
	}()
	n, convErr := strconv.Atoi(s)
	if convErr != nil {
		panic(fmt.Sprintf("age %q is not a number", s))
	}
	if n < 0 || n > 150 {
		panic(fmt.Sprintf("age %d out of range", n))
	}
	return n, nil
}
