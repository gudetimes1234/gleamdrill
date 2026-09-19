package main

func change(amount int, coins []int) int {
	// Count combinations using coins[i:] only: either skip coin i, or use
	// it (staying at i, since coins repeat). Memoised on (i, remaining).
	memo := map[[2]int]int{}
	var from func(i, remaining int) int
	from = func(i, remaining int) int {
		if remaining == 0 {
			return 1
		}
		if remaining < 0 || i == len(coins) {
			return 0
		}
		key := [2]int{i, remaining}
		if v, ok := memo[key]; ok {
			return v
		}
		memo[key] = from(i+1, remaining) + from(i, remaining-coins[i])
		return memo[key]
	}
	return from(0, amount)
}
