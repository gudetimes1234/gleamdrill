package main

func numIslands(grid [][]byte) int {
	if len(grid) == 0 {
		return 0
	}
	rows, cols := len(grid), len(grid[0])
	// Every land cell is its own set; union it with land to the right and
	// below. The islands are the sets left standing.
	parent := make([]int, rows*cols)
	for i := range parent {
		parent[i] = i
	}
	var find func(i int) int
	find = func(i int) int {
		for parent[i] != i {
			parent[i] = parent[parent[i]]
			i = parent[i]
		}
		return i
	}
	count := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				count++
			}
		}
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] != '1' {
				continue
			}
			for _, d := range [][2]int{{1, 0}, {0, 1}} {
				nr, nc := r+d[0], c+d[1]
				if nr < rows && nc < cols && grid[nr][nc] == '1' {
					a, b := find(r*cols+c), find(nr*cols+nc)
					if a != b {
						parent[a] = b
						count--
					}
				}
			}
		}
	}
	return count
}
