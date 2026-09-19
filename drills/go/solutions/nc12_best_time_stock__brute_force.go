package main

func maxProfit(prices []int) int {
	best := 0
	for buy := 0; buy < len(prices); buy++ {
		for sell := buy + 1; sell < len(prices); sell++ {
			if prices[sell]-prices[buy] > best {
				best = prices[sell] - prices[buy]
			}
		}
	}
	return best
}
