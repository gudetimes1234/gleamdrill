package main

import "sort"

func twoSum(numbers []int, target int) []int {
	for i, n := range numbers {
		// For each element, binary search the rest for its complement.
		rest := numbers[i+1:]
		j := sort.SearchInts(rest, target-n)
		if j < len(rest) && rest[j] == target-n {
			return []int{i + 1, i + 1 + j + 1}
		}
	}
	return []int{}
}
