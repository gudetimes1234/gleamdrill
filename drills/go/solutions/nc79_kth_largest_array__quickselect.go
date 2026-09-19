package main

func findKthLargest(nums []int, k int) int {
	// Quickselect: partition around a pivot and recurse into the one side
	// that holds the target index. Average O(n).
	values := append([]int{}, nums...)
	target := len(values) - k
	low, high := 0, len(values)-1
	for {
		pivot := values[high]
		store := low
		for i := low; i < high; i++ {
			if values[i] < pivot {
				values[i], values[store] = values[store], values[i]
				store++
			}
		}
		values[store], values[high] = values[high], values[store]
		switch {
		case store == target:
			return values[store]
		case store < target:
			low = store + 1
		default:
			high = store - 1
		}
	}
}
