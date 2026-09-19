package main

func goodNodes(root *TreeNode) int {
	// Carry the largest value on the path so far; a node is good when it
	// is at least that, and it becomes the new maximum for its subtree.
	var count func(node *TreeNode, largest int) int
	count = func(node *TreeNode, largest int) int {
		if node == nil {
			return 0
		}
		good := 0
		if node.Val >= largest {
			good = 1
			largest = node.Val
		}
		return good + count(node.Left, largest) + count(node.Right, largest)
	}
	if root == nil {
		return 0
	}
	return count(root, root.Val)
}
