package main

func diameterOfBinaryTree(root *TreeNode) int {
	// For each node, measure both subtree heights from scratch and keep
	// the best: O(n^2) on a skewed tree, but a direct reading of the
	// definition.
	if root == nil {
		return 0
	}
	through := height(root.Left) + height(root.Right)
	return max(through, max(diameterOfBinaryTree(root.Left), diameterOfBinaryTree(root.Right)))
}

func height(node *TreeNode) int {
	if node == nil {
		return 0
	}
	return 1 + max(height(node.Left), height(node.Right))
}
