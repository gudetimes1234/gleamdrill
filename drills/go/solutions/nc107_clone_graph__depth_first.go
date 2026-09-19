package main

func cloneGraph(node *Node) *Node {
	if node == nil {
		return nil
	}
	// Breadth-first: clone nodes as they are discovered, then wire each
	// clone's neighbours from the map once every node has a clone.
	clones := map[*Node]*Node{node: {Val: node.Val}}
	queue := []*Node{node}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		for _, neighbour := range current.Neighbors {
			if _, seen := clones[neighbour]; !seen {
				clones[neighbour] = &Node{Val: neighbour.Val}
				queue = append(queue, neighbour)
			}
			clones[current].Neighbors = append(clones[current].Neighbors, clones[neighbour])
		}
	}
	return clones[node]
}
