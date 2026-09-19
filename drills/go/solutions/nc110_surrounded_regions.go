package main

func solve(board [][]byte) {
	if len(board) == 0 {
		return
	}
	rows, cols := len(board), len(board[0])
	// An O survives only if it touches the border through other Os. Mark
	// every O reachable from the border, then flip the rest.
	var keep func(r, c int)
	keep = func(r, c int) {
		if r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != 'O' {
			return
		}
		board[r][c] = 'S'
		keep(r+1, c)
		keep(r-1, c)
		keep(r, c+1)
		keep(r, c-1)
	}
	for r := 0; r < rows; r++ {
		keep(r, 0)
		keep(r, cols-1)
	}
	for c := 0; c < cols; c++ {
		keep(0, c)
		keep(rows-1, c)
	}
	for r := range board {
		for c := range board[r] {
			switch board[r][c] {
			case 'O':
				board[r][c] = 'X'
			case 'S':
				board[r][c] = 'O'
			}
		}
	}
}
