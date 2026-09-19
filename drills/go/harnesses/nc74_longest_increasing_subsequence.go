package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("lengthOfLIS([10,9,2,5,3,7,101,18])", 4, lengthOfLIS([]int{10, 9, 2, 5, 3, 7, 101, 18})),
			tc("lengthOfLIS([0,1,0,3,2,3])", 4, lengthOfLIS([]int{0, 1, 0, 3, 2, 3})),
			tc("lengthOfLIS([7,7,7,7])", 1, lengthOfLIS([]int{7, 7, 7, 7})),
			tc("lengthOfLIS([])", 0, lengthOfLIS([]int{})),
			tc("lengthOfLIS([5,4,3,2,1])", 1, lengthOfLIS([]int{5, 4, 3, 2, 1})),
		}
	})
}
