package main

const inf = 2147483647

func wallsAndGates(rooms [][]int) {
	if len(rooms) == 0 {
		return
	}
	rows, cols := len(rooms), len(rooms[0])
	// From each empty room, a breadth-first search until the first gate.
	// One search per room rather than one in total.
	distances := make([][]int, rows)
	for r := range distances {
		distances[r] = append([]int{}, rooms[r]...)
	}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if rooms[r][c] != inf {
				continue
			}
			seen := map[[2]int]bool{{r, c}: true}
			queue := [][3]int{{r, c, 0}}
			for len(queue) > 0 {
				cell := queue[0]
				queue = queue[1:]
				if rooms[cell[0]][cell[1]] == 0 {
					distances[r][c] = cell[2]
					break
				}
				for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
					nr, nc := cell[0]+d[0], cell[1]+d[1]
					if nr >= 0 && nr < rows && nc >= 0 && nc < cols && rooms[nr][nc] != -1 && !seen[[2]int{nr, nc}] {
						seen[[2]int{nr, nc}] = true
						queue = append(queue, [3]int{nr, nc, cell[2] + 1})
					}
				}
			}
		}
	}
	for r := range rooms {
		copy(rooms[r], distances[r])
	}
}
