package main

import (
	"strconv"
	"strings"
)

func isSubtree(root *TreeNode, subRoot *TreeNode) bool {
	// Serialise both with explicit nils and a marker before each value, so
	// a subtree is a substring and "2" cannot match inside "12".
	return strings.Contains(serialise(root), serialise(subRoot))
}

func serialise(node *TreeNode) string {
	if node == nil {
		return ",#"
	}
	return ",^" + strconv.Itoa(node.Val) + serialise(node.Left) + serialise(node.Right)
}
