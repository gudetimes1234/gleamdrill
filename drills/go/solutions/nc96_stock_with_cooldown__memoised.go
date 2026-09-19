package main

func maxProfit(prices []int) int {
	memo := map[[2]int]int{}
	// from(i, holding): best profit from day i on, given whether a share
	// is held. Selling skips a day for the cooldown.
	var from func(i int, holding bool) int
	from = func(i int, holding bool) int {
		if i >= len(prices) {
			return 0
		}
		key := [2]int{i, 0}
		if holding {
			key[1] = 1
		}
		if v, ok := memo[key]; ok {
			return v
		}
		skip := from(i+1, holding)
		var act int
		if holding {
			act = prices[i] + from(i+2, false)
		} else {
			act = -prices[i] + from(i+1, true)
		}
		memo[key] = max(skip, act)
		return memo[key]
	}
	return from(0, false)
}
