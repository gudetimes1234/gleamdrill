package main

func exist(board [][]byte, word string) bool {
	// Before searching, count letters: if the board lacks enough of any
	// letter the word needs, no path can exist. Also start from the rarer
	// end of the word, which cuts the branching when one end is common.
	available := map[byte]int{}
	for _, row := range board {
		for _, cell := range row {
			available[cell]++
		}
	}
	needed := map[byte]int{}
	for i := 0; i < len(word); i++ {
		needed[word[i]]++
	}
	for letter, n := range needed {
		if available[letter] < n {
			return false
		}
	}
	if available[word[0]] > available[word[len(word)-1]] {
		reversed := []byte(word)
		for i, j := 0, len(reversed)-1; i < j; i, j = i+1, j-1 {
			reversed[i], reversed[j] = reversed[j], reversed[i]
		}
		word = string(reversed)
	}
	rows, cols := len(board), len(board[0])
	var search func(r, c, i int) bool
	search = func(r, c, i int) bool {
		if i == len(word) {
			return true
		}
		if r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[i] {
			return false
		}
		saved := board[r][c]
		board[r][c] = '#'
		found := search(r+1, c, i+1) || search(r-1, c, i+1) || search(r, c+1, i+1) || search(r, c-1, i+1)
		board[r][c] = saved
		return found
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if search(r, c, 0) {
				return true
			}
		}
	}
	return false
}
