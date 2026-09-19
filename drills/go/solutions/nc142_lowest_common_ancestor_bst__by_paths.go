package main

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	// Record the root-to-node path for each; the last node the two paths
	// share is the answer. Works on any binary tree, not only a BST.
	pathP, pathQ := pathTo(root, p.Val), pathTo(root, q.Val)
	var common *TreeNode
	for i := 0; i < len(pathP) && i < len(pathQ) && pathP[i] == pathQ[i]; i++ {
		common = pathP[i]
	}
	return common
}

func pathTo(root *TreeNode, val int) []*TreeNode {
	path := []*TreeNode{}
	for node := root; node != nil; {
		path = append(path, node)
		switch {
		case val < node.Val:
			node = node.Left
		case val > node.Val:
			node = node.Right
		default:
			return path
		}
	}
	return path
}
