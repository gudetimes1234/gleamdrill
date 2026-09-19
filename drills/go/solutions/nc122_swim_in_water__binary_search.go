package main

func swimInWater(grid [][]int) int {
	n := len(grid)
	// Binary search the water level: at level t, can the corner be reached
	// through cells at most t high? Feasibility is monotone in t.
	reachable := func(t int) bool {
		if grid[0][0] > t {
			return false
		}
		seen := make([][]bool, n)
		for r := range seen {
			seen[r] = make([]bool, n)
		}
		stack := [][2]int{{0, 0}}
		seen[0][0] = true
		for len(stack) > 0 {
			current := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if current[0] == n-1 && current[1] == n-1 {
				return true
			}
			for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
				nr, nc := current[0]+d[0], current[1]+d[1]
				if nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc] && grid[nr][nc] <= t {
					seen[nr][nc] = true
					stack = append(stack, [2]int{nr, nc})
				}
			}
		}
		return false
	}
	low, high := 0, n*n-1
	for low < high {
		mid := low + (high-low)/2
		if reachable(mid) {
			high = mid
		} else {
			low = mid + 1
		}
	}
	return low
}
