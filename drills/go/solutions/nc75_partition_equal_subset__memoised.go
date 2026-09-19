package main

func canPartition(nums []int) bool {
	total := 0
	for _, n := range nums {
		total += n
	}
	if total%2 == 1 {
		return false
	}
	memo := map[[2]int]bool{}
	var from func(i, remaining int) bool
	from = func(i, remaining int) bool {
		if remaining == 0 {
			return true
		}
		if i == len(nums) || remaining < 0 {
			return false
		}
		key := [2]int{i, remaining}
		if v, ok := memo[key]; ok {
			return v
		}
		memo[key] = from(i+1, remaining-nums[i]) || from(i+1, remaining)
		return memo[key]
	}
	return from(0, total/2)
}
