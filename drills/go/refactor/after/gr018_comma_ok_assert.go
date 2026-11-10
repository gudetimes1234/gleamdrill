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
	port, ok := v.(int)
	if !ok {
		return 0, fmt.Errorf("port is a %T, not an int", v)
	}
	return port, nil
}
