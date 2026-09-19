package main

func alienOrder(words []string) string {
	next := map[byte]map[byte]bool{}
	for _, w := range words {
		for i := 0; i < len(w); i++ {
			if next[w[i]] == nil {
				next[w[i]] = map[byte]bool{}
			}
		}
	}
	for i := 0; i+1 < len(words); i++ {
		a, b := words[i], words[i+1]
		if len(a) > len(b) && a[:len(b)] == b {
			return ""
		}
		for j := 0; j < len(a) && j < len(b); j++ {
			if a[j] != b[j] {
				next[a[j]][b[j]] = true
				break
			}
		}
	}
	// Depth-first post-order with path colouring: a letter is emitted after
	// everything that must follow it, so the reversed order is the answer.
	const unvisited, onPath, done = 0, 1, 2
	colour := map[byte]int{}
	postorder := []byte{}
	var visit func(c byte) bool
	visit = func(c byte) bool {
		switch colour[c] {
		case onPath:
			return false
		case done:
			return true
		}
		colour[c] = onPath
		for d := byte('a'); d <= 'z'; d++ {
			if next[c][d] && !visit(d) {
				return false
			}
		}
		colour[c] = done
		postorder = append(postorder, c)
		return true
	}
	for c := byte('a'); c <= 'z'; c++ {
		if _, present := next[c]; present && !visit(c) {
			return ""
		}
	}
	for i, j := 0, len(postorder)-1; i < j; i, j = i+1, j-1 {
		postorder[i], postorder[j] = postorder[j], postorder[i]
	}
	return string(postorder)
}
