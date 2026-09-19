package main

func findWords(board [][]byte, words []string) []string {
	// Run the single-word search once per word: correct, and simple, at
	// the cost of rewalking the board for every word.
	found := []string{}
	seen := map[string]bool{}
	for _, w := range words {
		if !seen[w] && exists(board, w) {
			seen[w] = true
			found = append(found, w)
		}
	}
	return found
}

func exists(board [][]byte, word string) bool {
	var search func(r, c, i int) bool
	search = func(r, c, i int) bool {
		if i == len(word) {
			return true
		}
		if r < 0 || r >= len(board) || c < 0 || c >= len(board[0]) || board[r][c] != word[i] {
			return false
		}
		saved := board[r][c]
		board[r][c] = '#'
		found := search(r+1, c, i+1) || search(r-1, c, i+1) || search(r, c+1, i+1) || search(r, c-1, i+1)
		board[r][c] = saved
		return found
	}
	for r := range board {
		for c := range board[r] {
			if search(r, c, 0) {
				return true
			}
		}
	}
	return false
}
