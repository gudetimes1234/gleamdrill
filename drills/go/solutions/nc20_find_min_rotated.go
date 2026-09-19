package main

func findMin(nums []int) int {
	low, high := 0, len(nums)-1
	for low < high {
		mid := low + (high-low)/2
		// The minimum is where the rotation broke the order: if mid is above
		// the right end, the break is to the right; otherwise mid or left.
		if nums[mid] > nums[high] {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return nums[low]
}
