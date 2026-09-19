package main

func longestConsecutive(nums []int) int {
	all := map[int]bool{}
	for _, n := range nums {
		all[n] = true
	}
	longest := 0
	for n := range all {
		// Only count from the start of a run, so each run is walked once.
		if all[n-1] {
			continue
		}
		length := 1
		for all[n+length] {
			length++
		}
		if length > longest {
			longest = length
		}
	}
	return longest
}
