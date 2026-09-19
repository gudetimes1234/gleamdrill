package main

func rob(nums []int) int {
	memo := map[int]int{}
	var from func(i int) int
	from = func(i int) int {
		if i >= len(nums) {
			return 0
		}
		if v, ok := memo[i]; ok {
			return v
		}
		memo[i] = max(nums[i]+from(i+2), from(i+1))
		return memo[i]
	}
	return from(0)
}
