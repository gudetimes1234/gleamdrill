package main

func singleNumber(nums []int) int {
	// Every value but one appears twice: twice the sum of the distinct
	// values, minus the sum of everything, is the one that appeared once.
	distinct := map[int]bool{}
	total, uniqueTotal := 0, 0
	for _, n := range nums {
		total += n
		if !distinct[n] {
			distinct[n] = true
			uniqueTotal += n
		}
	}
	return 2*uniqueTotal - total
}
