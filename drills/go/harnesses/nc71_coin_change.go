package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("coinChange([1,2,5], 11)", 3, coinChange([]int{1, 2, 5}, 11)),
			tc("coinChange([2], 3)", -1, coinChange([]int{2}, 3)),
			tc("coinChange([1], 0)", 0, coinChange([]int{1}, 0)),
			tc("coinChange([186,419,83,408], 6249)", 20, coinChange([]int{186, 419, 83, 408}, 6249)),
		}
	})
}
