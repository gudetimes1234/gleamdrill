package main

func coinChange(coins []int, amount int) int {
	// fewest[a] is the fewest coins making a; a sentinel above any real
	// answer stands for "not yet reachable".
	unreachable := amount + 1
	fewest := make([]int, amount+1)
	for a := 1; a <= amount; a++ {
		fewest[a] = unreachable
		for _, coin := range coins {
			if coin <= a {
				fewest[a] = min(fewest[a], fewest[a-coin]+1)
			}
		}
	}
	if fewest[amount] == unreachable {
		return -1
	}
	return fewest[amount]
}
