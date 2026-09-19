package main

func jump(nums []int) int {
	jumps, end, furthest := 0, 0, 0
	// Treat the indices reachable in j jumps as a window; when the walk
	// reaches its end, one more jump opens the next window.
	for i := 0; i < len(nums)-1; i++ {
		furthest = max(furthest, i+nums[i])
		if i == end {
			jumps++
			end = furthest
		}
	}
	return jumps
}
