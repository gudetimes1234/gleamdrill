package main

import "sort"

func carFleet(target int, position []int, speed []int) int {
	// Sort by position, then walk from the back of the road: a car catches
	// the car ahead (and any fleet it leads) only if its own arrival time
	// is no later than that fleet's.
	cars := make([][2]int, len(position))
	for i := range position {
		cars[i] = [2]int{position[i], speed[i]}
	}
	sort.Slice(cars, func(i, j int) bool { return cars[i][0] < cars[j][0] })
	stack := []float64{}
	for _, car := range cars {
		arrival := float64(target-car[0]) / float64(car[1])
		// Any fleet ahead that this car reaches in time is absorbed.
		for len(stack) > 0 && stack[len(stack)-1] <= arrival {
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, arrival)
	}
	return len(stack)
}
