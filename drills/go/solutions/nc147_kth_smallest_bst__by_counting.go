package main

func kthSmallest(root *TreeNode, k int) int {
	// Count the left subtree: if it has k-1 nodes the root is the answer,
	// fewer means the answer is on the right (with k reduced), more means
	// it is on the left.
	for node := root; node != nil; {
		leftSize := size(node.Left)
		switch {
		case k == leftSize+1:
			return node.Val
		case k <= leftSize:
			node = node.Left
		default:
			k -= leftSize + 1
			node = node.Right
		}
	}
	return -1
}

func size(node *TreeNode) int {
	if node == nil {
		return 0
	}
	return 1 + size(node.Left) + size(node.Right)
}
