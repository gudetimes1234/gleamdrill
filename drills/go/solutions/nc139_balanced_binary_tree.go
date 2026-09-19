package main

func isBalanced(root *TreeNode) bool {
	// One pass: a subtree reports its height, or -1 the moment any
	// subtree inside it is unbalanced, and -1 propagates straight up.
	var check func(node *TreeNode) int
	check = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		left := check(node.Left)
		if left < 0 {
			return -1
		}
		right := check(node.Right)
		if right < 0 || left-right > 1 || right-left > 1 {
			return -1
		}
		return 1 + max(left, right)
	}
	return check(root) >= 0
}
