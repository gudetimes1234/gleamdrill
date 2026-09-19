package main

import "math"

func maxPathSum(root *TreeNode) int {
	best := math.MinInt
	// Each node reports the best downward path starting at it (never
	// negative: a bad branch is simply not taken). The best path through
	// it joins both branches, and is recorded as a side effect.
	var down func(node *TreeNode) int
	down = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		left := max(0, down(node.Left))
		right := max(0, down(node.Right))
		best = max(best, node.Val+left+right)
		return node.Val + max(left, right)
	}
	down(root)
	return best
}
