package main

func countComponents(n int, edges [][]int) int {
	// Union-find: start with n components and lose one per union that
	// joins two different sets.
	parent := make([]int, n)
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
	components := n
	for _, edge := range edges {
		a, b := find(edge[0]), find(edge[1])
		if a != b {
			parent[a] = b
			components--
		}
	}
	return components
}
