package main

// Index the stored points by x. For a query, every stored point sharing
// its x (at a different y) fixes the side length; try the square to the
// right and the square to the left of that side.
type DetectSquares struct {
	counts   map[[2]int]int
	byColumn map[int]map[int]int
}

func Constructor() DetectSquares {
	return DetectSquares{counts: map[[2]int]int{}, byColumn: map[int]map[int]int{}}
}

func (d *DetectSquares) Add(point []int) {
	x, y := point[0], point[1]
	d.counts[[2]int{x, y}]++
	if d.byColumn[x] == nil {
		d.byColumn[x] = map[int]int{}
	}
	d.byColumn[x][y]++
}

func (d *DetectSquares) Count(point []int) int {
	x, y := point[0], point[1]
	total := 0
	for otherY, n := range d.byColumn[x] {
		side := otherY - y
		if side == 0 {
			continue
		}
		for _, dx := range []int{side, -side} {
			total += n * d.counts[[2]int{x + dx, y}] * d.counts[[2]int{x + dx, otherY}]
		}
	}
	return total
}
