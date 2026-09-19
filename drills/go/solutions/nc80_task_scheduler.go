package main

func leastInterval(tasks []byte, n int) int {
	counts := map[byte]int{}
	most := 0
	for _, t := range tasks {
		counts[t]++
		most = max(most, counts[t])
	}
	// The most frequent task fixes a frame of (most-1) gaps of n slots;
	// every task tied for most frequent adds a slot to the last row. If
	// the frame has room for everything else, that is the answer;
	// otherwise there is no idling and the length is the task count.
	tiedForMost := 0
	for _, c := range counts {
		if c == most {
			tiedForMost++
		}
	}
	return max(len(tasks), (most-1)*(n+1)+tiedForMost)
}
