package main

func isValidBST(root *TreeNode) bool {
	// An in-order walk of a BST is strictly increasing; check each value
	// against the previous one as the walk goes.
	var previous *int
	var walk func(node *TreeNode) bool
	walk = func(node *TreeNode) bool {
		if node == nil {
			return true
		}
		if !walk(node.Left) {
			return false
		}
		if previous != nil && node.Val <= *previous {
			return false
		}
		previous = &node.Val
		return walk(node.Right)
	}
	return walk(root)
}
