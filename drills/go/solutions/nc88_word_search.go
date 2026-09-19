package main

func exist(board [][]byte, word string) bool {
	rows, cols := len(board), len(board[0])
	var search func(r, c, i int) bool
	search = func(r, c, i int) bool {
		if i == len(word) {
			return true
		}
		if r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[i] {
			return false
		}
		// Mark the cell in place while exploring from it, then restore it.
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
