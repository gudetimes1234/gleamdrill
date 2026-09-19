package main

func orangesRotting(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	// Simulate minute by minute over the whole grid, rotting the fresh
	// neighbours of what was rotten at the start of the minute, until a
	// minute changes nothing.
	minutes := 0
	for {
		toRot := [][2]int{}
		for r := 0; r < rows; r++ {
			for c := 0; c < cols; c++ {
				if grid[r][c] != 2 {
					continue
				}
				for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
					nr, nc := r+d[0], c+d[1]
					if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
						toRot = append(toRot, [2]int{nr, nc})
					}
				}
			}
		}
		if len(toRot) == 0 {
			break
		}
		for _, cell := range toRot {
			grid[cell[0]][cell[1]] = 2
		}
		minutes++
	}
	for _, row := range grid {
		for _, cell := range row {
			if cell == 1 {
				return -1
			}
		}
	}
	return minutes
}
