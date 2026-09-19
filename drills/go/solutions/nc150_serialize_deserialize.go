package main

import (
	"strconv"
	"strings"
)

// Pre-order with an explicit marker for nil: the reader consumes tokens
// in the same order the writer produced them, so no lengths are needed.
func serialize(root *TreeNode) string {
	tokens := []string{}
	var write func(node *TreeNode)
	write = func(node *TreeNode) {
		if node == nil {
			tokens = append(tokens, "#")
			return
		}
		tokens = append(tokens, strconv.Itoa(node.Val))
		write(node.Left)
		write(node.Right)
	}
	write(root)
	return strings.Join(tokens, ",")
}

func deserialize(data string) *TreeNode {
	tokens := strings.Split(data, ",")
	next := 0
	var read func() *TreeNode
	read = func() *TreeNode {
		token := tokens[next]
		next++
		if token == "#" {
			return nil
		}
		val, _ := strconv.Atoi(token)
		node := &TreeNode{Val: val}
		node.Left = read()
		node.Right = read()
		return node
	}
	return read()
}
