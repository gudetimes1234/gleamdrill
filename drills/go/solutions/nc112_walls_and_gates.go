package main

const inf = 2147483647

func wallsAndGates(rooms [][]int) {
	if len(rooms) == 0 {
		return
	}
	rows, cols := len(rooms), len(rooms[0])
	// Breadth-first from every gate at once: the first time a room is
	// reached is by its nearest gate, so each room is written once.
	queue := [][2]int{}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if rooms[r][c] == 0 {
				queue = append(queue, [2]int{r, c})
			}
		}
	}
	for len(queue) > 0 {
		cell := queue[0]
		queue = queue[1:]
		for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			nr, nc := cell[0]+d[0], cell[1]+d[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && rooms[nr][nc] == inf {
				rooms[nr][nc] = rooms[cell[0]][cell[1]] + 1
				queue = append(queue, [2]int{nr, nc})
			}
		}
	}
}
