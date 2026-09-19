package main

func levelOrder(root *TreeNode) [][]int {
	result := [][]int{}
	if root == nil {
		return result
	}
	// The queue holds exactly one level at a time; drain it into a row
	// while collecting the next level.
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		row := []int{}
		next := []*TreeNode{}
		for _, node := range queue {
			row = append(row, node.Val)
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		result = append(result, row)
		queue = next
	}
	return result
}
