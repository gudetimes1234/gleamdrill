package main

func cloneGraph(node *Node) *Node {
	if node == nil {
		return nil
	}
	// One clone per original, made the first time the original is seen;
	// the map is also the visited set, so cycles terminate.
	clones := map[*Node]*Node{}
	var clone func(n *Node) *Node
	clone = func(n *Node) *Node {
		if c, ok := clones[n]; ok {
			return c
		}
		c := &Node{Val: n.Val}
		clones[n] = c
		for _, neighbour := range n.Neighbors {
			c.Neighbors = append(c.Neighbors, clone(neighbour))
		}
		return c
	}
	return clone(node)
}
