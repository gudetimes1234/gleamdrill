package main

import (
	"strconv"
	"strings"
)

func isSameTree(p *TreeNode, q *TreeNode) bool {
	// Two trees are equal exactly when their pre-order serialisations
	// (with explicit nils) are.
	return serialise(p) == serialise(q)
}

func serialise(node *TreeNode) string {
	if node == nil {
		return "#"
	}
	return strings.Join([]string{strconv.Itoa(node.Val), serialise(node.Left), serialise(node.Right)}, ",")
}
