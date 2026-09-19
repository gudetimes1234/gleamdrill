package main

func findTargetSumWays(nums []int, target int) int {
	// ways[s] counts the sign assignments of the prefix summing to s,
	// offset so negative sums index the slice.
	total := 0
	for _, n := range nums {
		total += n
	}
	if target > total || target < -total {
		return 0
	}
	ways := make([]int, 2*total+1)
	ways[total] = 1
	for _, n := range nums {
		next := make([]int, 2*total+1)
		for s, count := range ways {
			if count == 0 {
				continue
			}
			next[s+n] += count
			next[s-n] += count
		}
		ways = next
	}
	return ways[target+total]
}
