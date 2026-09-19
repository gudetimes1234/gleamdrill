package main

func isBalanced(root *TreeNode) bool {
	// Check each node by measuring both subtrees from scratch.
	if root == nil {
		return true
	}
	difference := height(root.Left) - height(root.Right)
	if difference > 1 || difference < -1 {
		return false
	}
	return isBalanced(root.Left) && isBalanced(root.Right)
}

func height(node *TreeNode) int {
	if node == nil {
		return 0
	}
	return 1 + max(height(node.Left), height(node.Right))
}
