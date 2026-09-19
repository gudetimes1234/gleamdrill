package main

import "sort"

func isNStraightHand(hand []int, groupSize int) bool {
	if len(hand)%groupSize != 0 {
		return false
	}
	counts := map[int]int{}
	for _, card := range hand {
		counts[card]++
	}
	// The smallest remaining card must start a group; take the run above
	// it, one of each, or the hand cannot be dealt.
	cards := make([]int, 0, len(counts))
	for card := range counts {
		cards = append(cards, card)
	}
	sort.Ints(cards)
	for _, card := range cards {
		for counts[card] > 0 {
			for next := card; next < card+groupSize; next++ {
				if counts[next] == 0 {
					return false
				}
				counts[next]--
			}
		}
	}
	return true
}
