package main

func buildTree(preorder []int, inorder []int) *TreeNode {
	// The first pre-order value is the root; its position in the in-order
	// list splits both lists into the left and right subtrees.
	if len(preorder) == 0 {
		return nil
	}
	root := &TreeNode{Val: preorder[0]}
	split := 0
	for inorder[split] != preorder[0] {
		split++
	}
	root.Left = buildTree(preorder[1:split+1], inorder[:split])
	root.Right = buildTree(preorder[split+1:], inorder[split+1:])
	return root
}
