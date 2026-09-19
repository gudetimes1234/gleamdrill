package main

func maxAreaOfIsland(grid [][]int) int {
	best := 0
	for r := range grid {
		for c := range grid[r] {
			if grid[r][c] != 1 {
				continue
			}
			// Flood the island with a queue, counting cells as they are sunk.
			area := 0
			queue := [][2]int{{r, c}}
			grid[r][c] = 0
			for len(queue) > 0 {
				cell := queue[0]
				queue = queue[1:]
				area++
				for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
					nr, nc := cell[0]+d[0], cell[1]+d[1]
					if nr >= 0 && nr < len(grid) && nc >= 0 && nc < len(grid[0]) && grid[nr][nc] == 1 {
						grid[nr][nc] = 0
						queue = append(queue, [2]int{nr, nc})
					}
				}
			}
			best = max(best, area)
		}
	}
	return best
}
