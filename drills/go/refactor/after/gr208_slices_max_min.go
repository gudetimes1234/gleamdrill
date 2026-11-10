package main

import "slices"

func spread(readings []int) int {
	if len(readings) == 0 {
		return 0
	}
	return slices.Max(readings) - slices.Min(readings)
}
