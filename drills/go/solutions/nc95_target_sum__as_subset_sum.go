package main

func findTargetSumWays(nums []int, target int) int {
	// Let P be the positives' sum: P - (total - P) = target, so
	// P = (total + target) / 2. The question becomes how many subsets
	// sum to P, a plain subset-sum count.
	total := 0
	for _, n := range nums {
		total += n
	}
	if target > total || target < -total || (total+target)%2 != 0 {
		return 0
	}
	goal := (total + target) / 2
	ways := make([]int, goal+1)
	ways[0] = 1
	for _, n := range nums {
		for s := goal; s >= n; s-- {
			ways[s] += ways[s-n]
		}
	}
	return ways[goal]
}
