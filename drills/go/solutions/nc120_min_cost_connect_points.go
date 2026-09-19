package main

func minCostConnectPoints(points [][]int) int {
	n := len(points)
	if n < 2 {
		return 0
	}
	// Prim's algorithm on the complete graph: keep the cheapest known
	// distance from the tree to each point, add the nearest point, update.
	// O(n^2), no heap, which suits a dense graph.
	inTree := make([]bool, n)
	distance := make([]int, n)
	for i := range distance {
		distance[i] = 1 << 30
	}
	distance[0] = 0
	total := 0
	for added := 0; added < n; added++ {
		nearest := -1
		for i := 0; i < n; i++ {
			if !inTree[i] && (nearest < 0 || distance[i] < distance[nearest]) {
				nearest = i
			}
		}
		inTree[nearest] = true
		total += distance[nearest]
		for i := 0; i < n; i++ {
			if !inTree[i] {
				distance[i] = min(distance[i], manhattan(points[nearest], points[i]))
			}
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
