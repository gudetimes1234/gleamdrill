package main

func kthSmallest(root *TreeNode, k int) int {
	// An iterative in-order walk with an explicit stack; stop at the kth
	// value rather than collecting them all.
	stack := []*TreeNode{}
	node := root
	for {
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		k--
		if k == 0 {
			return node.Val
		}
		node = node.Right
	}
}
