package main

import "fmt"

func stockOf(inv map[string]int, item string) (int, error) {
	for name, qty := range inv {
		if name == item {
			return qty, nil
		}
	}
	return 0, fmt.Errorf("unknown item %q", item)
}
