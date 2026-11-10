package main

func dedupeSorted(ids []int) []int {
	if len(ids) == 0 {
		return ids
	}
	w := 1
	for i := 1; i < len(ids); i++ {
		if ids[i] != ids[w-1] {
			ids[w] = ids[i]
			w++
		}
	}
	return ids[:w]
}
