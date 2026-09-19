package main

func buildTree(preorder []int, inorder []int) *TreeNode {
	// Consume pre-order values in sequence; an in-order index map gives
	// each subtree its bounds, so no slices are copied.
	position := map[int]int{}
	for i, v := range inorder {
		position[v] = i
	}
	next := 0
	var build func(low, high int) *TreeNode
	build = func(low, high int) *TreeNode {
		if low > high {
			return nil
		}
		node := &TreeNode{Val: preorder[next]}
		next++
		split := position[node.Val]
		node.Left = build(low, split-1)
		node.Right = build(split+1, high)
		return node
	}
	return build(0, len(inorder)-1)
}
