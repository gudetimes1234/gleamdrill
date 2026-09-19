package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxCoins([3,1,5,8])", 167, maxCoins([]int{3, 1, 5, 8})),
			tc("maxCoins([1,5])", 10, maxCoins([]int{1, 5})),
			tc("maxCoins([])", 0, maxCoins([]int{})),
			tc("maxCoins([5])", 5, maxCoins([]int{5})),
			tc("maxCoins([1,2,3,4])", 40, maxCoins([]int{1, 2, 3, 4})),
		}
	})
}
