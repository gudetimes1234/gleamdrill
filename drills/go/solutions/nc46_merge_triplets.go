package main

func mergeTriplets(triplets [][]int, target []int) bool {
	// A triplet is usable only if no coordinate exceeds the target. Among
	// usable ones, the max is the target exactly when each coordinate is
	// hit by at least one of them.
	var hit [3]bool
	for _, t := range triplets {
		if t[0] > target[0] || t[1] > target[1] || t[2] > target[2] {
			continue
		}
		for i := 0; i < 3; i++ {
			if t[i] == target[i] {
				hit[i] = true
			}
		}
	}
	return hit[0] && hit[1] && hit[2]
}
