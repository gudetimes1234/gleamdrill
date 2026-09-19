package main

func minEatingSpeed(piles []int, h int) int {
	// Try every speed from 1 up; the first that fits the hours is the answer.
	for speed := 1; ; speed++ {
		hours := 0
		for _, pile := range piles {
			hours += (pile + speed - 1) / speed
		}
		if hours <= h {
			return speed
		}
	}
}
