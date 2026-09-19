package main

func isValidSudoku(board [][]byte) bool {
	var rows, cols, boxes [9][10]bool
	for r := 0; r < 9; r++ {
		for c := 0; c < 9; c++ {
			if board[r][c] == '.' {
				continue
			}
			digit := board[r][c] - '0'
			box := (r/3)*3 + c/3
			if rows[r][digit] || cols[c][digit] || boxes[box][digit] {
				return false
			}
			rows[r][digit], cols[c][digit], boxes[box][digit] = true, true, true
		}
	}
	return true
}
