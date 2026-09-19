package main

type dictNode struct {
	children map[byte]*dictNode
	terminal bool
}

// A trie; a dot in the query branches into every child at that depth.
type WordDictionary struct {
	root *dictNode
}

func Constructor() WordDictionary {
	return WordDictionary{root: &dictNode{children: map[byte]*dictNode{}}}
}

func (d *WordDictionary) AddWord(word string) {
	node := d.root
	for i := 0; i < len(word); i++ {
		next, ok := node.children[word[i]]
		if !ok {
			next = &dictNode{children: map[byte]*dictNode{}}
			node.children[word[i]] = next
		}
		node = next
	}
	node.terminal = true
}

func (d *WordDictionary) Search(word string) bool {
	var match func(node *dictNode, i int) bool
	match = func(node *dictNode, i int) bool {
		if i == len(word) {
			return node.terminal
		}
		if word[i] != '.' {
			next := node.children[word[i]]
			return next != nil && match(next, i+1)
		}
		for _, child := range node.children {
			if match(child, i+1) {
				return true
			}
		}
		return false
	}
	return match(d.root, 0)
}
