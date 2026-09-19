package main

func main() {
	run(func() []testCase {
		return []testCase{
			tc("productExceptSelf([1, 2, 3, 4])", []int{24, 12, 8, 6}, productExceptSelf([]int{1, 2, 3, 4})),
			tc("productExceptSelf([-1, 1, 0, -3, 3])", []int{0, 0, 9, 0, 0}, productExceptSelf([]int{-1, 1, 0, -3, 3})),
			tc("productExceptSelf([2, 3])", []int{3, 2}, productExceptSelf([]int{2, 3})),
		}
	})
}
