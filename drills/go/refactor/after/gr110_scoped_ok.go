package main

func cachedSquare(cache map[int]int, n int) int {
	if v, ok := cache[n]; ok {
		return v
	}
	sq := n * n
	cache[n] = sq
	return sq
}
