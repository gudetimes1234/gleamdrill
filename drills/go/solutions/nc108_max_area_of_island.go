package main

func maxAreaOfIsland(grid [][]int) int {
	best := 0
	var area func(r, c int) int
	area = func(r, c int) int {
		if r < 0 || r >= len(grid) || c < 0 || c >= len(grid[0]) || grid[r][c] != 1 {
			return 0
		}
		grid[r][c] = 0
		return 1 + area(r+1, c) + area(r-1, c) + area(r, c+1) + area(r, c-1)
	}
	for r := range grid {
		for c := range grid[r] {
			best = max(best, area(r, c))
		}
	}
	return best
}
