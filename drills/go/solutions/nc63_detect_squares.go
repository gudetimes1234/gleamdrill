package main

// Count each point; for a query, every stored point on a diagonal from it
// (|dx| == |dy| != 0) fixes a square whose other two corners are then
// looked up by count.
type DetectSquares struct {
	counts map[[2]int]int
}

func Constructor() DetectSquares {
	return DetectSquares{counts: map[[2]int]int{}}
}

func (d *DetectSquares) Add(point []int) {
	d.counts[[2]int{point[0], point[1]}]++
}

func (d *DetectSquares) Count(point []int) int {
	x, y := point[0], point[1]
	total := 0
	for corner, n := range d.counts {
		dx, dy := corner[0]-x, corner[1]-y
		if dx == 0 || dx != dy && dx != -dy {
			continue
		}
		total += n * d.counts[[2]int{x + dx, y}] * d.counts[[2]int{x, y + dy}]
	}
	return total
}
