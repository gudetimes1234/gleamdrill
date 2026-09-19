package main

func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
	// At every node of the big tree, ask whether the small tree starts here.
	if subRoot == nil {
		return true
	}
	if root == nil {
		return false
	}
	return isSame(root, subRoot) || isSubtree(root.Left, subRoot) || isSubtree(root.Right, subRoot)
}

func isSame(p, q *TreeNode) bool {
	if p == nil || q == nil {
		return p == q
	}
	return p.Val == q.Val && isSame(p.Left, q.Left) && isSame(p.Right, q.Right)
}
