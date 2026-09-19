package main

func maxDepth(root *TreeNode) int {
	if root == nil {
		return 0
	}
	// Breadth-first: count the levels as the queue drains one at a time.
	depth := 0
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		depth++
		next := []*TreeNode{}
		for _, node := range queue {
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		queue = next
	}
	return depth
}
