package main

func validTree(n int, edges [][]int) bool {
	// A tree on n nodes has exactly n-1 edges and is connected. With the
	// edge count right, connectivity from node 0 is the only thing to check.
	if n == 0 {
		return true
	}
	if len(edges) != n-1 {
		return false
	}
	adjacent := make([][]int, n)
	for _, edge := range edges {
		adjacent[edge[0]] = append(adjacent[edge[0]], edge[1])
		adjacent[edge[1]] = append(adjacent[edge[1]], edge[0])
	}
	seen := make([]bool, n)
	stack := []int{0}
	seen[0] = true
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
	return reached == n
}
