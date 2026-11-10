package main

func spread(readings []int) int {
	if len(readings) == 0 {
		return 0
	}
	lo, hi := readings[0], readings[0]
	for _, r := range readings {
		if r < lo {
			lo = r
		}
		if r > hi {
			hi = r
		}
	}
	return hi - lo
}
