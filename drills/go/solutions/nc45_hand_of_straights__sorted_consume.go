package main

import "sort"

func isNStraightHand(hand []int, groupSize int) bool {
	if len(hand)%groupSize != 0 {
		return false
	}
	remaining := sortInts(hand)
	// Repeatedly deal a group from the smallest card left, deleting each
	// card as it is used. Quadratic, but the invariant is plain to see.
	for len(remaining) > 0 {
		start := remaining[0]
		for next := start; next < start+groupSize; next++ {
			i := sort.SearchInts(remaining, next)
			if i == len(remaining) || remaining[i] != next {
				return false
			}
			remaining = append(remaining[:i], remaining[i+1:]...)
		}
	}
	return true
}
