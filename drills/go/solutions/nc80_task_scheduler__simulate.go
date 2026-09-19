package main

func leastInterval(tasks []byte, n int) int {
	counts := map[byte]int{}
	for _, t := range tasks {
		counts[t]++
	}
	// Tick by tick: run the available task with the most left, else idle.
	// A task is available once n ticks have passed since its last run.
	lastRun := map[byte]int{}
	remaining := len(tasks)
	ticks := 0
	for remaining > 0 {
		var pick byte
		for t, c := range counts {
			if c == 0 {
				continue
			}
			if last, ran := lastRun[t]; ran && ticks-last <= n {
				continue
			}
			if pick == 0 || c > counts[pick] || c == counts[pick] && t < pick {
				pick = t
			}
		}
		if pick != 0 {
			counts[pick]--
			lastRun[pick] = ticks
			remaining--
		}
		ticks++
	}
	return ticks
}
