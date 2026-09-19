package main

func rightSideView(root *TreeNode) []int {
	// Depth-first, right child first: the first node reached at each
	// depth is the rightmost one.
	result := []int{}
	var visit func(node *TreeNode, depth int)
	visit = func(node *TreeNode, depth int) {
		if node == nil {
			return
		}
		if depth == len(result) {
			result = append(result, node.Val)
		}
		visit(node.Right, depth+1)
		visit(node.Left, depth+1)
	}
	visit(root, 0)
	return result
}
