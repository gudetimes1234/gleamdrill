package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("singleNumber([2,2,1])", 1, singleNumber([]int{2, 2, 1})),
			tc("singleNumber([4,1,2,1,2])", 4, singleNumber([]int{4, 1, 2, 1, 2})),
			tc("singleNumber([1])", 1, singleNumber([]int{1})),
			tc("singleNumber([-1,-1,-7])", -7, singleNumber([]int{-1, -1, -7})),
		}
	})
}
