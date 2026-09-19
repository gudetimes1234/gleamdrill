package main

func mergeTriplets(triplets [][]int, target []int) bool {
	// Merge every usable triplet into one running maximum and compare it
	// to the target at the end.
	merged := []int{0, 0, 0}
	for _, t := range triplets {
		if t[0] > target[0] || t[1] > target[1] || t[2] > target[2] {
			continue
		}
		for i := 0; i < 3; i++ {
			merged[i] = max(merged[i], t[i])
		}
	}
	return merged[0] == target[0] && merged[1] == target[1] && merged[2] == target[2]
}
