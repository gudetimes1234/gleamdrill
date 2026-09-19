package main

func maxSlidingWindow(nums []int, k int) []int {
	// The deque holds values, not indices, and each value is popped from the
	// front when the element leaving the window equals it: the same monotone
	// idea, with the window edge handled by comparing values.
	result := make([]int, 0, len(nums)-k+1)
	deque := []int{}
	for i, n := range nums {
		for len(deque) > 0 && deque[len(deque)-1] < n {
			deque = deque[:len(deque)-1]
		}
		deque = append(deque, n)
		if i >= k-1 {
			result = append(result, deque[0])
			if nums[i-k+1] == deque[0] {
				deque = deque[1:]
			}
		}
	}
	return result
}
