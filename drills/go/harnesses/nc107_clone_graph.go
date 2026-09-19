package main

// A clone must have the original's shape and share none of its nodes.
func cloned(adj [][]int) [][]int {
	original := graph(adj)
	copy := cloneGraph(original)
	if original != nil && (copy == original || copy.Neighbors != nil && len(copy.Neighbors) > 0 && copy.Neighbors[0] == original.Neighbors[0]) {
		return [][]int{{-1}}
	}
	return adjacency(copy)
}

func main() {
	run(func() []testCase {
		return []testCase{
			tc("cloneGraph(the 4-cycle)", [][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}}, cloned([][]int{{2, 4}, {1, 3}, {2, 4}, {1, 3}})),
			tc("cloneGraph(two nodes)", [][]int{{2}, {1}}, cloned([][]int{{2}, {1}})),
			tc("cloneGraph(one node)", [][]int{{}}, cloned([][]int{{}})),
			tc("cloneGraph(nil)", [][]int{}, cloned([][]int{})),
		}
	})
}
