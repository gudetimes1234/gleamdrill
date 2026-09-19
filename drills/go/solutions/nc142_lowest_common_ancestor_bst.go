package main

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	// In a BST the split point is the first node between the two values:
	// both smaller means go left, both larger means go right, else here.
	node := root
	for node != nil {
		switch {
		case p.Val < node.Val && q.Val < node.Val:
			node = node.Left
		case p.Val > node.Val && q.Val > node.Val:
			node = node.Right
		default:
			return node
		}
	}
	return nil
}
