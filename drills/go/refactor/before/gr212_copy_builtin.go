package main

func snapshot(src []int) []int {
	dst := make([]int, len(src))
	for i := range src {
		dst[i] = src[i]
	}
	return dst
}
