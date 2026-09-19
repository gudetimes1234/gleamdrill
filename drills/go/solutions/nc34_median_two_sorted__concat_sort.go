package main

import "sort"

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	all := append(append([]int{}, nums1...), nums2...)
	sort.Ints(all)
	n := len(all)
	if n%2 == 1 {
		return float64(all[n/2])
	}
	return float64(all[n/2-1]+all[n/2]) / 2
}
