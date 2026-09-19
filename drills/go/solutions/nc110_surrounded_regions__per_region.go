package main

func solve(board [][]byte) {
	if len(board) == 0 {
		return
	}
	rows, cols := len(board), len(board[0])
	visited := make([][]bool, rows)
	for r := range visited {
		visited[r] = make([]bool, cols)
	}
	// Flood each region of Os, remembering whether it touched the border;
	// capture the whole region afterwards if it did not.
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if board[r][c] != 'O' || visited[r][c] {
				continue
			}
			region := [][2]int{}
			touchesBorder := false
			queue := [][2]int{{r, c}}
			visited[r][c] = true
			for len(queue) > 0 {
				cell := queue[0]
				queue = queue[1:]
				region = append(region, cell)
				if cell[0] == 0 || cell[0] == rows-1 || cell[1] == 0 || cell[1] == cols-1 {
					touchesBorder = true
				}
				for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
					nr, nc := cell[0]+d[0], cell[1]+d[1]
					if nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] == 'O' && !visited[nr][nc] {
						visited[nr][nc] = true
						queue = append(queue, [2]int{nr, nc})
					}
				}
			}
			if !touchesBorder {
				for _, cell := range region {
					board[cell[0]][cell[1]] = 'X'
				}
			}
		}
	}
}
