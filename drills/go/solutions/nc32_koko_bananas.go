package main

func minEatingSpeed(piles []int, h int) int {
	hoursAt := func(speed int) int {
		hours := 0
		for _, pile := range piles {
			hours += (pile + speed - 1) / speed
		}
		return hours
	}
	// Feasibility is monotone in the speed, so binary search the smallest
	// speed that finishes in time.
	low, high := 1, 0
	for _, pile := range piles {
		high = max(high, pile)
	}
	for low < high {
		mid := low + (high-low)/2
		if hoursAt(mid) <= h {
			high = mid
		} else {
			low = mid + 1
		}
	}
	return low
}
