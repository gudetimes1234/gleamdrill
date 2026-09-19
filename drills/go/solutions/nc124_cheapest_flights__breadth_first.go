package main

func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
	next := make([][][2]int, n)
	for _, f := range flights {
		next[f[0]] = append(next[f[0]], [2]int{f[1], f[2]})
	}
	// Breadth-first by number of flights, k+1 levels deep, keeping the
	// cheapest cost seen at each node to prune worse arrivals.
	const unreached = 1 << 30
	best := make([]int, n)
	for i := range best {
		best[i] = unreached
	}
	best[src] = 0
	frontier := [][2]int{{src, 0}}
	for level := 0; level <= k && len(frontier) > 0; level++ {
		following := [][2]int{}
		for _, state := range frontier {
			node, cost := state[0], state[1]
			for _, edge := range next[node] {
				to, price := edge[0], edge[1]
				if cost+price < best[to] {
					best[to] = cost + price
					following = append(following, [2]int{to, cost + price})
				}
			}
		}
		frontier = following
	}
	if best[dst] == unreached {
		return -1
	}
	return best[dst]
}
