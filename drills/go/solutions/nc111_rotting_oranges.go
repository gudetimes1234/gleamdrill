package main

func orangesRotting(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	// Multi-source breadth-first search from every rotten orange at once:
	// each level of the search is one minute.
	queue := [][2]int{}
	fresh := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			switch grid[r][c] {
			case 2:
				queue = append(queue, [2]int{r, c})
			case 1:
				fresh++
			}
		}
	}
	minutes := 0
	for len(queue) > 0 && fresh > 0 {
		next := [][2]int{}
		for _, cell := range queue {
			for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
				nr, nc := cell[0]+d[0], cell[1]+d[1]
				if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
					grid[nr][nc] = 2
					fresh--
					next = append(next, [2]int{nr, nc})
				}
			}
		}
		queue = next
		minutes++
	}
	if fresh > 0 {
		return -1
	}
	return minutes
}
