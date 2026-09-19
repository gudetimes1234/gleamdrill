package main

import "sort"

func minCostConnectPoints(points [][]int) int {
	n := len(points)
	// Kruskal's algorithm: every pair is an edge; sort them and take each
	// one that joins two different components, until n-1 are taken.
	type edge struct{ cost, a, b int }
	edges := []edge{}
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			edges = append(edges, edge{manhattan(points[i], points[j]), i, j})
		}
	}
	sort.Slice(edges, func(i, j int) bool { return edges[i].cost < edges[j].cost })
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
	total, taken := 0, 0
	for _, e := range edges {
		if taken == n-1 {
			break
		}
		a, b := find(e.a), find(e.b)
		if a != b {
			parent[a] = b
			total += e.cost
			taken++
		}
	}
	return total
}

func manhattan(a, b []int) int {
	dx, dy := a[0]-b[0], a[1]-b[1]
	if dx < 0 {
		dx = -dx
	}
	if dy < 0 {
		dy = -dy
	}
	return dx + dy
}
