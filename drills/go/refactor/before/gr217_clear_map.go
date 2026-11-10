package main

func resetTally(tally map[string]int) {
	for k := range tally {
		delete(tally, k)
	}
}
