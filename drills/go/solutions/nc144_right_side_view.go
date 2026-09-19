package main

func rightSideView(root *TreeNode) []int {
	result := []int{}
	if root == nil {
		return result
	}
	// Level by level; the last node of each level is the one seen.
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		result = append(result, queue[len(queue)-1].Val)
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
	return result
}
