package main

func pacificAtlantic(heights [][]int) [][]int {
	if len(heights) == 0 {
		return [][]int{}
	}
	rows, cols := len(heights), len(heights[0])
	// Flow uphill from each ocean's coast: the cells an ocean can reach
	// going up are exactly the cells that drain down into it.
	reach := func(coast [][2]int) [][]bool {
		seen := make([][]bool, rows)
		for r := range seen {
			seen[r] = make([]bool, cols)
		}
		var climb func(r, c int)
		climb = func(r, c int) {
			seen[r][c] = true
			for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
				nr, nc := r+d[0], c+d[1]
				if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !seen[nr][nc] && heights[nr][nc] >= heights[r][c] {
					climb(nr, nc)
				}
			}
		}
		for _, cell := range coast {
			if !seen[cell[0]][cell[1]] {
				climb(cell[0], cell[1])
			}
		}
		return seen
	}
	pacificCoast, atlanticCoast := [][2]int{}, [][2]int{}
	for r := 0; r < rows; r++ {
		pacificCoast = append(pacificCoast, [2]int{r, 0})
		atlanticCoast = append(atlanticCoast, [2]int{r, cols - 1})
	}
	for c := 0; c < cols; c++ {
		pacificCoast = append(pacificCoast, [2]int{0, c})
		atlanticCoast = append(atlanticCoast, [2]int{rows - 1, c})
	}
	pacific, atlantic := reach(pacificCoast), reach(atlanticCoast)
	result := [][]int{}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if pacific[r][c] && atlantic[r][c] {
				result = append(result, []int{r, c})
			}
		}
	}
	return result
}
