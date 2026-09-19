package main

import "math"

func isValidBST(root *TreeNode) bool {
	// Every node must lie strictly inside the bounds its ancestors set:
	// going left tightens the upper bound, going right the lower.
	var valid func(node *TreeNode, low, high int) bool
	valid = func(node *TreeNode, low, high int) bool {
		if node == nil {
			return true
		}
		if node.Val <= low || node.Val >= high {
			return false
		}
		return valid(node.Left, low, node.Val) && valid(node.Right, node.Val, high)
	}
	return valid(root, math.MinInt, math.MaxInt)
}
