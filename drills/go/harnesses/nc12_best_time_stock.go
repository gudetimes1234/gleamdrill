package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxProfit([7, 1, 5, 3, 6, 4])", 5, maxProfit([]int{7, 1, 5, 3, 6, 4})),
			tc("maxProfit([7, 6, 4, 3, 1])", 0, maxProfit([]int{7, 6, 4, 3, 1})),
			tc("maxProfit([2])", 0, maxProfit([]int{2})),
		}
	})
}
