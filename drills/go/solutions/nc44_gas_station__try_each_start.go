package main

func canCompleteCircuit(gas []int, cost []int) int {
	n := len(gas)
	for start := 0; start < n; start++ {
		tank := 0
		completed := true
		for step := 0; step < n; step++ {
			i := (start + step) % n
			tank += gas[i] - cost[i]
			if tank < 0 {
				completed = false
				break
			}
		}
		if completed {
			return start
		}
	}
	return -1
}
