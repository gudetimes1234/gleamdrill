package main

func maxCoins(nums []int) int {
	padded := append(append([]int{1}, nums...), 1)
	memo := map[[2]int]int{}
	// Top-down on the same recurrence: the range (l, r) exclusive, with
	// k the last balloon burst inside it.
	var from func(l, r int) int
	from = func(l, r int) int {
		if r-l < 2 {
			return 0
		}
		key := [2]int{l, r}
		if v, ok := memo[key]; ok {
			return v
		}
		best := 0
		for k := l + 1; k < r; k++ {
			best = max(best, from(l, k)+padded[l]*padded[k]*padded[r]+from(k, r))
		}
		memo[key] = best
		return best
	}
	return from(0, len(padded)-1)
}
