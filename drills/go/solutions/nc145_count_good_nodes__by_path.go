package main

func goodNodes(root *TreeNode) int {
	// Keep the whole path in a stack and scan it at each node. Same
	// answer, more work, but the definition is written out literally.
	path := []int{}
	var count func(node *TreeNode) int
	count = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		good := 1
		for _, ancestor := range path {
			if ancestor > node.Val {
				good = 0
				break
			}
		}
		path = append(path, node.Val)
		total := good + count(node.Left) + count(node.Right)
		path = path[:len(path)-1]
		return total
	}
	return count(root)
}
