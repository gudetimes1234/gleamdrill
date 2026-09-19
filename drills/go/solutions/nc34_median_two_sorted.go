package main

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	// Merge just far enough: the median sits at index (total-1)/2 and
	// total/2 of the merged order, so stop once those are read.
	total := len(nums1) + len(nums2)
	i, j := 0, 0
	previous, current := 0, 0
	for k := 0; k <= total/2; k++ {
		previous = current
		if i < len(nums1) && (j >= len(nums2) || nums1[i] <= nums2[j]) {
			current = nums1[i]
			i++
		} else {
			current = nums2[j]
			j++
		}
	}
	if total%2 == 1 {
		return float64(current)
	}
	return float64(previous+current) / 2
}
