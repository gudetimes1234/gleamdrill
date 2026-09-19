package main

func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
	const unreached = 1 << 30
	// Bellman-Ford limited to k+1 rounds: after round i, best[v] is the
	// cheapest route using at most i flights. Relaxing from a copy of the
	// previous round keeps a round from chaining two flights.
	best := make([]int, n)
	for i := range best {
		best[i] = unreached
	}
	best[src] = 0
	for round := 0; round <= k; round++ {
		previous := append([]int{}, best...)
		for _, f := range flights {
			from, to, price := f[0], f[1], f[2]
			if previous[from] != unreached && previous[from]+price < best[to] {
				best[to] = previous[from] + price
			}
		}
	}
	if best[dst] == unreached {
		return -1
	}
	return best[dst]
}
