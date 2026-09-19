package main

func canPartition(nums []int) bool {
	total := 0
	for _, n := range nums {
		total += n
	}
	if total%2 == 1 {
		return false
	}
	target := total / 2
	// reachable[s]: can some subset sum to s? Each number extends every
	// sum reached so far; walk downwards so a number is used once.
	reachable := make([]bool, target+1)
	reachable[0] = true
	for _, n := range nums {
		for s := target; s >= n; s-- {
			if reachable[s-n] {
				reachable[s] = true
			}
		}
	}
	return reachable[target]
}
