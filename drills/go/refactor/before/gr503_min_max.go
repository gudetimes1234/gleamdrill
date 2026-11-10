package main

func largest(a, b, c int) int {
	best := a
	if b > best {
		best = b
	}
	if c > best {
		best = c
	}
	return best
}

func clamp(v, lo, hi int) int {
	if v < lo {
		return lo
	}
	if v > hi {
		return hi
	}
	return v
}
