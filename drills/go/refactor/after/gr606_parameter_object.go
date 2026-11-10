package main

import "fmt"

type Range struct {
	Low, High int
}

func (r Range) Contains(v int) bool {
	return v >= r.Low && v <= r.High
}

func countInRange(readings []int, r Range) int {
	n := 0
	for _, v := range readings {
		if r.Contains(v) {
			n++
		}
	}
	return n
}

func sumInRange(readings []int, r Range) int {
	sum := 0
	for _, v := range readings {
		if r.Contains(v) {
			sum += v
		}
	}
	return sum
}

func normalSummary(readings []int) string {
	normal := Range{Low: 60, High: 100}
	return fmt.Sprintf("%d normal, total %d", countInRange(readings, normal), sumInRange(readings, normal))
}
