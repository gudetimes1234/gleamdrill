package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxProfit([1,2,3,0,2])", 3, maxProfit([]int{1, 2, 3, 0, 2})),
			tc("maxProfit([1])", 0, maxProfit([]int{1})),
			tc("maxProfit([2,1])", 0, maxProfit([]int{2, 1})),
			tc("maxProfit([1,2,4])", 3, maxProfit([]int{1, 2, 4})),
			tc("maxProfit([6,1,3,2,4,7])", 6, maxProfit([]int{6, 1, 3, 2, 4, 7})),
		}
	})
}
