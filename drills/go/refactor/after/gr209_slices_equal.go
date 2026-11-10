package main

import "slices"

func sameOrder(a, b []string) bool {
	return slices.Equal(a, b)
}
