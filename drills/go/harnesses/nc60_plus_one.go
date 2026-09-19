package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("plusOne([1,2,3])", []int{1, 2, 4}, plusOne([]int{1, 2, 3})),
			tc("plusOne([4,3,2,1])", []int{4, 3, 2, 2}, plusOne([]int{4, 3, 2, 1})),
			tc("plusOne([9])", []int{1, 0}, plusOne([]int{9})),
			tc("plusOne([9,9,9])", []int{1, 0, 0, 0}, plusOne([]int{9, 9, 9})),
			tc("plusOne([0])", []int{1}, plusOne([]int{0})),
		}
	})
}
