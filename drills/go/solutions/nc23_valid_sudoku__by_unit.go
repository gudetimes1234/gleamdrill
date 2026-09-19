package main

func isValidSudoku(board [][]byte) bool {
	// Check each of the 27 units on its own: nine rows, nine columns, nine boxes.
	for i := 0; i < 9; i++ {
		row := make([]byte, 0, 9)
		col := make([]byte, 0, 9)
		box := make([]byte, 0, 9)
		for j := 0; j < 9; j++ {
			row = append(row, board[i][j])
			col = append(col, board[j][i])
			box = append(box, board[(i/3)*3+j/3][(i%3)*3+j%3])
		}
		if hasRepeat(row) || hasRepeat(col) || hasRepeat(box) {
			return false
		}
	}
	return true
}

func hasRepeat(unit []byte) bool {
	seen := map[byte]bool{}
	for _, cell := range unit {
		if cell == '.' {
			continue
		}
		if seen[cell] {
			return true
		}
		seen[cell] = true
	}
	return false
}
