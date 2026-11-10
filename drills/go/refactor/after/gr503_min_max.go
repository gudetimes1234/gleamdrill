package main

func largest(a, b, c int) int {
	return max(a, b, c)
}

func clamp(v, lo, hi int) int {
	return min(max(v, lo), hi)
}
