package main

func kClosest(points [][]int, k int) [][]int {
	remaining := append([][]int{}, points...)
	result := [][]int{}
	// Pick the nearest of what is left, k times: O(nk), no heap.
	for len(result) < k {
		nearest := 0
		for i, p := range remaining {
			if p[0]*p[0]+p[1]*p[1] < remaining[nearest][0]*remaining[nearest][0]+remaining[nearest][1]*remaining[nearest][1] {
				nearest = i
			}
		}
		result = append(result, remaining[nearest])
		remaining = append(remaining[:nearest], remaining[nearest+1:]...)
	}
	return result
}
