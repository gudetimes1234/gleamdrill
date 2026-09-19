package main

func search(nums []int, target int) int {
	// Find the rotation point first, then binary search the one sorted
	// half the target can be in.
	low, high := 0, len(nums)-1
	for low < high {
		mid := low + (high-low)/2
		if nums[mid] > nums[high] {
			low = mid + 1
		} else {
			high = mid
		}
	}
	pivot := low
	low, high = 0, len(nums)-1
	if nums[pivot] <= target && target <= nums[len(nums)-1] {
		low = pivot
	} else {
		high = pivot - 1
	}
	for low <= high {
		mid := low + (high-low)/2
		switch {
		case nums[mid] == target:
			return mid
		case nums[mid] < target:
			low = mid + 1
		default:
			high = mid - 1
		}
	}
	return -1
}
