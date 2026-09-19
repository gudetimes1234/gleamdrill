package main

// Nodes as [val, random index or -1]; the copy must match and must share
// no node with the original.
func copied(spec [][2]int) [][2]int {
	nodes := make([]*RandomNode, len(spec))
	for i, entry := range spec {
		nodes[i] = &RandomNode{Val: entry[0]}
	}
	for i, entry := range spec {
		if i+1 < len(nodes) {
			nodes[i].Next = nodes[i+1]
		}
		if entry[1] >= 0 {
			nodes[i].Random = nodes[entry[1]]
		}
	}
	var head *RandomNode
	if len(nodes) > 0 {
		head = nodes[0]
	}
	clone := copyRandomList(head)
	index := map[*RandomNode]int{}
	order := []*RandomNode{}
	for node := clone; node != nil; node = node.Next {
		index[node] = len(order)
		order = append(order, node)
	}
	out := [][2]int{}
	for _, node := range order {
		for _, original := range nodes {
			if node == original {
				return [][2]int{{-99, -99}}
			}
		}
		random := -1
		if node.Random != nil {
			random = index[node.Random]
		}
		out = append(out, [2]int{node.Val, random})
	}
	return out
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("copyRandomList([[7,-1],[13,0]])", [][2]int{{7, -1}, {13, 0}}, copied([][2]int{{7, -1}, {13, 0}})),
			tc("copyRandomList([[1,0]]) -- a node pointing at itself", [][2]int{{1, 0}}, copied([][2]int{{1, 0}})),
			tc("copyRandomList(a forward link to a node not yet copied)", [][2]int{{1, 2}, {2, -1}, {3, 0}}, copied([][2]int{{1, 2}, {2, -1}, {3, 0}})),
			tc("copyRandomList([])", [][2]int{}, copied([][2]int{})),
		}
	})
}
