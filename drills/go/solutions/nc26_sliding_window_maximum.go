package main

func maxSlidingWindow(nums []int, k int) []int {
	result := make([]int, 0, len(nums)-k+1)
	// Indices whose values are decreasing: the front is the window's max.
	deque := []int{}
	for i, n := range nums {
		if len(deque) > 0 && deque[0] <= i-k {
			deque = deque[1:]
		}
		// A smaller value behind a larger newcomer can never be a maximum again.
		for len(deque) > 0 && nums[deque[len(deque)-1]] < n {
			deque = deque[:len(deque)-1]
		}
		deque = append(deque, i)
		if i >= k-1 {
			result = append(result, nums[deque[0]])
		}
	}
	return result
}
