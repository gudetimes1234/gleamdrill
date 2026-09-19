package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("missingNumber([3,0,1])", 2, missingNumber([]int{3, 0, 1})),
			tc("missingNumber([0,1])", 2, missingNumber([]int{0, 1})),
			tc("missingNumber([9,6,4,2,3,5,7,0,1])", 8, missingNumber([]int{9, 6, 4, 2, 3, 5, 7, 0, 1})),
			tc("missingNumber([0])", 1, missingNumber([]int{0})),
			tc("missingNumber([1])", 0, missingNumber([]int{1})),
		}
	})
}
