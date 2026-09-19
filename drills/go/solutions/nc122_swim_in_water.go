package main

import "container/heap"

type cell struct{ height, r, c int }

type lowestFirst []cell

func (h lowestFirst) Len() int           { return len(h) }
func (h lowestFirst) Less(i, j int) bool { return h[i].height < h[j].height }
func (h lowestFirst) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *lowestFirst) Push(x any)        { *h = append(*h, x.(cell)) }
func (h *lowestFirst) Pop() any {
	old := *h
	x := old[len(old)-1]
	*h = old[:len(old)-1]
	return x
}

func swimInWater(grid [][]int) int {
	n := len(grid)
	// Dijkstra where a path's cost is its highest cell: always expand the
	// lowest reachable cell, and the answer is the highest cell popped
	// before the corner.
	seen := make([][]bool, n)
	for r := range seen {
		seen[r] = make([]bool, n)
	}
	h := &lowestFirst{{grid[0][0], 0, 0}}
	seen[0][0] = true
	highest := 0
	for {
		current := heap.Pop(h).(cell)
		highest = max(highest, current.height)
		if current.r == n-1 && current.c == n-1 {
			return highest
		}
		for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			nr, nc := current.r+d[0], current.c+d[1]
			if nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc] {
				seen[nr][nc] = true
				heap.Push(h, cell{grid[nr][nc], nr, nc})
			}
		}
	}
}
