package main

import "fmt"

func countInRange(readings []int, low, high int) int {
	n := 0
	for _, v := range readings {
		if v >= low && v <= high {
			n++
		}
	}
	return n
}

func sumInRange(readings []int, low, high int) int {
	sum := 0
	for _, v := range readings {
		if v >= low && v <= high {
			sum += v
		}
	}
	return sum
}

func normalSummary(readings []int) string {
	return fmt.Sprintf("%d normal, total %d", countInRange(readings, 60, 100), sumInRange(readings, 60, 100))
}
