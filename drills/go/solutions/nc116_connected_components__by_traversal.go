package main

func countComponents(n int, edges [][]int) int {
	adjacent := make([][]int, n)
	for _, edge := range edges {
		adjacent[edge[0]] = append(adjacent[edge[0]], edge[1])
		adjacent[edge[1]] = append(adjacent[edge[1]], edge[0])
	}
	// Each unvisited node starts a component; flood it so the rest of it
	// is not counted again.
	seen := make([]bool, n)
	components := 0
	for start := 0; start < n; start++ {
		if seen[start] {
			continue
		}
		components++
		stack := []int{start}
		seen[start] = true
		for len(stack) > 0 {
			node := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for _, next := range adjacent[node] {
				if !seen[next] {
					seen[next] = true
					stack = append(stack, next)
				}
			}
		}
	}
	return components
}
