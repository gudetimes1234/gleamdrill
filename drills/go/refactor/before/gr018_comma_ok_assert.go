package main

import (
	"errors"
	"fmt"
)

func portFrom(cfg map[string]any) (int, error) {
	v := cfg["port"]
	if v == nil {
		return 0, errors.New("port is missing")
	}
	if fmt.Sprintf("%T", v) != "int" {
		return 0, fmt.Errorf("port is a %T, not an int", v)
	}
	return v.(int), nil
}
