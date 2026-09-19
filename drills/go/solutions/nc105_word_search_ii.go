package main

type searchNode struct {
	children map[byte]*searchNode
	word     string
}

func findWords(board [][]byte, words []string) []string {
	// Put every word in a trie, then walk the board once, descending the
	// trie in step: a dead branch prunes every word sharing that prefix.
	root := &searchNode{children: map[byte]*searchNode{}}
	for _, w := range words {
		node := root
		for i := 0; i < len(w); i++ {
			next, ok := node.children[w[i]]
			if !ok {
				next = &searchNode{children: map[byte]*searchNode{}}
				node.children[w[i]] = next
			}
			node = next
		}
		node.word = w
	}
	found := []string{}
	var walk func(r, c int, node *searchNode)
	walk = func(r, c int, node *searchNode) {
		if r < 0 || r >= len(board) || c < 0 || c >= len(board[0]) {
			return
		}
		next := node.children[board[r][c]]
		if next == nil {
			return
		}
		if next.word != "" {
			found = append(found, next.word)
			next.word = "" // each word once
		}
		saved := board[r][c]
		board[r][c] = '#'
		walk(r+1, c, next)
		walk(r-1, c, next)
		walk(r, c+1, next)
		walk(r, c-1, next)
		board[r][c] = saved
	}
	for r := range board {
		for c := range board[r] {
			walk(r, c, root)
		}
	}
	return found
}
