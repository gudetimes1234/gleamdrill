package main

type trieNode struct {
	children map[byte]*trieNode
	terminal bool
}

// One node per prefix; a word's last node is marked terminal, which is
// what tells search from startsWith.
type Trie struct {
	root *trieNode
}

func Constructor() Trie {
	return Trie{root: &trieNode{children: map[byte]*trieNode{}}}
}

func (t *Trie) Insert(word string) {
	node := t.root
	for i := 0; i < len(word); i++ {
		next, ok := node.children[word[i]]
		if !ok {
			next = &trieNode{children: map[byte]*trieNode{}}
			node.children[word[i]] = next
		}
		node = next
	}
	node.terminal = true
}

func (t *Trie) Search(word string) bool {
	node := t.walk(word)
	return node != nil && node.terminal
}

func (t *Trie) StartsWith(prefix string) bool {
	return t.walk(prefix) != nil
}

func (t *Trie) walk(s string) *trieNode {
	node := t.root
	for i := 0; i < len(s); i++ {
		node = node.children[s[i]]
		if node == nil {
			return nil
		}
	}
	return node
}
