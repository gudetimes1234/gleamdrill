package main

func reverseSteps(steps []string) {
	for i := 0; i < len(steps)/2; i++ {
		j := len(steps) - 1 - i
		steps[i], steps[j] = steps[j], steps[i]
	}
}
