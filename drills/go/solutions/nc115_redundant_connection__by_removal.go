package main

func findRedundantConnection(edges [][]int) []int {
	// Try removing each edge from the last to the first; the first removal
	// that leaves the graph a tree (connected, n-1 edges) is the answer.
	n := len(edges)
	for skip := n - 1; skip >= 0; skip-- {
		adjacent := make([][]int, n+1)
		for i, edge := range edges {
			if i == skip {
				continue
			}
			adjacent[edge[0]] = append(adjacent[edge[0]], edge[1])
			adjacent[edge[1]] = append(adjacent[edge[1]], edge[0])
		}
		seen := make([]bool, n+1)
		stack := []int{1}
		seen[1] = true
		reached := 0
		for len(stack) > 0 {
			node := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			reached++
			for _, next := range adjacent[node] {
				if !seen[next] {
					seen[next] = true
					stack = append(stack, next)
				}
			}
		}
		if reached == n {
			return edges[skip]
		}
	}
	return []int{}
}
