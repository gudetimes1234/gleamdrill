package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("maxSubArray([-2,1,-3,4,-1,2,1,-5,4])", 6, maxSubArray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4})),
			tc("maxSubArray([1])", 1, maxSubArray([]int{1})),
			tc("maxSubArray([5,4,-1,7,8])", 23, maxSubArray([]int{5, 4, -1, 7, 8})),
			tc("maxSubArray([-3,-1,-2])", -1, maxSubArray([]int{-3, -1, -2})),
		}
	})
}
