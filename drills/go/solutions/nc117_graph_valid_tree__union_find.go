package main

func validTree(n int, edges [][]int) bool {
	// Union-find: an edge inside one set is a cycle; after every edge,
	// one set means connected.
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
		if a == b {
			return false
		}
		parent[a] = b
		components--
	}
	return components <= 1
}
