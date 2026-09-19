package main

import "sort"

func threeSum(nums []int) [][]int {
	ordered := append([]int(nil), nums...)
	sort.Ints(ordered)
	result := [][]int{}
	for i := 0; i < len(ordered); i++ {
		if i > 0 && ordered[i] == ordered[i-1] {
			continue
		}
		left, right := i+1, len(ordered)-1
		for left < right {
			total := ordered[i] + ordered[left] + ordered[right]
			switch {
			case total < 0:
				left++
			case total > 0:
				right--
			default:
				result = append(result, []int{ordered[i], ordered[left], ordered[right]})
				left++
				for left < right && ordered[left] == ordered[left-1] {
					left++
				}
			}
		}
	}
	return result
}
