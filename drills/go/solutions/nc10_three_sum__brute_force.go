package main

import "sort"

func threeSum(nums []int) [][]int {
	seen := map[[3]int]bool{}
	result := [][]int{}
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			for k := j + 1; k < len(nums); k++ {
				if nums[i]+nums[j]+nums[k] != 0 {
					continue
				}
				triple := []int{nums[i], nums[j], nums[k]}
				sort.Ints(triple)
				key := [3]int{triple[0], triple[1], triple[2]}
				if !seen[key] {
					seen[key] = true
					result = append(result, triple)
				}
			}
		}
	}
	return result
}
