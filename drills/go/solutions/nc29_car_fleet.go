package main

import "sort"

func carFleet(target int, position []int, speed []int) int {
	order := make([]int, len(position))
	for i := range order {
		order[i] = i
	}
	// Closest to the target first. A car that would arrive sooner than the
	// fleet ahead is stuck behind it and joins; one that arrives later
	// starts a new fleet.
	sort.Slice(order, func(i, j int) bool { return position[order[i]] > position[order[j]] })
	fleets := 0
	slowest := 0.0
	for _, i := range order {
		arrival := float64(target-position[i]) / float64(speed[i])
		if arrival > slowest {
			fleets++
			slowest = arrival
		}
	}
	return fleets
}
