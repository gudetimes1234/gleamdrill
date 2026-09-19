package main

func levelOrder(root *TreeNode) [][]int {
	// Depth-first, appending each node to the row for its depth; visiting
	// left before right keeps every row in left-to-right order.
	result := [][]int{}
	var visit func(node *TreeNode, depth int)
	visit = func(node *TreeNode, depth int) {
		if node == nil {
			return
		}
		if depth == len(result) {
			result = append(result, []int{})
		}
		result[depth] = append(result[depth], node.Val)
		visit(node.Left, depth+1)
		visit(node.Right, depth+1)
	}
	visit(root, 0)
	return result
}
