package main

func coinChange(coins []int, amount int) int {
	// Amounts are nodes, coins are edges: the fewest coins is the shortest
	// path from 0 to amount, which breadth-first search finds level by level.
	if amount == 0 {
		return 0
	}
	seen := make([]bool, amount+1)
	seen[0] = true
	frontier := []int{0}
	for steps := 1; len(frontier) > 0; steps++ {
		next := []int{}
		for _, a := range frontier {
			for _, coin := range coins {
				b := a + coin
				if b == amount {
					return steps
				}
				if b < amount && !seen[b] {
					seen[b] = true
					next = append(next, b)
				}
			}
		}
		frontier = next
	}
	return -1
}
