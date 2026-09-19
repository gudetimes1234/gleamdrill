package main

func diameterOfBinaryTree(root *TreeNode) int {
	best := 0
	// Each node's height is computed once; the longest path through a
	// node is its two children's heights added, tracked as a side effect.
	var height func(node *TreeNode) int
	height = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		left, right := height(node.Left), height(node.Right)
		best = max(best, left+right)
		return 1 + max(left, right)
	}
	height(root)
	return best
}
