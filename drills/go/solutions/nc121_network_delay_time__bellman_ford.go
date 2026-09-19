package main

func networkDelayTime(times [][]int, n int, k int) int {
	// Bellman-Ford: relax every edge n-1 times. No heap and no adjacency
	// list, at O(n * edges).
	const unreached = 1 << 30
	best := make([]int, n+1)
	for i := range best {
		best[i] = unreached
	}
	best[k] = 0
	for round := 1; round < n; round++ {
		changed := false
		for _, t := range times {
			from, to, cost := t[0], t[1], t[2]
			if best[from] != unreached && best[from]+cost < best[to] {
				best[to] = best[from] + cost
				changed = true
			}
		}
		if !changed {
			break
		}
	}
	answer := 0
	for node := 1; node <= n; node++ {
		if best[node] == unreached {
			return -1
		}
		answer = max(answer, best[node])
	}
	return answer
}
