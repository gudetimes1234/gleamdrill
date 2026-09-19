package main

func maxProfit(prices []int) int {
	lowest, best := prices[0], 0
	for _, price := range prices[1:] {
		if price-lowest > best {
			best = price - lowest
		}
		if price < lowest {
			lowest = price
		}
	}
	return best
}
