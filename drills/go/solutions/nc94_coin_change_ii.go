package main

func change(amount int, coins []int) int {
	// ways[a]: combinations making a. Taking the coins in the outer loop
	// means each combination is counted in one coin order only.
	ways := make([]int, amount+1)
	ways[0] = 1
	for _, coin := range coins {
		for a := coin; a <= amount; a++ {
			ways[a] += ways[a-coin]
		}
	}
	return ways[amount]
}
