package main

import "fmt"

func stockOf(inv map[string]int, item string) (int, error) {
	qty, ok := inv[item]
	if !ok {
		return 0, fmt.Errorf("unknown item %q", item)
	}
	return qty, nil
}
