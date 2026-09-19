package main

func maxProfit(prices []int) int {
	// Three states carried day to day: holding a share, just sold (must
	// cool down tomorrow), and free to buy.
	holding, cooling, free := -1<<31, 0, 0
	for _, price := range prices {
		holding, cooling, free = max(holding, free-price), holding+price, max(free, cooling)
	}
	return max(cooling, free)
}
