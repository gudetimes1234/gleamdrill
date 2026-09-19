package main

import (
	"strconv"
	"strings"
)

// Post-order: children before the node. Reading from the END of the token
// list, the root comes first and the right subtree before the left.
func serialize(root *TreeNode) string {
	tokens := []string{}
	var write func(node *TreeNode)
	write = func(node *TreeNode) {
		if node == nil {
			tokens = append(tokens, "#")
			return
		}
		write(node.Left)
		write(node.Right)
		tokens = append(tokens, strconv.Itoa(node.Val))
	}
	write(root)
	return strings.Join(tokens, ",")
}

func deserialize(data string) *TreeNode {
	tokens := strings.Split(data, ",")
	next := len(tokens) - 1
	var read func() *TreeNode
	read = func() *TreeNode {
		token := tokens[next]
		next--
		if token == "#" {
			return nil
		}
		val, _ := strconv.Atoi(token)
		node := &TreeNode{Val: val}
		node.Right = read()
		node.Left = read()
		return node
	}
	return read()
}
