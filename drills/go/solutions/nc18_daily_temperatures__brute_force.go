package main

func dailyTemperatures(temperatures []int) []int {
	answer := make([]int, len(temperatures))
	for i, t := range temperatures {
		for j := i + 1; j < len(temperatures); j++ {
			if temperatures[j] > t {
				answer[i] = j - i
				break
			}
		}
	}
	return answer
}
