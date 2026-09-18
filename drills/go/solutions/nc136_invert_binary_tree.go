package main

func invertTree(root *TreeNode) *TreeNode {
	// Swap the children, then invert each of them. The swap and the recursion
	// are the same two lines, which is why this is the shortest tree problem
	// there is -- and why the order does not matter.
	if root == nil {
		return nil
	}
	root.Left, root.Right = invertTree(root.Right), invertTree(root.Left)
	return root
}
