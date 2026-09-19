package main

import "math"

func maxPathSum(root *TreeNode) int {
	// For every node as the path's top, take its best downward branches
	// each side, recomputed from scratch: quadratic, but no shared state.
	if root == nil {
		return math.MinInt
	}
	through := root.Val + max(0, bestDown(root.Left)) + max(0, bestDown(root.Right))
	return max(through, max(maxPathSum(root.Left), maxPathSum(root.Right)))
}

func bestDown(node *TreeNode) int {
	if node == nil {
		return 0
	}
	return node.Val + max(0, max(bestDown(node.Left), bestDown(node.Right)))
}
