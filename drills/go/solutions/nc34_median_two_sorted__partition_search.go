package main

import "math"

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	// Binary search a cut of the shorter array; the matching cut of the
	// longer one is forced by the half size. The cut is right when every
	// element left of both cuts is at most every element right of them.
	if len(nums1) > len(nums2) {
		nums1, nums2 = nums2, nums1
	}
	m, n := len(nums1), len(nums2)
	half := (m + n + 1) / 2
	low, high := 0, m
	for {
		i := (low + high) / 2
		j := half - i
		left1, right1 := math.MinInt, math.MaxInt
		left2, right2 := math.MinInt, math.MaxInt
		if i > 0 {
			left1 = nums1[i-1]
		}
		if i < m {
			right1 = nums1[i]
		}
		if j > 0 {
			left2 = nums2[j-1]
		}
		if j < n {
			right2 = nums2[j]
		}
		switch {
		case left1 > right2:
			high = i - 1
		case left2 > right1:
			low = i + 1
		default:
			if (m+n)%2 == 1 {
				return float64(max(left1, left2))
			}
			return float64(max(left1, left2)+min(right1, right2)) / 2
		}
	}
}
