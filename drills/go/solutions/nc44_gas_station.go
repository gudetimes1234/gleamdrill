package main

func canCompleteCircuit(gas []int, cost []int) int {
	total, tank, start := 0, 0, 0
	for i := range gas {
		total += gas[i] - cost[i]
		tank += gas[i] - cost[i]
		// Running dry here means no start between the last reset and here
		// can work either: they would all arrive with even less.
		if tank < 0 {
			start = i + 1
			tank = 0
		}
	}
	if total < 0 {
		return -1
	}
	return start
}
