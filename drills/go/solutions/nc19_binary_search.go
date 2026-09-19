package main

func search(nums []int, target int) int {
	low, high := 0, len(nums)-1
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
