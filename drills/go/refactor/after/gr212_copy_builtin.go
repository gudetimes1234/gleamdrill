package main

func snapshot(src []int) []int {
	dst := make([]int, len(src))
	copy(dst, src)
	return dst
}
