package main

func invertTree(root *TreeNode) *TreeNode {
	// Build a fresh mirrored tree instead of swapping in place: the
	// original is left untouched.
	if root == nil {
		return nil
	}
	return &TreeNode{Val: root.Val, Left: invertTree(root.Right), Right: invertTree(root.Left)}
}
