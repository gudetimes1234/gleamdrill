package main

func findRedundantConnection(edges [][]int) []int {
	// Union-find over the edges in order: the first edge whose endpoints
	// are already connected closes the cycle, and it is the last such edge
	// in the input among those on the cycle.
	parent := make([]int, len(edges)+1)
	for i := range parent {
		parent[i] = i
	}
	var find func(i int) int
	find = func(i int) int {
		for parent[i] != i {
			parent[i] = parent[parent[i]]
			i = parent[i]
		}
		return i
	}
	for _, edge := range edges {
		a, b := find(edge[0]), find(edge[1])
		if a == b {
			return edge
		}
		parent[a] = b
	}
	return []int{}
}
