package main

func cachedSquare(cache map[int]int, n int) int {
	v, ok := cache[n]
	if ok {
		return v
	}
	v = n * n
	cache[n] = v
	return v
}
