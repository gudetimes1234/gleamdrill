package main

func pacificAtlantic(heights [][]int) [][]int {
	if len(heights) == 0 {
		return [][]int{}
	}
	rows, cols := len(heights), len(heights[0])
	// From every cell, flow downhill and see which oceans are reached.
	// Simple, and quadratic in the grid size.
	result := [][]int{}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			seen := map[[2]int]bool{}
			pacific, atlantic := false, false
			var flow func(r, c int)
			flow = func(r, c int) {
				if seen[[2]int{r, c}] {
					return
				}
				seen[[2]int{r, c}] = true
				if r == 0 || c == 0 {
					pacific = true
				}
				if r == rows-1 || c == cols-1 {
					atlantic = true
				}
				for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
					nr, nc := r+d[0], c+d[1]
					if nr >= 0 && nr < rows && nc >= 0 && nc < cols && heights[nr][nc] <= heights[r][c] {
						flow(nr, nc)
					}
				}
			}
			flow(r, c)
			if pacific && atlantic {
				result = append(result, []int{r, c})
			}
		}
	}
	return result
}
