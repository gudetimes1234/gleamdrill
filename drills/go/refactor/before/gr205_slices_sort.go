package main

func sortScores(scores []int) {
	for i := 0; i < len(scores); i++ {
		for j := i + 1; j < len(scores); j++ {
			if scores[j] < scores[i] {
				scores[i], scores[j] = scores[j], scores[i]
			}
		}
	}
}
